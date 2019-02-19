<?php
$db = 'C:\Program Files (x86)\AbarrotesMultiCaja\db\restaurado.fdb';
$username= 'SYSDBA';
$password = 'masterkey';

$dbh = ibase_connect($db, $username, $password);

ibase_close($dbh);

?>
