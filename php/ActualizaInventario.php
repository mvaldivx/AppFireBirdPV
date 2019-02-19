<?php
header('Access-Control-Allow-Origin: *'); 
require("conexion.php");
$data = array();
$json = file_get_contents('php://input');
if (isset($json)) {
    $obj = json_decode($json);
    $codigo = $_GET["codigo"];
    $cantidad = $_GET["cant"];
    $ObtieneCant = "SELECT DINVENTARIO FROM PRODUCTOS WHERE CODIGO = '$codigo'";
    $Conexion;
    $res = ibase_query($ObtieneCant);
    $rows = ibase_fetch_object($res);
    $ActCant = $rows -> DINVENTARIO;
    if($ActCant > 0){
        $cantidad = $cantidad + $ActCant;
    }
    $Query = "UPDATE PRODUCTOS SET DINVENTARIO  = $cantidad WHERE CODIGO = '$codigo' ";
    ibase_close($dbh);
    $Conexion;
    $resultado=ibase_query($Query);
    if($resultado){
        $data = array(
            "respuesta" => "Producto actualizado correctamente");
    }else{
        $data = array(
            "respuesta" => "Ocurrio un error al actualizar");
    }
}

ibase_close($dbh);
 header('Content-type: application/json; charset=utf-8');
    echo json_encode($data);
    exit();

?>