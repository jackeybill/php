<?php
return array(
	//'配置项'=>'配置值'
    //注册新的命名空间
    'AUTOLOAD_NAMESPACE' => array(
        'My' => THINK_PATH.'My',
        'One' => THINK_PATH.'One',
    ),
    // 系统默认的变量过滤机制 strip_tags
    'DEFAULT_FILTER' => 'htmlspecialchars',
    //success 和error 方法都可以对应的模板，默认的设置是两个方法对应的模板都是：
    //默认错误跳转对应的模板文件
    'TMPL_ACTION_ERROR' => THINK_PATH.'Tpl/dispatch_jump.tpl',
    //默认成功跳转对应的模板文件
    'TMPL_ACTION_SUCCESS' => THINK_PATH.'Tpl/dispatch_jump.tpl',
    // 显示页面T race信息
    'SHOW_PAGE_TRACE' =>true,
    'DATA_CACHE_KEY'=>'think', // 使用的是文件方式的缓存机制，那么可以设置DAT A_CACHE_KEY参数，避免缓存文件名被猜测到
    // 允许访问的模块列表
    'MODULE_ALLOW_LIST ' => array('Home','Admin','User'),
    'DEFAULT _MODULE' => 'Home', // 默认模块
    // 设置禁止访问的模块列表
    'MODULE_DENY_LIST ' => array('Common','Runtime','User'),

    // 系统在初始化Session的时候会自动处理，采用Db机制来处理session。
    'SESSION_TYPE'=>'Db',
    // 或者
    'SESSION_OPTIONS'=>array(
        'type'=>'Db',
    ),
    // 关闭字段缓存
    'DB_FIELDS_CACHE'=>false,

    'LOG_RECORD' => true, // 开启日志记录
    'LOG_LEVEL' =>'EMERG,ALERT ,CRIT ,ERR', // 只记录EMERG ALERTCRIT ERR 错误
);
?>