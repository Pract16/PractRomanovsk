<?php
$param = $_GET['param'];
$host="127.0.0.1";
$user="postgres";
$pass="password";
$db="postgres";
$con=pg_connect("host=$host dbname=$db user=$user password=$pass")
or die ("could not connect");
$q="select count(*) as ccc from test_user where id_user = (select id from users where fio = '$param' limit 1);";
$res=pg_query($con,$q);
//print_r($q);
if(pg_num_rows($res))
{
	$data=array();
	while($row=pg_fetch_array($res))
	{
		//$data[] = $row['fio'];
	$data[] = ['ccc'=>$row['ccc']];
	}	
	header('Content-Type: application/json; charset=utf-8');
	//$data = array_slice($data, 0, -1);
	$data = str_replace("\\","",$data);
	$j = json_encode($data);
	echo($j);
}
