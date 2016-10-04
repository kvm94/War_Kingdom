<?php
    //Récupère les valeur des paramètres
    $x = $_GET['x'];
    $y = $_GET['y'];
    
    //Connexion à la base de données
	$dbh = new PDO("sqlite:../data/db.sqlite");
	
	//Requête SQL
	$sql = "SELECT login, color, x, y FROM usr
            OUTER LEFT JOIN players ON id = plid
            OUTER LEFT JOIN map ON player = plid
            WHERE x=? AND y=?;";
				
	$stm = $dbh->prepare($sql);
	$stm->execute(array($x, $y));
    

    //Récupération des données et génération du responseText
    $str="";
    
    if ($row=$stm->fetch()) {
        $str.=$row["login"].",";
        $str.=$row["color"].",";
        $str.=$row["x"].",";
        $str.=$row["y"];
    }
	
	echo $str;
//A optimiser !! Pas de x et y envoyer pas le serveur
?>

