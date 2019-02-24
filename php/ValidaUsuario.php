<?php
header('Access-Control-Allow-Origin: *'); 
require("conexion.php");
$data = array();
$json = file_get_contents('php://input');
if (isset($json)) {
    $obj = json_decode($json);
    $usuario = $_GET["usuario"];
    $pass = $_GET["pass"];
    $Obtiene =  "select * from USUARIOS WHERE USUARIO ='$usuario' and CLAVE = '$pass' ";
    
        $resultado=ibase_query($dbh, $Obtiene);
    	$nr= ibase_num_fields($resultado);
    	if($nr>=1){
            $data = array();
            while($rows = ibase_fetch_object($resultado)) {
                $data = array(
                "id" => $rows -> ID,
                "Nombre" => $rows -> NOMBRE_COMPLETO,
                "Usuario" => $rows -> USUARIO,
                "Permisos" => $rows -> PERMISOS,
                "Activo" => $rows -> ACTIVO
                );
            //$data[] = $datos;
            }
            
        }
        else{
            $data = array(
                "response" => "ERROR, USUARIO Y/O CONTRASEÑAS INCORRECTOS"
            );
        }
}

ibase_close($dbh);
 header('Content-type: application/json; charset=utf-8');
    echo json_encode($data);
    exit();

?>