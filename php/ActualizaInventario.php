<?php
header('Access-Control-Allow-Origin: *'); 
$db = 'C:\Program Files (x86)\AbarrotesMultiCaja\db\PDVDATA.fdb';
$username= 'SYSDBA';
$password = 'masterkey';

$dbh = ibase_connect($db, $username, $password);

$data = array();
$json = file_get_contents('php://input');
if (isset($json)) {
    $obj = json_decode($json);
    $costo = $_GET["venta"];
    $usuarioID = $_GET["IdUsuario"];
    $id = $_GET["id"];
    $codigo = $_GET["codigo"];
    $cantidad = $_GET["cant"];
    $ObtieneCant = "SELECT CANTIDAD_ACTUAL FROM INVENTARIO_BALANCES WHERE PRODUCTO_ID = $id";
    $res = ibase_query($dbh,$ObtieneCant);
    $rows = ibase_fetch_object($res);
    $ActCant = $rows -> CANTIDAD_ACTUAL;
    if($ActCant > 0){
        $cantidad = $cantidad + $ActCant;
    }
    $nr= ibase_num_fields($res);
    if($nr > 0){
        $Query = "UPDATE INVENTARIO_BALANCES SET CANTIDAD_ACTUAL  = $cantidad WHERE PRODUCTO_ID = $id ";
        //ibase_close($dbh);
        $resultado=ibase_query($dbh,$Query);
        if($resultado){
            $data = array(
                "respuesta" => "Producto actualizado correctamente");
        }else{
            $data = array(
                "respuesta" => "Ocurrio un error al actualizar");
        }  
    }else{
      $Query = "INSERT INTO INVENTARIO_BALANCES (PRODUCTO_ID, CANTIDAD_ACTUAL,ALMACEN_ID) VALUES ($id, $cantidad, 1)";
        //ibase_close($dbh);
        $resultado=ibase_query($dbh,$Query);
        if($resultado){
            $data = array(
                "respuesta" => "Producto actualizado correctamente");
        }else{
            $data = array(
                "respuesta" => "Ocurrio un error al actualizar");
        }  
    }
    //Obtiene Fecha Actual
    //ibase_close($dbh);
    /*$dbh;
    $date= "SELECT CURRENT_TIMESTAMP";
    $resdate = ibase_query($dbh,$date);
    $rowsdate = ibase_fetch_object($resdate);
    $ActDate = $rowsdate -> CURRENT_TIMESTAMP;*/


    //Obtiene id_Inventario
    //ibase_close($dbh);
    $QueryIdInv ="SELECT MAX(ID) FROM INVENTARIO_RECIBOS";
    $resid = ibase_query($dbh,$QueryIdInv);
    $rowsid = ibase_fetch_object($resid);
    $ID_Inventario = $rowsid -> MAX;
    $ID_Inventario = $ID_Inventario +1;


    //Inserta en Inventarios_recibos
    //ibase_close($dbh);
    $Inventario_Recibos = "INSERT INTO INVENTARIO_RECIBOS (FOLIO,RECIBIDO_EN, ORDEN_DE_COMPRA_ID, CAJA_ID, USUARIO_ID, ALMACEN_ID) VALUES
                            ($ID_Inventario, CURRENT_TIMESTAMP, null,1, $usuarioID, 1 )";
    $resInventario = ibase_query($dbh,$Inventario_Recibos)  or die(  ibase_errmsg() );
    if(!$resInventario){
        $data = array("respuesta" => ibase_errmsg() );
    }

    
    //Inserta en INVENTARIO_RECIBOS_DETALLE
    //ibase_close($dbh);
    $Inventario_Recibos_Detalle = "INSERT INTO INVENTARIO_RECIBOS_DETALLE (INVENTARIO_RECIBO_ID, SECUENCIA, PRODUCTO_ID, CANTIDAD_RECIBIDA, COSTO_UNITARIO) VALUES
                            ($ID_Inventario, 1, $id,$cantidad, $costo)";
    $resInvDetalle = ibase_query($dbh,$Inventario_Recibos_Detalle);


    //Inserta en INVENTARIO_HISTORIAL
    //ibase_close($dbh);
    $Historial ="INSERT INTO INVENTARIO_HISTORIAL (PRODUCTO_ID, CUANDO_FUE, CANTIDAD_ANTERIOR, CANTIDAD, DESCRIPCION, COSTO_UNITARIO, COSTO_DESPUES, AJUSTE_ID, RECIBO_INVENTARIO_ID, VENTA_ID, TRANSFERENCIA_ID, CAJA_ID, VENTA_POR_KIT, USUARIO_ID, ALMACEN_ID ) VALUES 
    ($id, CURRENT_TIMESTAMP, $ActCant, $cantidad- $ActCant, 'Recepcion de inventario # $ID_Inventario', $costo,$costo ,null,$ID_Inventario, null,null,1,0, $usuarioID, 1 )";
    $resINVHist = ibase_query($dbh,$Historial) or die(  ibase_errmsg() );
}

ibase_close($dbh);
 header('Content-type: application/json; charset=utf-8');
    echo json_encode($data);
    exit();

?>