<?php
    //Récupère les valeur des paramètres
    $login = $_POST['reg_nom'];
    $passwd = $_POST['reg_passwd'];
    
    //Connexion à la base de données
	$dbh = new PDO("sqlite:../data/db.sqlite");
	
	//Requête SQL
	$sql = "select login from usr where login=?;";
				
	$stm = $dbh->prepare($sql);
	$stm->execute(array($login));
    
    if ($row=$stm->fetch()) {
        
        echo "<script>alert(\"Pseudo déjà utilisé!\")</script>";
        header('Location:../register.html');
    }
    else
        echo "ok";
        
    
?>