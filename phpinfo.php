#!/var/lib/php
<?php
//include_once("connect.php");
	//phpinfo();
//var_dump time();
//var_dump "<br>/n";
//var_dump mktime(0, 0, 0, 6, 18, 2015);

$util = new phpUtil();

//$util->getPage();

$util->test();


class phpUtil
{
    private $appId;
    private $appSecret;

    public function init($appId, $appSecret)
    {
        $this->appId = $appId;
        $this->appSecret = $appSecret;
    }

    public function test(){
        /*
        $sql = "select * from cj_scene";
        $pagQuery = mysql_query($sql);
        if ($rowPage = mysql_fetch_array($pagQuery)) {
            print_r( strtotime($rowPage['publish_time']) );
            //print_r('\n');
            var_dump( strtotime($rowPage['createtime_time']) );
        }
        */
        var_dump( date("Y-m-d h:i:s",1435585613) );
        echo '\n';
        var_dump( getdate(1435412813) );

    }

    public function getPage()
    {
        $pageIds = '123,234,345';
        $pages = explode(',', $pageIds);
        foreach($pages as $pageId){
            var_dump($pageId);

        }
    }
}
?>
