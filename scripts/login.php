<?php
    //Récupère les valeur des paramètres
    $login = $_POST['login'];
    $passwd = $_POST['passwd'];
    
    //Connexion à la base de données
	$dbh = new PDO("sqlite:../data/db.sqlite");
	
	//Requête SQL
	$sql = "select login, passwd from usr where login=? and passwd=?;";
				
	$stm = $dbh->prepare($sql);
	$stm->execute(array($login, $passwd));
    
    if ($row=$stm->fetch()) {
        echo "ok";
    }
    else
        echo "ERR"; 
?>