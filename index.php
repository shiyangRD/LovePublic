<?php
	//定义根目录地址
	define('ONLINE_PATH',realpath('../../').'/'); 

	//定义内核地址
	define('THINK_PATH',ONLINE_PATH.'webroot/Kernel/ThinkPHP');
    
	//定义项目名称
	define('APP_NAME','App');
    //定义项目路径
	define('APP_PATH',ONLINE_PATH.'webroot/App');
    
	//定义运行碎片路径
	define('RUNTIME_PATH',ONLINE_PATH.'runtime/');  
    //定义是否产生框架编译
	define('NO_CACHE_RUNTIME',True);
    
	//运行内核
	require(THINK_PATH."/ThinkPHP.php");
    //实例化内核
   	App::run();
   	
