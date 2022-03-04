<?php
$test = $_GET['test'];
$user = $_GET['user'];
$host="127.0.0.1";
$user="postgres";
$pass="password";
$db="postgres";
$con=pg_connect("host=$host dbname=$db user=$user password=$pass")
or die ("could not connect");
$q="select textq from question where id in (select id_quest from test_quest where id_test = '$test') and id not in (select id_quest from uquestion where id_user = '$user');";
$res=pg_query($con,$q);
//print_r($q);
if(pg_num_rows($res))
{
	$data=array();
	while($row=pg_fetch_array($res))
	{
		//$data[] = $row['fio'];
	$data[] = ['textq'=>$row['textq']];
	}	
	header('Content-Type: application/json; charset=utf-8');
	//$data = array_slice($data, 0, -1);
	$data = str_replace("\\","",$data);
	$j = json_encode($data);
	echo($j);
}
