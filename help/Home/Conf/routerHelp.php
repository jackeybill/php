<?php
/**
 * Created by PhpStorm.
 * User: cony
 * Date: 14-2-26
 * Time: 下午2:16
 */
return array(
    'URL_ROUTE_RULES'=>array(
		/*分类*/
        'v/:id' => 'View/index',
        //在 user 模块中，除了 getlist 和 tag 方法，其他存在的方法全部指向 index 方法。参数之间用 | 间隔 这样可以屏蔽一些不想让用户访问到但是又必须定义成 public 的方法。
        'user/^getlist|tag' => 'user/index',
    ),
);