<?php
/**
 * Created by PhpStorm.
 * User: cony
 * Date: 14-2-21
 * Time: 下午2:13
 */

return array(
    'URL_ROUTER_ON'   => true,// 开启路由
    'LOAD_EXT_CONFIG' => 'router',
    'URL_PATHINFO_DEPR' => '-',
	'URL_CASE_INSENSITIVE'=>true,
    'URL_HTML_SUFFIX'       => ".html",  // URL伪静态后缀设置
    'URL_DENY_SUFFIX' => C('TOKEN.URL_DENY_SUFFIX'), // URL禁止访问的后缀设置
    'URL_MODEL' =>1,// URL伪静态设置/开启，关闭

    'LANG_SWITCH_ON' => true,   // 开启语言包功能
    'LANG_AUTO_DETECT' => true, // 自动侦测语言 开启多语言功能后有效
    'DEFAULT_LANG'        => 'zh-cn',    // 默认语言
    'LANG_LIST'        => 'zh-cn,en-us,ja-jp', // 允许切换的语言列表 用逗号分隔
    'VAR_LANGUAGE'     => 'l', // 默认语言切换变量

    /* 模板相关配置 */
    'TMPL_PARSE_STRING' => array(
        '__UPLOAD__' => __ROOT__ . '/Uploads',
        '__STATIC__' => __ROOT__ . '/Public',
        '__IMG__'    => __ROOT__ . '/Public/Home/images',
        '__CSS__'    => __ROOT__ . '/Public/Home/css',
        '__JS__'     => __ROOT__ . '/Public/Home/js',
        '--PUBLIC--'=>__ROOT__ . '/Public' ,
    ),

);