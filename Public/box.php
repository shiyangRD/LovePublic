<?php
for($i=0;$i<=71;$i++){
    $b["$i"] = '/Public/Images/block'."$i".'.png';
   // array(
        //"type"   => 1,
        //"image"  => '/Public/Images/block'."$i".'png',
        //"title"  => 'Hello'."$i".' world~',
        //"author" => 'Smallwolf',
        //"text"   => 'This is a text for test'
    //);
}


for($j=0;$j<=3;$j++){
    for($x=0;$x<=17;$x++){
        $t=$x+18*$j;
        $m[]=$b["$t"];
    }
        $rearray["$j"]=$m;
        unset($m);
    
}
if (isset($_GET['page'])) {
    $page = $_GET['page'];
    $arr=$rearray["$page"];
    if(isset($arr)) {
        $json_string = json_encode($arr);   
        echo $json_string;
    }
}else{
    echo 'false';
}

?> 
