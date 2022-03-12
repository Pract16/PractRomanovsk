<?php
$test = $_GET['test'];
$userr = $_GET['user'];
$host="127.0.0.1";
$user="postgres";
$pass="password";
$db="postgres";
$con=pg_connect("host=$host dbname=$db user=$user password=$pass")
or die ("could not connect");
$q = "select  q.textq as questiontext, an.id as idansw, texta, result from answer as an inner join uanswer u on an.id = u.id_answ
inner join quest_answ qa on u.id_answ = qa.id_answ
inner join question q on q.id = qa.id_quest
inner join test_user tu on u.id_user = tu.id_user
where tu.id_test = '$test'::int and tu.id_user = '$userr'::int;";
$res=pg_query($con,$q);
if(pg_num_rows($res))
{
	$data=array();
	while($row=pg_fetch_array($res))
	{
		//$data[] = $row['fio'];
	$data[] = ['texta'=>$row['texta'], 'idansw'=>$row['idansw'], 'result'=>$row['result'], 'questiontext'=>$row['questiontext']];
	}	
	header('Content-Type: application/json; charset=utf-8');
	//$data = array_slice($data, 0, -1);
	$data = str_replace("\\","",$data);
	$j = json_encode($data);
	echo($j);
}
