<?php
for($i=0;$i<=71;$i++){
    
    $b["$i"] = array(
        "type"   => 1,
        "thumb"  => '/Public/Images/block'."$i".'.png',
        "title"  => '世界你好'."$i".' world~',
        "author" => 'Smallwolf',
        "description"   => 'This is a text for test',
        "time_edit" => date("m月d"),
        "gridid" => $i,
        "num_like" => 12
    );
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
