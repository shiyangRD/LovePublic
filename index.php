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
<<<<<<< HEAD
=======
    //定义框架日志文件路径 
	define('LOG_PATH',ONLINE_PATH.'runtime/Log/Frame/'); 
>>>>>>> 8bb68c385db7d576479ef33e7f60690faa8a2c9a
    
	//运行内核
	require(THINK_PATH."/ThinkPHP.php");
    //实例化内核
   	App::run();
   	
