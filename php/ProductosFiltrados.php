<?php
header('Access-Control-Allow-Origin: *'); 
include("conexion.php");
$data = array();
$json = file_get_contents('php://input');
if (isset($json)) {
    $obj = json_decode($json);
    $tipo = $_GET["tipo"];
    $cadena = $_GET["cadena"];
    $Obtiene = "";
    $Obtiene = "select * from PRODUCTOS P LEFT JOIN INVENTARIO_BALANCES I ON P.ID = I.PRODUCTO_ID WHERE UPPER(P.CODIGO) = '".$cadena."'";
        
        $resultado=ibase_query($dbh,$Obtiene) or die (ibase_errmsg());
    	$nr= ibase_num_fields($resultado);
    	if($nr>=1){
            $data = array();
            while($rows = ibase_fetch_object($resultado)) {
                $datos = array(
				"id" => $rows -> ID,
                "codigo" => $rows -> CODIGO,
                "Descripcion" => $rows -> DESCRIPCION,
                "Existencia" => $rows -> CANTIDAD_ACTUAL,
                "Costo" => $rows -> PCOSTO,
                "Venta" => $rows -> PVENTA,
                "UMedida" => $rows -> UMEDIDA
                );
            $data[] = $datos;
            }
            
        }
        else{
            
        }
}

ibase_close($dbh);
 header('Content-type: application/json; charset=utf-8');
    echo json_encode($data);
    exit();

?>