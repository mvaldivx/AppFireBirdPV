<?php

header("Access-Control-Allow-Origin: *");
$db = 'C:\Program Files (x86)\AbarrotesMultiCaja\db\PDVDATA.fdb';
$username= 'SYSDBA';
$password = 'masterkey';

$dbh = ibase_connect($db, $username, $password);

ibase_close($dbh);

?>
