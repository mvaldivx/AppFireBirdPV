<?php
header('Access-Control-Allow-Origin: *'); 
require("conexion.php");
$data = array();
$json = file_get_contents('php://input');
if (isset($json)) {
    $obj = json_decode($json);
    $tipo = $_GET["tipo"];
    $cadena = $_GET["cadena"];
    $Obtiene = "";
    IF($tipo == 0){
       $Obtiene = "select * from PRODUCTOS WHERE UPPER(CODIGO) LIKE '$cadena%'";
    }else{
       $Obtiene = "select * from PRODUCTOS WHERE UPPER(DESCRIPCION) LIKE '$cadena%' ";
    }
        
        $Conexion;
        $resultado=ibase_query($Obtiene);
    	$nr= ibase_num_fields($resultado);
    	if($nr>=1){
            $data = array();
            while($rows = ibase_fetch_object($resultado)) {
                $datos = array(
                "codigo" => $rows -> CODIGO,
                "Descripcion" => $rows -> DESCRIPCION,
                "Existencia" => $rows -> DINVENTARIO,
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