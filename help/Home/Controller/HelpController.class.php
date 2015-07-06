<?php
/**
 * Created by PhpStorm.
 * User: cony
 * Date: 14-3-7
 * Time: 涓嬪崍3:40
 */
namespace Home\Controller;
use Org\Util\String;
use Think\Controller;
use Org\Util\Date;
use Org\HelpUtil;
use IndexAction;
class HelpController extends Controller{

    /*
     * __initialize()不是php类中的函数，php类的构造函数只有__construct().
     *
     * 我们在ThnikPHP中初始化子类的时候要用 __initialize(),而不用__construct()
     *
    public function __construct()
    {
        echo 'hello Action';
        parent::__construct();  //调用父类的__constrcut()
    }
    */
    public function __initialize(){
        echo 'hello Action';
    }

    /*
     * 如果我们访问 http://serverName/index.php/Home/Index/index
        结果会输出
        before
        index
        after
     * */
    //前置操作方法
    public function _before_index(){
        echo 'before<br/>';
    }
    public function index(){
        echo 'index<br/>';
    }
    //后置操作方法
    public function _after_index(){
        echo 'after<br/>';
    }




    public function help(){
        //var_dump( C('TMPL_PARSE_STRING') );

        //var_dump( $_SERVER );

        //var_dump( $_SERVER['SERVER_NAME']);

        var_dump( C('LIBRARY_PATH') ); // LIBRARY_PATH; LIB_PATH

        // 记录加载文件时间
        G('loadTime');

        //$this->helpThrowError();
        $this->helpString();

        // 假如 Tpl 下有 new 主题，该主题下有 User 文件夹，文件夹下有 index.html; 你当前的模板主题是 Tpl 下的 default，
        $this->display('new:User:index');
        $this->display('./Tpl/new/User/index.html'); // 用全路径输出
    }

    public function helpGetVariable(){
        $id = $_GET['id']; // 获取get变量
        $name = $_POST['name']; // 获取post变量
	    $value = $_SESSION['var']; // 获取session变量
	    $name = $_COOKIE['name']; // 获取cookie变量
	    $file = $_SERVER['PHP_SELF']; // 获取server变量

        //本地化session支持开启后，生成的session数据格式由原来的
        // $_SESSION['name'] 变成 $_SESSION['前缀']['name']
    }

    public function helpQuickOperation(){
        $Data = arry(1,2,3,4);
        //C操作操作(动态)配置: 主要用于Action方法里面
        C('配置参数');  //设置:
        C('配置参数 ','新值');    // setting
        C('USER_CONFIG.USER_T YPE'); //读取二维配置

        //A操作 快速创建Action对象:
        $action = A('User'); // 等效于 $action = new UserAction();

        //D操作 快速创建模型数据对象:
        $model = D('User'); //等效于 $model = new UserModel();
        //D方法还可以支持跨模块调用，需要使用：实例化Admin模块的User模型
        D('Admin/User');
        //实例化Extend扩展命名空间下的Info模型
        D('Extend://Editor/Info');

        //S操作 快速操作缓存方法
        S('name');
        S('name','value'); //设置:
        S('name',NULL); //删 除:
        //unset(S('name'));

        //F操作 快速文件数据保存方法 使用方法与S操作一样
        F('data',$Data,TEMP_PATH); // 快速缓存Data数据，保存到指定的目录
        $model->cache(true,60,'xcache')->select(); // 当前查询缓存的缓存方式为xcache，并且缓存有效期为60秒

        //L操作 快速操作语言变量 获取: (不区分大小写)
        L('语言变量');
        L('语言变量','值');

        //I（）   快速创建一个对象实例
        // 采用htmlspecialchars方法对$_GET ['name'] 进行过滤，如果不存在则返回空字符串
        echo I('get.name','','htmlspecialchars');
        I('post.email','','email'); //int，boolean，float，validate_regexp，validate_url，validate_email，validate_ip，string，stripped，encoded，special_chars，unsafe_raw，email，url，number_int，number_float，magic_quotes，callback
        // 采用正则表达式进行变量过滤
        I('get.name','','/^[A-Za-z]+$/');
        I('get.id',0,'/^\d+$/');

        I('get.id/d'); // 强制变量转换为整型
        I('post.name/s'); // 强制转换变量为字符串类型
        I('post.ids/a'); // 强制变量转换为数组类型

        //M（） 加载Model类 实例化一个没有模型文件的Model

        /**
        记录和统计时间（微秒）和内存使用情况
         * 使用方法:
         * <code>
         * G('begin'); // 记录开始标记位
         * // ... 区间运行代码
          * G('end'); // 记录结束标签位
        39  * echo G('begin','end',6); // 统计区间运行时间 精确到小数后6位
        40  * echo G('begin','end','m'); // 统计区间内存使用情况
        41  * 如果end标记位没有定义，则会自动以当前作为标记位
        42  * 其中统计内存使用需要 MEMORY_LIMIT_ON 常量为true才有效
        43  * </code>
         */
        // 系统提供了G方法可以很方便的获取某个区间的运行时间和内存占用情况。
        G('begin');
        // ...其他代码段
        G('end');
        // ...也许这里还有其他代码
        // 进行统计区间
        echo G('begin','end').'s';

        // 添加和获取页面Trace记录
        trace("dafsdfaf");

        /**
        92  * 设置和获取统计数据
        93  * 使用方法:
        94  * <code>
        95  * N('db',1); // 记录数据库操作次数
        96  * N('read',1); // 记录读取次数
        97  * echo N('db'); // 获取当前页面数据库的所有操作次数
        98  * echo N('read'); // 获取当前页面读取次数
        99  * </code>
        100  * @param string $key 标识位置
        101  * @param integer $step 步进值
        102  * @return mixed
        103  */

        /**     B($name,$tag='',&$params=NULL)
        202  * 执行某个行为
        203  * @param string $name 行为名称
        204  * @param Mixed $params 传入的参数
        205  * @return void
        206  */

        /*
         * .U() URL组装 支持不同URL模式
            ?
            1
            U($url='',$vars='',$suffix=true,$domain=false)
              @param string $url URL表达式，格式：'[模块/控制器/操作#锚点@域名]?参数1=值1&参数2=值2...'
              @param string|array $vars 传入的参数，支持数组和字符串
              @param string $suffix 伪静态后缀，默认为true表示获取配置值
              @param boolean $domain 是否显示域名
              @return string

         * */
        U('Blog/read@blog.thinkphp.cn','id=1'); //域名支持 系统会自动判断当前是否SSL协议，生成https://
        U('Blog/read#comment?id=1'); // 锚点支持 生成的URL地址可能是： http://serverName/index.php/Home/Blog/read/id/1#comment

        //E() 抛出异常处理
        //E($msg, $code=0)

        //T()获取模版文件 格式 资源://模块@主题/控制器/操作
        //T($template='',$layer='')
        T('Public/menu');// 返回 当前模块/View/Public/menu.html
        T('blue/Public/menu');// 返回 当前模块/View/blue/Public/menu.html
        T('Public/menu','Tpl');// 返回 当前模块/T pl/Public/menu.html
        T('Public/menu');// 如果TMPL_FILE_DEPR 为 _ 返回 当前模块/T pl/Public_menu.html
        T('Public/menu');// 如果TMPL_T EMPLAT E_SUFFIX 为.tpl 返回 当前模块/T pl/Public/menu.tpl
        T('Admin@Public/menu');// 返回 Admin/View/Public/menu.html
        T('Extend://Admin@Public/menu');// 返回 Extend/Admin/View/Public/menu.html (Extend目录取决于AUT OLOAD_NAMESPACE中的配置）

        //R() 远程调用控制器的操作方法
        //URL 参数格式 [资源://][模块/]控制器/操作
        //R($url,$vars=array(),$layer='')

        //S()缓存管理
        //S($name,$value='',$options=null)
        // Memcache缓存
        S(array(
                'type'=>'memcache',
                'host'=>'192.168.1.10',
                'port'=>'11211',
                'prefix'=>'think',
                'expire'=>60)
        );
        // 缓存数据300秒
        S('name','$value',300);
        // 读取缓存
        $value = S('name');
        // 删除缓存
        S('name',null);
        // 初始化缓存
        $cache = S(array('type'=>'xcache','prefix'=>'think','expire'=>600));
        $cache->name = 'value'; // 设置缓存
        $value = $cache->name; // 获取缓存
        unset($cache->name); // 删除缓存
    }

    public function helpDisplay(){
        $this->display(); // 调用 User 模块的 read 操作模版
        $this->display('edit'); // 调用 User 模块的 edit 操作模版
        $this->display('Member:read'); // 调用 Member 模块的 read 操作模版
        $this->display('Xp@User:edit'); // 调用 Xp 主题的 User 模块的 edit 操作模版
        $this->display('../Member/read.html'); // 直接指定模版文件的全名

        // 操作完成3秒后跳转到 /Article/index success方法的默认跳转地址是$_SERVER["HT T P_REFERER"]
        $this->success('操作完成','/Article/index',3);
        // 操作失败5秒后跳转到 /Article/error error方法的默认跳转地址是 javascript:history.back(-1);
        $this->error('操作失败','/Article/error',5);

        //重定向到New模块的Category操作
        $this->redirect('New/category', array('cate_id' => 2), 5, '页面跳转中...');

        //success 和error 方法都可以对应的模板，默认的设置是两个方法对应的模板都是：
        //默认错误跳转对应的模板文件
        //'TMPL_ACT ION_ERROR' => THINK_PATH . 'T pl/dispatch_jump.tpl',
        //默认成功跳转对应的模板文件
        //'TMPL_ACT ION_SUCCESS' => THINK_PATH . 'T pl/dispatch_jump.tpl',

        /*
         User控制器的add操作 对应的模板文件就应该是：./Application/Home/View/User/add.html
         define('TMPL_PAT H','./T emplate/'); // 改变所有模块的模板目录所在
        'DEFAULT _V_LAYER' => 'T emplate', // 设置默认的视图层名称 ./Application/Home/T emplate/User/add.html
        'TMPL_T EMPLAT E_SUFFIX'=>'.tpl' // ./Application/Home/View/User/add.tpl
        'TMPL_FILE_DEPR'=>'_'     // ./Application/Home/View/User_add.html
        'DEFAULT _T HEME' => 'default' // 设置默认的模板主题 View/default/User/add.html // 启用模板主题之后
         */
        // 在控制器中动态改变模板主题
        $this->theme('blue')->display('add');

        $this->theme('blue')->display('User:edit'); // 调用blue主题下面的User控制器的edit模板
        $this->display('read', 'utf-8', 'text/xml');
        $this->display('./T emplate/Public/menu.html');


        $this->display(T ('Admin@Public/menu'));

        $content = $this->fetch('Member:edit'); // 获取渲染模板的输出内容而不是直接输出
        $this->show($content, 'utf-8', 'text/xml'); // 渲染内容

    }

    public function helpImport(){
        // 导入Org类库包 Library/Org/Util/Date.class.php类库
        import("Org.Util.Date");
        // 导入Home模块下面的 Application/Home/Util/UserUtil.class.php类库
        import("Home.Util.UserUtil");
        // 导入当前模块下面的类库
        import("@.Util.Array");
        // 导入Vendor类库包 Library/Vendor/Zend/Server.class.php
        import('Vendor.Zend.Server');

        import("Org.User#Info"); //导致加载的文件不是Org/User.Info.class.php 文件，而是Org/User/Info.class.php 文件
        import("RBAC.AccessDecisionManager",dirname(__FILE__)); //导入当前文件所在目录下面的 RBAC/AccessDecisionManager.class.php 文件
        Vendor('Zend.Filter.Dir'); //第三方类库都放在Vendor目录下面 路径就是 Vendor\Zend\Filter\Dir.php
        Vendor('Zend.Filter.Dir',dirname(__FILE__),'.class.php');
    }

    public function helpCallModel(){
        new \Home\Model\NewModel('blog','think_','mysql://root:1234@localhost/demo'); // 数据库类型://用户名:密码@数据库主机名或者IP:数据库端口/数据库名#字符集
        $connection = array(
            'db_type' => 'mysql',
            'db_host' => '127.0.0.1',
            'db_user' => 'root',
            'db_pwd' => '12345',
            'db_port' => 3306,
            'db_name' => 'demo',
            'db_charset' => 'utf8',
        );
        new \Home\Model\NewModel('new','think_',$connection);
        $connection = array( //// 分布式数据库部署 并且采用读写分离 开启数据库调试模式
            'db_type' => 'mysql',
            'db_host' => '192.168.1.2,192.168.1.3', // ip1, ip2, ip3 ...
            'db_user' => 'root', // user1, user2, user3 ...
            'db_pwd' => '12345',
            'db_port' => 3306,
            'db_name' => 'demo',
            'db_charset' => 'utf8',
            'db_deploy_type'=> 1,
            'db_rw_separate'=> true, //读写是否分离
            'db_debug' => true,
        );

    }

    public function helpImage($upload){
        //如果使用了多语言功能的话（假设，我们在当前语言包里面定义了'lang_var'=>'标题必须！'），就可以这样定义模型的自动验证
        //array('title','require','{%lang_var}',1),

        //'FILE_FORMAT ' => '文件格式: {$format},文件大小：{$size}',
        //{:L('FILE_FORMAT ',array('format' => 'jpeg,png,gif,jpg','maximum' => '2MB'))}

        // 采用时间戳命名
        $upload->saveName = 'time';
        // 采用GUID序列命名
        $upload->saveName = 'com_create_guid';
        // 采用自定义函数命名
        $upload->saveName = 'myfun';

        // 开启子目录保存 并以日期（格式为Ymd）为子目录
        $upload->autoSub = true;
        $upload->subName = array('date','Ymd');

        $image = new \Think\Image();
        $image->open('./1.jpg');
        $width = $image->width(); // 返回图片的宽度
        $height = $image->height(); // 返回图片的高度
        $type = $image->type(); // 返回图片的类型
        $mime = $image->mime(); // 返回图片的mime类型
        $size = $image->size(); // 返回图片的尺寸数组 0 图片宽度 1 图片高度

        //裁剪图片
        $image = new \Think\Image();
        $image->open('./1.jpg');
        //将图片裁剪为400x400并保存为corp.jpg
        $image->crop(400, 400)->save('./crop.jpg');

        //使用thumb方法生成缩略图
        $image = new \Think\Image();
        $image->open('./1.jpg');
        // 按照原图的比例生成一个最大为150*150的缩略图并保存为thumb.jpg
        $image->thumb(150, 150)->save('./thumb.jpg');

        //居中裁剪
        $image = new \Think\Image();
        $image->open('./1.jpg');
        // 生成一个居中裁剪为150*150的缩略图并保存为thumb.jpg
        $image->thumb(150, 150,\Think\Image::IMAGE_THUMB_CENTER)->save('./thumb.jpg');

        //添加图片水印
        $image = new \Think\Image();
        $image->open('./1.jpg');
        //将图片裁剪为440x440并保存为corp.jpg
        $image->crop(440, 440)->save('./crop.jpg');
        // 给裁剪后的图片添加图片水印（水印文件位于./logo.png），位置为右下角，保存为water.gif
        $image->water('./logo.png')->save("water.gif");
        // 给原图添加水印并保存为water_o.gif（需要重新打开原图）
        $image->open('./1.jpg')->water('./logo.png')->save("water_o.gif");

        //给图片添加文字水印
        $image = new \Think\Image();
        // 在图片右下角添加水印文字 T hinkPHP 并保存为new.jpg
        $image->open('./1.jpg')->text('T hinkPHP','./1.ttf',20,'#000000',\Think\Image::IMAGE_WATER_SOUTHEAST )->save("new.jpg");
    }

    public function helpThrowError(){
        //$this->error("sdfasdf",U('Help/help'));
        //E("error333");
        die("errorsss");

        try{
            //throw_exception("error!");
            E("error");
            E('信息录入错误',25); // throw new \Think\Exception('新增失败');
        } catch (Exception $e) {
            $this->error("eeeee");
            exit();
        }
        throw_exception(L('ADD_USER_ERROR'));
        // 语言包定义 'FILE_FORMAT' => '文件格式: {$format},文件大小：{$size}',
        //{:L('FILE_FORMAT',array('format' => 'jpeg,png,gif,jpg','maximum' => '2MB'))}

        trace($vo,'create vo');
        dump($var, $echo=true, $label=null, $strict=true);

        \Think\Log::record('测试日志信息，这是警告级别','WARN');
        \Think\Log::write('测试日志信息，这是警告级别，并且实时写入','WARN'); // write方法写入日志的时候 不受配置的允许日志级别影响，可以实时写入任意级别的日志信息。
    }

    public function helpString(){
        $strFunction = new String();
        var_dump( substr( "我们都是一家人",0,6) ); // msubstr
        var_dump( $strFunction->msubstr( "我们都是一家人",0,6) );
        $strFunc = new HelpUtil();
        var_dump( $strFunc->msubstr( "我们都是一家人",0,6) );
    }

    public function helpLibrary(){
        $date = new Date();

    }

    public function unlogin(){
		if(intval(session('userid')) == 0)
		{
			header('Content-type: text/json');
			header('HTTP/1.1 401 Unauthorized');
			echo json_encode(array("success" => false,"code"=> 1001,"msg" => "璇峰厛鐧诲綍!","obj"=> null,"map"=> null,"list"=> null));
			exit;
		}
    }
	

    public function _initialize(){
        header('Content-type: application/json;charset=UTF-8');
		if(intval(session('userid')) != 100)
		{
			$wheresessionuser["userid_int"] = intval(session('userid'));
			
		}
	}

    public function addpv(){
         $returnInfo = D("Scene")->addpv();
    }
	
    public function usepage(){
         $returnInfo = D("Scene")->usepage();
    }

    public function create(){
		$this->unlogin();
        if (IS_POST) {
			// 鐧诲綍楠岃瘉
            $returnInfo = D("Scene")->addscene();
            // 鐢熸垚璁よ瘉鏉′欢
			// 鐧诲綍鎴愬姛
			//echo json_encode($returnLoginInfo);
		}
    }
	
	
    public function createBySys(){
		$this->unlogin();
        if (IS_POST) {
			// 鐧诲綍楠岃瘉
            $returnInfo = D("Scene")->addscenebysys();
            // 鐢熸垚璁よ瘉鏉′欢
			// 鐧诲綍鎴愬姛
			//echo json_encode($returnLoginInfo);
		}
    }
	
    public function createByCopy(){
		$this->unlogin();
        $returnInfo = D("Scene")->addscenebycopy();
    }
	
    public function on(){
		$this->unlogin();
        $returnInfo = D("Scene")->openscene(1);
    }
	
    public function off(){
		$this->unlogin();
        $returnInfo = D("Scene")->openscene(2);
    }
	

    public function savepage(){
		$this->unlogin();
        if (IS_POST) {
			// 鐧诲綍楠岃瘉
            $returnInfo = D("Scene")->savepage();
            // 鐢熸垚璁よ瘉鏉′欢
			// 鐧诲綍鎴愬姛
			//echo json_encode($returnLoginInfo);
		}
    }
	

    public function saveSettings(){
		$this->unlogin();
        if (IS_POST) {
			// 鐧诲綍楠岃瘉
            $returnInfo = D("Scene")->savesetting();
            // 鐢熸垚璁よ瘉鏉′欢
			// 鐧诲綍鎴愬姛
			//echo json_encode($returnLoginInfo);
		}
    }
	
    public function pageList(){
		$this->unlogin();
		$_scenepage = M('scenepage');
		//$where['uid']  = $datainfo['uid'];
		$where['sceneid_bigint']  = I('get.id',0);
		if(intval(session('userid'))!=1)
		{
			$where['userid_int']  = intval(session('userid'));
		}
		$_scene_list=$_scenepage->where($where)->order('pagecurrentnum_int asc')->select();
		//var_dump($_scene_list);exit;     
		//$this->display();
		$jsonstr = '{"success":true,"code":200,"msg":"success","obj":null,"map":null,"list":[';
		$jsonstrtemp = '';
		foreach($_scene_list as $vo){
			$jsonstrtemp = $jsonstrtemp .'{"id":'.$vo["pageid_bigint"].',"sceneId":'.$vo["sceneid_bigint"].',"num":'.$vo["pagecurrentnum_int"].',"name":null,"properties":null,"elements":null,"scene":null},';
		}
		$jsonstr = $jsonstr.rtrim($jsonstrtemp,',').']}';
		echo $jsonstr;
    }

	
    public function pvcount(){
		$this->unlogin();
		$_scene = M('scene');
		$where['userid_int']  = intval(session('userid'));
		$where['delete_int']  = 0;
		$_scene_list=$_scene->where($where)->sum('hitcount_int');
		echo '{"success":true,"code":200,"msg":"success","obj":'.$_scene_list.',"map":null,"list":null}';
    }
	
    public function opencount(){
		$this->unlogin();
		$_scene = M('scene');
		$where['userid_int']  = intval(session('userid'));
		$where['delete_int']  = 0;
		$where['showstatus_int']  = 1;
		$_scene_list=$_scene->where($where)->count();
		echo '{"success":true,"code":200,"msg":"success","obj":'.$_scene_list.',"map":null,"list":null}';
    }
	
    public function view(){
		$_scene = M('scene');

		//$where['uid']  = $datainfo['uid'];
		if(is_numeric(I('get.id',0))){
			$where2['sceneid_bigint']  = I('get.id',0);
		}
		else
		{
			$where2['scenecode_varchar']  = I('get.id',0);
		}
		$where2['delete_int']  = 0;
		$_scene_list2=$_scene->where($where2)->select();
		if($_scene_list2[0]['showstatus_int']!=1)
		{
			if($_scene_list2[0]['userid_int']!=intval(session('userid')))
			{
				$where3['sceneid_bigint']  = 267070;
				$_scene_list2=$_scene->where($where3)->select();
			}  
		}  

		$advuserinfo['userid_int'] = $_scene_list2[0]['userid_int'];
		$advUser = M('users');
		$returnadvInfo=$advUser->where($advuserinfo)->select();
		
		$_scenepage = M('scenepage');
		$where['sceneid_bigint']  = $_scene_list2[0]['sceneid_bigint'];
		$_scene_list=$_scenepage->where($where)->order('pagecurrentnum_int asc')->select();


		//var_dump($_scene_list);exit;     
		//$this->display();
		$jsonstr = '{"success": true,"code": 200,"msg": "鎿嶄綔鎴愬姛","obj": {"id": '.$_scene_list2[0]['sceneid_bigint'].',"name": '.json_encode($_scene_list2[0]['scenename_varchar']).',"createUser": "'.$_scene_list2[0]['userid_int'].'","type": '.$_scene_list2[0]['scenetype_int'].',"pageMode": '.$_scene_list2[0]['movietype_int'].',"image": {"imgSrc": "'.$_scene_list2[0]['thumbnail_varchar'].'",';
			
		if($returnadvInfo[0]['level_int']==4){
			$jsonstr = $jsonstr.'"isAdvancedUser": true';
		}else{
			$jsonstr = $jsonstr.'"isAdvancedUser": false';
		}
		if($_scene_list2[0]["musicurl_varchar"]!='')
		{
			$jsonstr = $jsonstr.',"bgAudio": {"url": "'.$_scene_list2[0]["musicurl_varchar"].'","type": "'.$_scene_list2[0]["musictype_int"].'"}';
		}
		$jsonstr = $jsonstr.'	
        },
        "isTpl": 0,
        "isPromotion": 0,
        "status": 1,
        "openLimit": 0,
        "startDate": null,
        "endDate": null,
        "updateTime": '.strtotime($_scene_list2[0]['createtime_time']).',
		"createTime": '.strtotime($_scene_list2[0]['createtime_time']).',
		"publishTime":'.intval(strtotime($_scene_list2[0]['publish_time'])).',
        "applyTemplate": 0,
        "applyPromotion": 0,
        "sourceId": null,
        "code": "'.$_scene_list2[0]['scenecode_varchar'].'",
        "description": '.json_encode($_scene_list2[0]['desc_varchar']).',
        "sort": 0,
        "pageCount": 0,
        "dataCount": 0,
        "showCount": 0,
        "userLoginName": null,
        "userName": null
    },
    "map": null,
    "list": [';
		$jsonstrtemp = '';
		foreach($_scene_list as $vo)
        {
			$jsonstrtemp = $jsonstrtemp .'{"id": '.$vo["pageid_bigint"].',"sceneId": '.$vo["sceneid_bigint"].',"num": '.$vo["pagecurrentnum_int"].',
				"name": null,"properties":'.$vo["properties_text"].',"elements": '.$vo["content_text"].',"scene": null},';
		}
		$jsonstr = $jsonstr.rtrim($jsonstrtemp,',').'';
		$jsonstr = $jsonstr.']}';
		echo $jsonstr;
    }

	
    public function design(){
		$this->unlogin();
		$_scenepage = M('scenepage');
		//$where['uid']  = $datainfo['uid'];
		$where['pageid_bigint']  = I('get.id',0);
		if(intval(session('userid'))!=1)
		{
			$where['userid_int']  = intval(session('userid'));
		}
		$_scene_list=$_scenepage->where($where)->select();
		
		$_scene = M('scene');
		//$where['uid']  = $datainfo['uid'];
		if(intval(session('userid'))!=1)
		{
			$where2['userid_int']  = intval(session('userid'));
		}
		$where2['delete_int']  = 0;
		$where2['sceneid_bigint']  = $_scene_list[0]['sceneid_bigint'];
		$_scene_list2=$_scene->where($where2)->select();     

		//var_dump($_scene_list);exit;     

		$jsonstr = '{"success": true,"code": 200,"msg": "success","obj": {"id": '.$_scene_list[0]['pageid_bigint'].',"sceneId": '.$_scene_list[0]['sceneid_bigint'].',"num": '.$_scene_list[0]['pagecurrentnum_int'].',"name": null,"properties": '.$_scene_list[0]["properties_text"].',"elements": '.$_scene_list[0]['content_text'].',"scene": {"id": '.$_scene_list2[0]['sceneid_bigint'].',"name": '.json_encode($_scene_list2[0]['scenename_varchar']).',"createUser": "'.$_scene_list2[0]['userid_int'].'","createTime": 1425998747000,"type": '.$_scene_list2[0]['scenetype_int'].',"pageMode": '.$_scene_list2[0]['movietype_int'].',"image": {"imgSrc": "'.$_scene_list2[0]['movietype_int'].'","isAdvancedUser": false';
		if($_scene_list2[0]['musicurl_varchar']!=''){
			$jsonstr = $jsonstr.',"bgAudio": {"url": "'.$_scene_list2[0]["musicurl_varchar"].'","type": "'.$_scene_list2[0]["musictype_int"].'"}';
		}
		$jsonstr = $jsonstr.'},"isTpl": 0,"isPromotion": 0,"status": 1,"openLimit": 0,	"submitLimit": 0,	"startDate": null,	"endDate": null,	"accessCode": null,	"thirdCode": null,	"updateTime": '.strtotime($_scene_list2[0]['createtime_time']).',	"publishTime": '.intval(strtotime($_scene_list2[0]['publish_time'])).',	"applyTemplate": 0,	"applyPromotion": 0,	"sourceId": null,	"code": "'.$_scene_list2[0]['scenecode_varchar'].'",	"description": "'.($_scene_list2[0]['desc_varchar']).'",	"sort": 0,"pageCount": 0,	"dataCount": 0,	"showCount": '.$_scene_list2[0]['hitcount_int'].',	"userLoginName": null,"userName": null}},	"map": null,"list": null}';
		echo $jsonstr;
    }

    public function publish(){
        $this->unlogin();
        $_sceneid = intval(I('get.id',0));
        if($_sceneid>0){
            $_scene = D('Scene');
            $_scene->publish($_sceneid);

            $jsonstr = '{
                "success": true,
                "code": 200,
                "msg": "success",
                "obj":null,
                "map":null,
                "list":null
			}';
            echo $jsonstr;
        }
    }

    public function detail(){
		$this->unlogin();
		$_scene = M('scene');
		if(intval(session('userid'))!=1)
		{
			$where['userid_int']  = intval(session('userid'));
		}
        $_sceneid = intval(I('get.id',0));
		$where['sceneid_bigint']  = $_sceneid;
		$where['delete_int']  = 0;
		$_scene_list=$_scene->where($where)->select();

        $deviceInfo = D('Device')->getDeviceInfo($_sceneid);

		$jsonstr = '{
			"success": true,
			"code": 200,
			"msg": "success",
			"obj": {
				"id": '.$_scene_list[0]['sceneid_bigint'].',
				"name": '.json_encode($_scene_list[0]['scenename_varchar']).',
				"deviceInfo": '.json_encode($deviceInfo).',
				"createUser": "'.$_scene_list[0]['userid_int'].'",
				"createTime": 1425998747000,
				"type": '.$_scene_list[0]['scenetype_int'].',
				"pageMode": '.$_scene_list[0]['movietype_int'].',
				"image": {
					"imgSrc": "'.$_scene_list[0]['thumbnail_varchar'].'",
					"isAdvancedUser": false';
				
				if($_scene_list[0]["musicurl_varchar"]!='')
				{
					$jsonstr = $jsonstr.',"bgAudio": {"url": "'.$_scene_list[0]["musicurl_varchar"].'","type": "'.$_scene_list[0]["musictype_int"].'"}';
				}
				$jsonstr = $jsonstr.'},
				"isTpl": 0,
				"isPromotion": 0,
				"status": '.$_scene_list[0]['showstatus_int'].',
				"openLimit": 0,
				"submitLimit": 0,
				"startDate": null,
				"endDate": null,
				"accessCode": null,
				"thirdCode": null,
				"updateTime": '.strtotime($_scene_list[0]['createtime_time']).',
				"publishTime": '.intval(strtotime($_scene_list[0]['publish_time'])).',
				"applyTemplate": 0,
				"applyPromotion": 0,
				"sourceId": null,
				"code": "'.$_scene_list[0]['scenecode_varchar'].'",
				"description": '.json_encode($_scene_list[0]['desc_varchar']).',
				"sort": 0,
				"pageCount": 0,
				"dataCount": '.$_scene_list[0]["datacount_int"].',
				"showCount": '.$_scene_list[0]['hitcount_int'].',
				"userLoginName": null,
				"userName": null
			},
			"map": null,
			"list": null
		}';
		echo $jsonstr;

    }


    public function createpage(){
		$this->unlogin();
		$_scenepage = M('scenepage');
		$_scene = M('scene');
		$where['pageid_bigint']  = I('get.id',0);
		$iscopy  = I('get.copy',"false");
		if(intval(session('userid'))!=1)
		{
			$where['userid_int']  = intval(session('userid'));
		}
		$_scene_list=$_scenepage->where($where)->select();
		if(!$_scene_list)
		{
			header('HTTP/1.1 403 Unauthorized');
			echo json_encode(array("success" => false,"code"=> 403,"msg" => "false","obj"=> null,"map"=> null,"list"=> null));
			exit;
		}
		$datainfo['scenecode_varchar'] = $_scene_list[0]['scenecode_varchar'];
		$datainfo['sceneid_bigint'] = $_scene_list[0]['sceneid_bigint'];
		$datainfo['pagecurrentnum_int'] = $_scene_list[0]['pagecurrentnum_int']+1;
		$datainfo['createtime_time'] = date('y-m-d H:i:s',time());
		if($iscopy=="true")
		{
			$datainfo['content_text'] = $_scene_list[0]['content_text'];
		}
		else
		{
			$datainfo['content_text'] = "[]";
		}
		$datainfo['properties_text'] = 'null';
		$datainfo['userid_int'] = session('userid');
		$result = $_scenepage->add($datainfo);
		
		$where2['sceneid_bigint']  = $_scene_list[0]['sceneid_bigint'];
		if(intval(session('userid'))!=1)
		{
			$where2['userid_int']  = intval(session('userid'));
		}
		$_scene_list2=$_scene->where($where2)->select();     

		$jsonstr = '{
					"success": true,
					"code": 200,
					"msg": "success",
					"obj": {
						"id": '.$result.',
						"sceneId": '.$_scene_list[0]['sceneid_bigint'].',
						"num": '.($_scene_list[0]['pagecurrentnum_int']+1).',
						"name": null,
						"properties": null,
						"elements": null,
						"scene": {
							"id": '.$_scene_list2[0]['sceneid_bigint'].',
							"name": '.json_encode($_scene_list2[0]['scenename_varchar']).',
							"createUser": "'.$_scene_list2[0]['userid_int'].'",
							"createTime": 1425998747000,
							"type": '.$_scene_list2[0]['scenetype_int'].',
							"pageMode": '.$_scene_list2[0]['movietype_int'].',
							"image": {
								"imgSrc": "'.$_scene_list2[0]['thumbnail_varchar'].'",
								"isAdvancedUser": false
							},
							"isTpl": 0,
							"isPromotion": 0,
							"status": '.$_scene_list2[0]['showstatus_int'].',
							"openLimit": 0,
							"submitLimit": 0,
							"startDate": null,
							"endDate": null,
							"accessCode": null,
							"thirdCode": null,
							"updateTime": '.strtotime($_scene_list2[0]['createtime_time']).',
							"publishTime": '.intval(strtotime($_scene_list2[0]['publish_time'])).',
							"applyTemplate": 0,
							"applyPromotion": 0,
							"sourceId": null,
							"code": "'.$_scene_list2[0]['scenecode_varchar'].'",
							"description": '.json_encode($_scene_list2[0]['desc_varchar']).',
							"sort": 0,
							"pageCount": 0,
							"dataCount": 0,
							"showCount": 0,
							"userLoginName": null,
							"userName": null
						}
					},
					"map": null,
					"list": null
				}';
						echo $jsonstr;

    }

    public function delpage(){
		$this->unlogin();
		$map['pageid_bigint']= I('get.id',0);
		if(intval(session('userid'))!=1)
		{
			$map['userid_int']  = intval(session('userid'));
		}
        M("scenepage")->where($map)->delete();
		echo json_encode(array("success" => true,
								"code"=> 200,
								"msg" => "success",
								"obj"=> null,
								"map"=> null,
								"list"=> null
							   )
						);


    }
	
    public function getcount(){
		echo json_encode(array("success" => true,
								"code"=> 200,
								"msg" => "success",
								"obj"=> null,
								"map"=> null,
								"list"=> null
							   )
						);


    }


    public function delscene(){
		$this->unlogin();
		$map['sceneid_bigint']= I('get.id',0);
		if(intval(session('userid'))!=1)
		{
			$map['userid_int']  = intval(session('userid'));
		}
		$datainfo['delete_int'] = 1;
		M("scene")->data($datainfo)->where($map)->save();

		echo json_encode(array("success" => true,
								"code"=> 200,
								"msg" => "success",
								"obj"=> null,
								"map"=> null,
								"list"=> null
							   )
						);


    }

    public function my(){
		$this->unlogin();
		$_scene = M('scene');
		$scenetype = intval(I('get.type',0));
        $deviceType = intval(I('get.deviceType',0));
        $showPage = intval(I('get.showPage',0));

        $_device = D('Device');
        $_deviceInfo = $_device->getDeviceByUserAndStatus(intval(session('userid')),1);
        trace($_deviceInfo);


        if($scenetype > 0){
            $where['scenetype_int']  = $scenetype;
        } else if(!$showPage) {
            if(!$deviceType && $_deviceInfo) $deviceType = $_deviceInfo["firstDevice"];
            $pageIds = D('Device')->getSceneByDeviceId($deviceType);
            if(!empty($pageIds))    $where['sceneid_bigint']  = array('in',$pageIds);
        }

		$where['userid_int']  = intval(session('userid'));
		//$_scene_list=$_scene->order('sceneid_bigint desc')->page(I('get.pageNo',1),I('get.pageSize',12))->select();
		$where['delete_int']  = 0;
		$pageshowsize = I('get.pageSize',12);
		if($pageshowsize>30){
			$pageshowsize = 30;
		}
        //var_dump($where);
		$_scene_list=$_scene->where($where)->order('sceneid_bigint desc')->page(I('get.pageNo',1),$pageshowsize)->select();
		$_scene_count = $_scene->where($where) ->count();

		//var_dump($_scene_list);exit;
		//$this->display();
		$jsonstr = '{
		    "success":true,
		    "code":200,
		    "msg":"success",
		    "obj":null,
		    "map": {
		        "devices":'.$_deviceInfo["listJson"].',
		        "deviceCount":'.$_deviceInfo["count"].',
		        "count": '.$_scene_count.',
		        "pageNo": '.I('get.pageNo',0).',
		        "pageSize": '.$pageshowsize.'
            },
            "list": [';
		$jsonstrtemp = '';
		foreach($_scene_list as $vo){
            $displayName = $vo["scenename_varchar"].' '.$_device->getDeviceInfo($vo["sceneid_bigint"]);
			$jsonstrtemp = $jsonstrtemp .'{
            "id": '.$vo["sceneid_bigint"].',
            "name": '.json_encode($displayName).',
            "createUser": "'.$vo['userid_int'].'",
            "createTime": 1423645519000,
            "type": '.$vo["scenetype_int"].',
            "pageMode": '.$vo["movietype_int"].',
            "image": {
                "bgAudio": {
                    "url": "'.$vo["musicurl_varchar"].'",
                    "type": "'.$vo["musictype_int"].'"
                },
                "imgSrc": "'.$vo["thumbnail_varchar"].'",
                "hideEqAd": false,
                "isAdvancedUser": false
            },
            "isTpl": 0,
            "isPromotion": 0,
            "status": '.$vo['showstatus_int'].',
            "openLimit": 0,
            "submitLimit": 0,
            "startDate": null,
            "endDate": null,
            "accessCode": null,
            "thirdCode": null,
            "updateTime": '.strtotime($vo['createtime_time']).',
            "publishTime": '.intval(strtotime($vo['publish_time'])).',
            "applyTemplate": 0,
            "applyPromotion": 0,
            "sourceId": 1225273,
            "code": "'.$vo["scenecode_varchar"].'",
            "description": '.json_encode($vo["desc_varchar"]).',
            "sort": 0,
            "pageCount": 0,
            "dataCount": '.$vo["datacount_int"].',
            "showCount": '.$vo["hitcount_int"].',
            "userLoginName": null,
            "userName": null
        },';
		}
		$jsonstr = $jsonstr.rtrim($jsonstrtemp,',').']}';
		echo $jsonstr;
    }

    public function stat(){
        echo '{
        "success":true,
        "code":200,
        "msg":"操作成功",
        "obj":null,
        "map":{
            "count":0,
            "pageNo":1,
            "pageSize":30
        },
        "list":[
            {"STAT_DATE":123,"SHOW":5,"DATA":23},
            {"STAT_DATE":223,"SHOW":58,"DATA":33},
            {"STAT_DATE":323,"SHOW":58,"DATA":13}
        ]}';
    }

	//  绯荤粺妯℃澘鍒楄〃
    public function syslist(){
		$this->unlogin();
		$_scene = M('scene');
		$scenetype = intval(I('get.tagId',0));
		if($scenetype > 0)
		{
			$where['tagid_int']  = $scenetype;
		}
		$where['userid_int']  = 0;

		$where['delete_int']  = 0;
		$pageshowsize = I('get.pageSize',12);
		if($pageshowsize>30){
			$pageshowsize = 30;
		}
		$_scene_list=$_scene->where($where)->order('sceneid_bigint desc')->page(I('get.pageNo',1),$pageshowsize)->select();
		$_scene_count = $_scene->where($where) ->count();
        $sql[status]=1;
        $sql[userid_int]=intval(session('userid'));
        $_device_count = M('scene')->where($sql)->count();
		//var_dump($_scene_list);exit;     
		//$this->display();
		$jsonstr = '{"success":true,"code":200,"msg":"success","obj":null,"map": {"deviceCount":'.$_device_count.',"count": '.$_scene_count.',"pageNo": '.I('get.pageNo',0).',"pageSize": '.$pageshowsize.'},"list": [';
		$jsonstrtemp = '';
		foreach($_scene_list as $vo){
			$jsonstrtemp = $jsonstrtemp .'{
            "id": '.$vo["sceneid_bigint"].',
            "name": '.json_encode($vo["scenename_varchar"]).',
            "createUser": "'.$vo['userid_int'].'",
            "createTime": 1423645519000,
            "type": '.$vo["scenetype_int"].',
            "pageMode": '.$vo["movietype_int"].',
            "image": {
                "bgAudio": {
                    "url": "'.$vo["musicurl_varchar"].'",
                    "type": "'.$vo["musictype_int"].'"
                },
                "imgSrc": "'.$vo["thumbnail_varchar"].'",
                "hideEqAd": false,
                "isAdvancedUser": false
            },
            "isTpl": 0,
            "isPromotion": 0,
            "status": '.$vo['showstatus_int'].',
            "openLimit": 0,
            "submitLimit": 0,
            "startDate": null,
            "endDate": null,
            "accessCode": null,
            "thirdCode": null,
            "updateTime": '.strtotime($vo['createtime_time']).',
            "publishTime": '.intval(strtotime($vo['publish_time'])).',
            "applyTemplate": 0,
            "applyPromotion": 0,
            "sourceId": 1225273,
            "code": "'.$vo["scenecode_varchar"].'",
            "description": '.json_encode($vo["desc_varchar"]).',
            "sort": 0,
            "pageCount": 0,
            "dataCount": 0,
            "showCount": '.$vo["hitcount_int"].',
            "userLoginName": null,
            "userName": null
        },';
		}
		$jsonstr = $jsonstr.rtrim($jsonstrtemp,',').']}';
		echo $jsonstr;
    }



    public function syspageinfo(){
		$this->unlogin();
		$_scene = M('scenepagesys');
		$scenetype = intval(I('get.id',0));
		$where['pageid_bigint']  = $scenetype;
		$_scene_list=$_scene->where($where)->select();
		$jsonstr = '{"success":true,"code":200,"msg":"success","obj":{"id":'.$_scene_list[0]['pageid_bigint'].',"sceneId":1,"num":1,"name":"sys","properties":{"thumbSrc":"'.$_scene_list[0]['thumbsrc_varchar'].'"},"elements":'.$_scene_list[0]['content_text'].',"scene":null},"map":null,"list":null}';
		echo $jsonstr;
    }

    public function syspagetpl(){
		$this->unlogin();
		$_scene = M('scenepagesys');
		$scenetype = intval(I('get.tagId',0));
		$where['tagid_int']  = $scenetype;

		$_scene_list=$_scene->where($where)->order('pageid_bigint desc')->select();

		$jsonstr = '{"success":true,"code":200,"msg":"success","obj":null,"map": null,"list": [';
		$jsonstrtemp = '';
		foreach($_scene_list as $vo){
			$jsonstrtemp = $jsonstrtemp .'{"id":'.$vo["pageid_bigint"].',"sceneId":1,"num":1,"name":"name","properties":{"thumbSrc":"'.$vo["thumbsrc_varchar"].'"},"elements":null,"scene":null},';
		}
		$jsonstr = $jsonstr.rtrim($jsonstrtemp,',').']}';
		echo $jsonstr;
    }

}