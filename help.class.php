#!/var/lib/php
<?php
/*
 * PHP 是 "PHP Hypertext Preprocessor" 的首字母缩略词
 *
 * this is a help to teach you how to use PHP
 * */
include_once("connect.php"); //require 会生成致命错误（E_COMPILE_ERROR）并停止脚本; include 只生成警告（E_WARNING），并且脚本会继续

date_default_timezone_set("Asia/Shanghai");

// 一些基本的配置： display_errors、 log_errors、 error_reporting、 error_log
error_reporting(E_ALL);
ini_set('display_errors', true);
ini_set('html_errors', false);

//常量
define("GREETING", "Welcome to W3School.com.cn!", true); //规定常量名是否对大小写敏感。默认是 false

$x = 6;

$util = new phpUtil();
$util->help();

echo "I'd like an {${help::softdrink}} ";

/*
 * 魔术方法
    __construct()， __destruct()， __call()， __callStatic()， __get()， __set()， __isset()， __unset()， __sleep()， __wakeup()，
    __toString()， __invoke()， __set_state()， __clone() 和 __debugInfo() 等方法在 PHP 中被称为"魔术方法"（Magic methods）。
    在命名自己的类方法时不能使用这些方法名，除非是想使用其魔术功能。
 * */

class BaseClass {
    public $one = 1;

    function __construct() {
        print "In BaseClass constructor\n";
    }

    function __destruct() { //析构函数
        print "Destroying " . $this->name . "\n";
    }

    public function show_one() {
        echo $this->one;
    }
}

trait ezcReflectionReturnInfo {
    function getReturnType() { /*1*/ }
    function getReturnDescription() { /*2*/ }
}

class help extends BaseClass
{
    use ezcReflectionReturnInfo;

    var $color;

    private $appId;
    private $appSecret;

    const softdrink = 'rootbeer';
    public static $ale = 'ipa';

    function __construct() {
        parent::__construct();
        print "In SubClass constructor\n";
    }

    function Car($color = "green")
    {
        $this->color = $color;
    }

    public function init($appId, $appSecret)
    {
        global $x; // global 关键词用于访问函数内的全局变量。PHP 同时在名为 $GLOBALS[index] 的数组中存储了所有的全局变量。下标存有变量名。这个数组在函数内也可以访问，并能够用于直接更新全局变量。

        static $y = 0; //当函数完成/执行后，会删除所有变量。不过，有时我需要不删除某个局部变量. Note: 该变量仍然是函数的局部变量。

        $this->appId = $appId;
        $this->appSecret = $appSecret;

        //
        echo htmlspecialchars($_SERVER["PHP_SELF"]); //  stripslashes   trim


    }

    public function help()
    {
        $sql = "select * from cj_scene";
        $pagQuery = mysql_query($sql);
        if ($rowPage = mysql_fetch_array($pagQuery)) {
            print_r(strtotime($rowPage['publish_time']));
            //print_r('\n');
            var_dump(strtotime($rowPage['createtime_time']));
        }

    }

    /*
     *  count()和 sizeof()统计数组下标的个数
        array_count_values()统计数组内下标值的个数


        反向排序:sort()、asort()和 ksort()都是正向排序,当然也有相对应的反向排序.
        实现反向:rsort()、arsort()和 krsort()。

        array_unshift()函数将新元素添加到数组头,array_push()函数将每个新元素添加到数组 的末尾。
        array_shift()删除数组头第一个元素,与其相反的函数是 array_pop(),删除并返回数组末 尾的一个元素。
        array_rand()返回数组中的一个或多个键。

        函数shuffle()将数组个元素进 行随机排序。
        函数 array_reverse()给出一个原来数组的反向排序

     *
     * */

    function helpArray()
    {
        $colors = array("red", "green", "blue", "yellow");

        foreach ($colors as $value) {
            echo "$value <br>";
        }
        for ($i = 0, $cnt = count($colors); $i <= $cnt; $i++) {
            echo "数字是：$i <br>";
            echo "\nChecking $i: \n";
            echo "Bad: " . $colors['$i'] . "\n";
            echo "Good: " . $colors[$i] . "\n";
            echo "Bad: {$colors['$i']}\n";
            echo "Good: {$colors[$i]}\n";
        }


        $age = array("Bill" => "35", "Steve" => "37", "Peter" => "43");
        foreach ($age as $x => $x_value) {
            echo "Key=" . $x . ", Value=" . $x_value;
            echo "<br>";
        }
        foreach ($age as list($a, $b)) {
            // $a contains the first element of the nested array,
            // and $b contains the second element.
            echo "A: $a; B: $b\n";
        }

        $array = array(
            "foo" => "bar",
            42    => 24,
            "multi" => array(
                "dimensional" => array(
                    "array" => "foo"
                )
            )
        );
        var_dump($array["foo"]);
        var_dump($array[42]);
        var_dump($array["multi"]["dimensional"]["array"]);

        $arr = array(5 => 1, 12 => 2);
        $arr[] = 56;    // This is the same as $arr[13] = 56;
        // at this point of the script
        $arr["x"] = 42; // This adds a new element to
        // the array with key "x"
        unset($arr[5]); // This removes the element from the array
        unset($arr);    // This deletes the whole array

        $strArr = "a,b,c,d"; // split a string to an array
        $nArr = explode(',', $strArr);
        in_array(get_client_ip(),explode(',',$strArr));

    }

    function helpDate()
    {
        echo "当前时间是 " . date("h:i:sa"); // $_server['server_time']

        $d = mktime(9, 12, 31, 6, 10, 2015);
        echo "创建日期是 " . date("Y-m-d h:i:sa", $d);

        $d = getdate(1425139200);
    }

    function helpFile()
    {
        $myfile = fopen("webdictionary.txt", "r") or die("Unable to open file!");
        echo fread($myfile, filesize("webdictionary.txt"));
        fclose($myfile);

        $myfile = fopen("webdictionary.txt", "r") or die("Unable to open file!");
        // 输出单行直到 end-of-file
        while (!feof($myfile)) {
            echo fgets($myfile) . "<br>";
        }
        fclose($myfile);

        $myfile = fopen("newfile.txt", "w") or die("Unable to open file!");
        $txt = "Mickey Mouse\n";
        fwrite($myfile, $txt);
        $txt = "Minnie Mouse\n";
        fwrite($myfile, $txt);
        fclose($myfile);


        if ((($_FILES["file"]["type"] == "image/gif")
                || ($_FILES["file"]["type"] == "image/jpeg")
                || ($_FILES["file"]["type"] == "image/pjpeg"))
            && ($_FILES["file"]["size"] < 20000)
        ) {
            if ($_FILES["file"]["error"] > 0) {
                echo "Return Code: " . $_FILES["file"]["error"] . "<br />";
            } else {
                echo "Upload: " . $_FILES["file"]["name"] . "<br />";
                echo "Type: " . $_FILES["file"]["type"] . "<br />";
                echo "Size: " . ($_FILES["file"]["size"] / 1024) . " Kb<br />";
                echo "Temp file: " . $_FILES["file"]["tmp_name"] . "<br />";

                if (file_exists("upload/" . $_FILES["file"]["name"])) {
                    echo $_FILES["file"]["name"] . " already exists. ";
                } else {
                    move_uploaded_file($_FILES["file"]["tmp_name"],
                        "upload/" . $_FILES["file"]["name"]);
                    echo "Stored in: " . "upload/" . $_FILES["file"]["name"];
                }
            }
        } else {
            echo "Invalid file";
        }


    }

    function helpCookie()
    {
        setcookie("user", "Alex Porter", time() + 3600);
        // Print a cookie
        echo $_COOKIE["user"];
        // A way to view all cookies
        print_r($_COOKIE);


    }

    function helpDebug()
    {
        //error handler function
        function customError($errno, $errstr)
        {
            echo "<b>Error:</b> [$errno] $errstr<br />";
            echo "Ending Script";
            die();
        }

        //set error handler
        set_error_handler("customError", E_USER_WARNING);

        //trigger error
        $test = 2;
        if ($test > 1) {
            trigger_error("Value must be 1 or below", E_USER_WARNING);
        }


        //创建可抛出一个异常的函数
        function checkNum($number)
        {
            if ($number > 1) {
                throw new Exception("Value must be 1 or below");
            }
            return true;
        }

        //在 "try" 代码块中触发异常
        try {
            checkNum(2);
            //If the exception is thrown, this text will not be shown
            echo 'If you see this, the number is 1 or below';
        } //捕获异常
        catch (Exception $e) {
            echo 'Message: ' . $e->getMessage();
        }

        // 一些基本的 API： echo (print)、 print_r、 var_dump(var_export)、debug_zval_dump 、debug_print_backtrace(debug_backtrace)
        $msg = "Error Message!";
        echo "debug info";
        print_r($msg);
        var_dump($msg);
        sprintf($msg);
        vsprintf($msg,array(1,2));
    }

    function helpXML()
    {

//Initialize the XML parser
        $parser=xml_parser_create();

//Function to use at the start of an element
        function start($parser,$element_name,$element_attrs)
        {
            switch($element_name)
            {
                case "NOTE":
                    echo "-- Note --<br />";
                    break;
                case "TO":
                    echo "To: ";
                    break;
                case "FROM":
                    echo "From: ";
                    break;
                case "HEADING":
                    echo "Heading: ";
                    break;
                case "BODY":
                    echo "Message: ";
            }
        }

//Function to use at the end of an element
        function stop($parser,$element_name)
        {
            echo "<br />";
        }

//Function to use when finding character data
        function char($parser,$data)
        {
            echo $data;
        }

//Specify element handler
        xml_set_element_handler($parser,"start","stop");

//Specify data handler
        xml_set_character_data_handler($parser,"char");

//Open XML file
        $fp=fopen("test.xml","r");

//Read data
        while ($data=fread($fp,4096))
        {
            xml_parse($parser,$data,feof($fp)) or
            die (sprintf("XML Error: %s at line %d",
                xml_error_string(xml_get_error_code($parser)),
                xml_get_current_line_number($parser)));
        }

//Free the XML parser
        xml_parser_free($parser);


        // read xml from Dom
        $xmlDoc = new DOMDocument();
        $xmlDoc->load("note.xml");

        $x = $xmlDoc->documentElement;
        foreach ($x->childNodes AS $item)
        {
            print $item->nodeName . " = " . $item->nodeValue . "<br />";
        }

        $postStr = '<xml a="test"/>';
        $postObj = simplexml_load_string($postStr, 'SimpleXMLElement', LIBXML_NOCDATA);
    }

    function helpString()
    {
        // 字符串长度判断 第二种写法要优于第一种。
        $str= "test me";
        if(strlen($str) < 5){/* do something (Bad) */}

        if(isset($str[5])){ /* do something (Good)*/ }



    }

    /*
     PHP » 4.1.0 版本引入了如下超全局数组变量： $_GET、$_POST、$_COOKIE、 $_SERVER、$_FILES、$_ENV、 $_REQUEST 以及 $_SESSION。
     *
     伪类型
     *  mixed 说明一个参数可以接受多种不同的（但不一定是所有的）类型。
     *  number 说明一个参数可以是 integer 或者 float。
     *  本文档中在 PHP 5.4 引入 callable 类型之前使用 了 callback 伪类型。二者含义完全相同。
     *  void 作为返回类型意味着函数的返回值是无用的。void 作为参数列表意味着函数不接受任何参数。
     *  在函数原型中，$... 表示等等的意思。当一个函数可以接受任意个参数时使用此变量名。
     *
    允许的强制转换有：
	* (int), (integer) - 转换为 整型(integer)
	* (bool), (boolean) - 转换为 布尔型(boolean)
	* (float), (double), (real) - 转换为 浮点型(float)
	* (string) - 转换为 字符串(string)
	* (binary) - 转换为二进制 字符串(string) (PHP 6)
	* (array) - 转换为 数组(array)
	* (object) - 转换为 对象(object)
	* (unset) - 转换为 NULL (PHP 5)
    (binary) 转换会在结果前面加上前缀'b'，PHP 5.2.1 新增。
     *
    魔术常量
     *  有八个魔术常量它们的值随着它们在代码中的位置改变而改变。例如 __LINE__ 的值就依赖于它在脚本中所处的行来决定。这些特殊的常量不区分大小写，如下：
     *  几个 PHP 的“魔术常量”名称说明
     * __LINE__文件中的当前行号。
     * __FILE__文件的完整路径和文件名。如果用在被包含文件中，则返回被包含的文件名。自 PHP 4.0.2 起，__FILE__ 总是包含一个绝对路径（如果是符号连接，则是解析后的绝对路径），而在此之前的版本有时会包含一个相对路径。
     * __DIR__文件所在的目录。如果用在被包括文件中，则返回被包括的文件所在的目录。它等价于 dirname(__FILE__)。除非是根目录，否则目录中名不包括末尾的斜杠。（PHP 5.3.0中新增） =
     * __FUNCTION__函数名称（PHP 4.3.0 新加）。自 PHP 5 起本常量返回该函数被定义时的名字（区分大小写）。在 PHP 4 中该值总是小写字母的。
     * __CLASS__类的名称（PHP 4.3.0 新加）。自 PHP 5 起本常量返回该类被定义时的名字（区分大小写）。在 PHP 4 中该值总是小写字母的。类名包括其被声明的作用区域（例如 Foo\Bar）。注意自 PHP 5.4 起
     * __CLASS__ 对 trait 也起作用。当用在 trait 方法中时，__CLASS__ 是调用 trait 方法的类的名字。
     * __TRAIT__Trait 的名字（PHP 5.4.0 新加）。自 PHP 5.4 起此常量返回 trait 被定义时的名字（区分大小写）。Trait 名包括其被声明的作用区域（例如 Foo\Bar）。
     * __METHOD__类的方法名（PHP 5.0.0 新加）。返回该方法被定义时的名字（区分大小写）。__NAMESPACE__当前命名空间的名称（区分大小写）。此常量是在编译时定义的（PHP 5.3.0 新增）。
     * 参见 get_class()，get_object_vars()，file_exists() 和 function_exists()。
     *
     *  */
    function helpVariable()
    {
        $a_bool = TRUE;   // a boolean
        $a_str  = "foo";  // a string; Note: string 最大可以达到 2GB。
        $an_int = 12;     // an integer
        $bar = (boolean) $a_str;   // $bar is a boolean
        $$a_str = 'world'; //可变变量 mean $foo = 'world';
        $newBar = &$a_str;              // 通过 $newBar 引用 $a_str; 引用赋值，简单地将一个 & 符号加到将要赋值的变量前（源变量） 只有有名字的变量才可以引用赋值;
        // $bar = &(24 * 7);  // 非法; 引用没有名字的表达式
        // $bar = &test();    // 非法

        // 如果只是想得到一个易读懂的类型的表达方式用于调试，用 gettype()。要查看某个类型，不要用 gettype()，而用 is_type 函数
        echo gettype($a_bool); // prints out:  boolean
        if (is_int($an_int)) {
            $an_int += 4;
        }
        if (is_string($a_str)) {
            echo "String: $a_str";
        }
        // 如果要将一个变量强制转换为某类型，可以对其使用强制转换或者 settype() 函数。
        settype($an_int,'string');

        echo <<<EOT
            My name is "$a_str". I am printing someo.
            Now, I am printing some {$an_int}.
            This should print a capital 'A': x41
EOT;

        // isset()  语言结构可以用来检测一个变量是否已被初始化。

        $a = new help();
        var_dump($a instanceof help); //instanceof 用于确定一个 PHP 变量是否属于某一类 class 的实例：
    }

    function helpSerialize()
    {
        $a = new BaseClass();
        $s = serialize($a);
        // 把变量$s保存起来以便文件page2.php能够读到
        file_put_contents('store', $s);

// page2.php:

        // 要正确了解序列化，必须包含下面一个文件
        include("classa.inc");

        $s = file_get_contents('store');
        $a = unserialize($s);

        // 现在可以使用对象$a里面的函数 show_one()
        $a->show_one();

    }

    function helpCrypt($connection, $username, $password)
    {
        // 存储密码散列
        $query  = sprintf("INSERT INTO users(name,pwd) VALUES('%s','%s');",
            pg_escape_string($username), md5($password));
        $result = pg_query($connection, $query);

        // 发送请求来验证用户密码
        $query = sprintf("SELECT 1 FROM users WHERE name='%s' AND pwd='%s';",
            pg_escape_string($username), md5($password));
        $result = pg_query($connection, $query);

        if (pg_num_rows($result) > 0) {
            echo 'Welcome, $username!';
        } else {
            echo 'Authentication failed for $username.';
        }

        // 一个实现分页更安全的方法
        // 使用数据库特定的敏感字符转义函数（比如 mysql_escape_string() 和 sql_escape_string()）把用户提交上来的非数字数据进行转义。
        // 如果数据库没有专门的敏感字符转义功能的话 addslashes() 和 str_replace() 可以代替完成这个工作。看看第一个例子，此例显示仅在查询的静态部分加上引号是不够的，查询很容易被攻破。
        settype($offset, 'integer');
        $query = "SELECT id, name FROM products ORDER BY name LIMIT 20 OFFSET $offset;";

        // 请注意格式字符串中的 %d，如果用 %s 就毫无意义了
        $query = sprintf("SELECT id, name FROM products ORDER BY name LIMIT 20 OFFSET %d;",
            $offset);

        // 加密过滤器mcrypt.*和 mdecrypt.*使用 libmcrypt 提供了对称的加密和解密。
        // 这两组过滤器都支持 mcrypt 扩展库中相同的算法，格式为 mcrypt.ciphername，其中 ciphername是密码的名字，将被传递给 mcrypt_module_open()。

        // 用 3DES 将文件加密输出
        $passphrase = 'My secret';

        /* Turn a human readable passphrase
         * into a reproducable iv/key pair
         */
        $iv = substr(md5('iv'.$passphrase, true), 0, 8);
        $key = substr(md5('pass1'.$passphrase, true) .
            md5('pass2'.$passphrase, true), 0, 24);
        $opts = array('iv'=>$iv, 'key'=>$key);

        $fp = fopen('secert-file.enc', 'wb');
        stream_filter_append($fp, 'mcrypt.tripledes', STREAM_FILTER_WRITE, $opts);
        fwrite($fp, 'Secret secret secret data');
        fclose($fp);

        // 读取加密的文件
        /* Turn a human readable passphrase
         * into a reproducable iv/key pair
         */
        $iv = substr(md5('iv'.$passphrase, true), 0, 8);
        $key = substr(md5('pass1'.$passphrase, true) .
            md5('pass2'.$passphrase, true), 0, 24);
        $opts = array('iv'=>$iv, 'key'=>$key);

        $fp = fopen('secert-file.enc', 'rb');
        stream_filter_append($fp, 'mdecrypt.tripledes', STREAM_FILTER_WRITE, $opts);
        $data = rtrim(stream_get_contents($fp));
        fclose($fp);

        echo $data;


    }

    function helpMysql()
    {

    }

    /*
     *
     *
     * */
    function helpImage()
    {
        // 1. 画一张浅蓝色的画布，上面有白线有白字。
        $height=300;
        $width=300;
        $im =ImageCreateTrueColor($width,$height);//创建真彩色的图像
        $white =ImageColorAllocate($im ,255,255,255);
        $blue =ImageColorAllocate($im ,0,0,64);
        ImageFill($im,0,0,$blue);//浅蓝色的背景
        ImageLine($im,0,0,$width,$height,$white);//在图像上面画一条白线
        ImageString($im,4,80,150,"PHP",$white);//写出白色的"PHP"
        Header("Content-type:image/png");
        ImagePng($im);
        ImageDestroy($im);

        // 2. 创建缩略图
        $image = imagecreatefromjpeg("images/cat.jpg");
        $width = imagesx($image);
        $height = imagesy($image);
        $thumb_width = $width *0.5;
        $thumb_height = $height *0.5;
        $thumb = imagecreatetruecolor($thumb_width,$thumb_height);//创建一个原图一半大小的画布
        imagecopyresampled($thumb,$image,0,0,0,0,$thumb_width,$thumb_height,$width,$height);
        imagejpeg($thumb,"images/cat_thumb.jpg",100);//将缩略图保存到文件，第三个参数是质量
        imagedestroy($thumb);//清楚占用内存

        // 3. 给图片加水印 加水印都是有透明度的，所以需要选择一个PNG格式的图片作为需要添加的水印。
        $image =imagecreatefromjpeg("images/shaobing.jpg");
        $watermark =imagecreatefrompng("images/watermark.png");
        $width =imagesx($watermark);
        $height = imagesy($watermark);
        //将水印加到图片左上角
        imagecopyresampled($image,$watermark,0,0,0,0,$width,$height,$width,$height);
        imagejpeg($image,"image/shaobing_water.jpg",100);
        imagedestroy($image);

        // 4. 给图片加文字
        $image =imagecreatefromjpeg("images/shaobing.jpg");
        $pink = ImageColorAllocate($image,255,255,255);
        //$font_file 字体的路径，视操作系统而定，可以是simhei.ttf(黑体)
        //SIMKAI.TTF(楷体),SIMFANG.TTF(仿宋),SIMSUN.TTC(宋体&新宋体)等GD支持的中文字体
        $font_file ="C:\WINDOWS\Fonts\msyhbd.ttf";
        $str ="我喜欢烧饼！ >_< ";
        $str =mb_convert_encoding($str,"UTF-8","GBK");
        imagettftext($image,25,10,100,200,$pink,$font_file,$str);//设置字体颜色
        imagejpeg($image,"image/shaobing_text.jpg",100);//将带有文字的图片保存到文件
        imagedestroy($image);
    }

    function helpMe()
    {

    }

    public function getPage()
    {
        $pageIds = '123,234,345';
        $pages = explode(',', $pageIds);
        foreach ($pages as $pageId) {
            var_dump($pageId);

        }
    }
}

?>
