<?php
header('Access-Control-Allow-Origin: *'); 
require("conexion.php");
$data = array();
$dia = $_GET["dia"];
$mes = $_GET["mes"];
$anio = $_GET["anio"];
$Date = $anio."-".$mes."-".$dia." 00:00";
$fecha = Date("Y-m-d",strtotime($Date));
//Fecha siguiente
$sigFecha = Date("Y-m-d",strtotime($Date. ' + 1 day'));
$data= array(
"fech" => $anio,
"fecha" => $fecha,
"fechaSig" => $sigFecha);
  $Obtiene = "SELECT CUANDO_FUE, P.DESCRIPCION, I.DESCRIPCION AS MOVIMIENTO, CANTIDAD_ANTERIOR,CANTIDAD,USUARIO
   FROM INVENTARIO_HISTORIAL I LEFT JOIN PRODUCTOS P ON P.ID = I.PRODUCTO_ID
			LEFT JOIN USUARIOS U ON I.USUARIO_ID = U.ID WHERE CUANDO_FUE BETWEEN '".$fecha."' AND '".$sigFecha."'";
    $resultado=ibase_query($dbh,$Obtiene) or die (ibase_errmsg());
	$nr= ibase_num_fields($resultado);
	if($nr>=1){
        $data = array();
        while($rows = ibase_fetch_object($resultado)) {
            $datos = array(
            "Fecha" => $rows -> CUANDO_FUE,	
            "Descripcion" => $rows -> DESCRIPCION,
			"Movimiento" => $rows -> MOVIMIENTO,
            "Habia" => $rows -> CANTIDAD_ANTERIOR,
            "Tipo" =>  '1',
            "Cantidad" => $rows -> CANTIDAD,
			"Cajero" => $rows -> USUARIO
            );
        $data[] = $datos;
        }
        
    }
    else{
        
    }

ibase_close($dbh);
 header('Content-type: application/json; charset=utf-8');
    echo json_encode($data);
    exit();

?>
