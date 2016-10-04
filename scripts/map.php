<?php
    //Connexion à la base de données
	$dbh = new PDO("sqlite:../data/db.sqlite");
	
	//Requête SQL
	$sql = "	SELECT x, y, color FROM map
				INNER JOIN players ON plid = player
				ORDER BY x, y";
				
	$stm = $dbh->prepare($sql);
	$stm->execute();
	
	//Génération de la chaîne de caractères à partir de la base de données
	$str = "";
	$tabMap   = array();
	$tabMap[] = array();
	
	//A optimiser ( pas de tableau)
	while($res = $stm->fetch()){
		$tabMap[$res["x"]][$res["y"]] = $res["color"];
	}
	
	for($i = 0 ; $i <sizeof($tabMap) ; $i++){
		for($j = 0 ; $j < sizeof($tabMap[$i]) ; $j++){
			$str .= $tabMap[$i][$j];
			if($j < sizeof($tabMap[$i])-1)
						$str.=",";
		}
		if($i < sizeof($tabMap)-1)
						$str.="|";
	}
	
	//Renvoi la chaîne
	echo $str;
	?>