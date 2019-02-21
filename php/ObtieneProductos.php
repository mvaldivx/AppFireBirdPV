<?php
header('Access-Control-Allow-Origin: *'); 
require("conexion.php");
$data = array();

    $Obtiene = "SELECT * FROM PRODUCTOS P LEFT JOIN INVENTARIO_BALANCES I ON P.ID = I.PRODUCTO_ID";
    $dbh;
    $resultado=ibase_query($Obtiene);
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

ibase_close($dbh);
 header('Content-type: application/json; charset=utf-8');
    echo json_encode($data);
    exit();

?>