<?php
$question = $_GET['question'];
$usess = $_GET['user'];
$answ = $_GET['answ'];
$test = $_GET['test'];

$host="127.0.0.1";
$user="postgres";
$pass="password";
$db="postgres";
$con=pg_connect("host=$host dbname=$db user=$user password=$pass")
or die ("could not connect");
$q = "insert into uquestion values ('$usess'::int,'$question'::int,1);"; 
$res=pg_query($con,$q);
$q = "insert into uanswer values ('$usess'::int,'$answ'::int,1);"; 
$res=pg_query($con,$q);
$q = "update test_user set status = 1 where id_test='$test'::int and id_user='$usess'::int;"; 
$res=pg_query($con,$q);

