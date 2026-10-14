<?php
require dirname(__DIR__).'/private/bootstrap.php';session_init();
if(empty($_SESSION['owner'])){header('Location: /login.php?next='.urlencode($_SERVER['REQUEST_URI']));exit;}header('Cache-Control: no-store');readfile(__DIR__.'/index.html');
