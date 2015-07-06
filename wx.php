<?php
include_once("connect.php");
include("Lib/JSSDK.class.php");

$syncWeiXin = new SyncWeiXin();
$syncWeiXin->sync();
//echo '</pre><br>';
//echo '<br>getPois<br>';
//echo json_encode( $jssdk->getPois() );
//echo '</pre><br>';

class SyncWeiXin
{
    private $sdk;

    public function __construct() {
        $this->sdk = new JSSDK("wx017de222d2cea2c0", "6dc0180feaa7cfa988b1d5fcfdb4982e");
    }

    public function getPageIdBySceneId($sceneId) {
        $jssdk = $this->sdk;
        $sql = "select page_id from cj_device_scene WHERE page_id<>0 And sceneid_bigint=".$sceneId;
        $jssdk->printMe('cj_device_scene_1', $sql );
        $pagQuery = mysql_query($sql);
        $pageId = 0;
        if ($rowPage = mysql_fetch_array($pagQuery)) {
            $pageId = $rowPage['page_id'];
        }
        return $pageId;
    }

    public function addPage($sceneId) {
        // add the page
        $jssdk = $this->sdk;
        $pageId = 0;
        $sql = "select scenename_varchar,desc_varchar,thumbnail_varchar,scenecode_varchar from cj_scene WHERE sceneid_bigint=$sceneId";
        $jssdk->printMe('cj_scene', $sql );
        $sceneQuery = mysql_query($sql);
        if($rowScene = mysql_fetch_array($sceneQuery)){
            $jssdk->printMe('$rowScene', $rowScene );
            //$imgUrl = "{$_SERVER['DOCUMENT_ROOT']}/userfiles/".$rowScene['thumbnail_varchar']; //syspic/scene/29243d7c3ab32f20b7185d68a98bba73.png
            $imgUrl = "{$_SERVER['DOCUMENT_ROOT']}/userfiles/abc.jpg";
            $picUrl = $jssdk->addMaterial($imgUrl);
            $jssdk->printMe('$picUrl', $picUrl );
            $pageDesc = $rowScene['desc_varchar']?$rowScene['desc_varchar']:'na';
            $pageId = $jssdk->addPage($rowScene['scenename_varchar'],$pageDesc,'http://www.yifeiyang.net/v-'.$rowScene['scenecode_varchar'], $rowScene['scenecode_varchar'], $picUrl);
        }
        return $pageId;
    }

    public function bindpage($deviceId, $pageId, $sceneId) {
        $jssdk = $this->sdk;
        $jssdk->bindpage($deviceId,$pageId);

        $sql = "update cj_device_scene set page_id=$pageId WHERE device_id=$deviceId And sceneid_bigint=$sceneId";
        $jssdk->printMe('cj_device_scene222', $sql );
        mysql_query($sql);
    }

    public function syncDeviceScene() {
        $jssdk = $this->sdk;
        $sql = "select device_id, sceneid_bigint from cj_device_scene WHERE page_id=0";
        $jssdk->printMe('cj_device_scene', $sql );
        $query = mysql_query($sql);
        while ($row = mysql_fetch_array($query)) {
            //var_dump( $row['device_id'] );
            $deviceId = $row['device_id'];
            $sceneId = $row['sceneid_bigint'];

            $pageId = $this->getPageIdBySceneId($sceneId);

            if(!$pageId){
                $pageId = $this->addPage($sceneId);
            }
            $jssdk->printMe('$pageId', $pageId );
            if($pageId){
                $this->bindpage($deviceId, $pageId,$sceneId);
            }
        }
    }

    public function addStatByDevice($deviceId) {
        // get the statbydevice info
        $jssdk = $this->sdk;

        $statInfo = $jssdk->statDevice($deviceId);
        $statlength=count($statInfo);
        for($y=0;$y<$statlength;$y++) {
            $stat = $statInfo[$y];
            $ftime = date("Y-m-d h:i:s", $stat->ftime);

            $sql = 'select ftime from cj_statisticsweixin WHERE ftype=0 AND id='.$deviceId.'AND ftime="'.$ftime.'"';
            $jssdk->printMe("addStatByDevice() sql1: ",$sql);
            $query = mysql_query($sql);
            if(mysql_num_rows($query)==0){
                $sql = "INSERT INTO cj_statisticsweixin (id, ftime, ftype, click_pv, click_uv,shake_pv,shake_uv)
                  VALUES($deviceId,'$ftime',0,$stat->click_pv,$stat->click_uv,$stat->shake_pv,$stat->shake_uv)";
                $jssdk->printMe("addStatByDevice() sql2: ",$sql);
                $query = mysql_query($sql);
                if (!$query)    die('Error: ' . mysql_error());
                $jssdk->printMe("msg","1 record added to statistics_weixin");
            }
        }
    }

    public function addStatByPage($pageId) {
        // get the statbydevice info
        $jssdk = $this->sdk;

        $statInfo =  $jssdk->statPage($pageId);
        $statlength=count($statInfo);
        for($y=0;$y<$statlength;$y++) {
            $stat = $statInfo[$y];
            $ftime = date("Y-m-d h:i:s", $stat->ftime);

            $sql = 'select ftime from cj_statisticsweixin WHERE ftype=1 AND id='.$pageId.' AND ftime="'.$ftime.'"';
            $jssdk->printMe("addStatByDevice() sql1: ",$sql);
            $query = mysql_query($sql);
            if(mysql_num_rows($query)==0){
                $sql = "INSERT INTO cj_statisticsweixin (id, ftime, ftype, click_pv, click_uv,shake_pv,shake_uv)
                  VALUES($pageId,'$ftime',1,$stat->click_pv,$stat->click_uv,$stat->shake_pv,$stat->shake_uv)";
                $jssdk->printMe("addStatByPage() stat sql2",$sql);
                $query = mysql_query($sql);
                if (!$query)    die('Error: ' . mysql_error());
                $jssdk->printMe("msg","1 page stat record added to statistics_weixin");
            }
        }
    }

    public function syncStatByDevice() {
        $jssdk = $this->sdk;
        $sql = 'select DISTINCT device_id from cj_device_scene WHERE page_id<>0';
        $jssdk->printMe('syncStat() sql device',$sql);
        //$sql = 'select device_id from cj_device';
        $query = mysql_query($sql);
        while ($row = mysql_fetch_array($query)) {
            $this->addStatByDevice($row['device_id']);
        }
    }

    public function syncStatByPage() {
        $jssdk = $this->sdk;
        $sql = 'select DISTINCT page_id from cj_device_scene WHERE page_id<>0';
        $jssdk->printMe('syncStatByPage() sql device',$sql);
        $query = mysql_query($sql);
        while ($row = mysql_fetch_array($query)) {
            $this->addStatByPage($row['page_id']);
        }
    }

    public function listInfo() {
        $jssdk = $this->sdk;
        $lists = $jssdk->searchPage();
        foreach($lists->pages as $list){
            //$this->addStatByDevice($device->device_id);
            $jssdk->statPage($list->page_id);
        }

        $devices = $jssdk->searchDevice();
        foreach($devices->devices as $list){
            $jssdk->statDevice($list->device_id);
        }

        $pois = $jssdk->getPois();
        $jssdk->printMe('listInfo() search Poi', $pois );
    }

    public function syncDevice() {
        $jssdk = $this->sdk;
        $begin=0;
        $count=50;
        while($count==50){
            $rtnDevices = $jssdk->searchDevice($begin,$count);
            $devices = $rtnDevices->devices;
            foreach($devices as $list){
                $deviceId = $list->device_id;
                $jssdk->printMe('syncDevice() device: ', $list );
                $sql = 'select device_id from cj_device WHERE device_id='.$deviceId;
                $jssdk->printMe('syncDevice() select sql1: ', $sql );
                $query = mysql_query($sql);
                if($row = mysql_fetch_array($query)){
                    if( intval($row['status']) != intval($list->status) ){
                        $sql = 'update cj_device set status='.$list->status.' WHERE device_id='.$deviceId;
                        $jssdk->printMe('syncDevice() update sql2: ', $sql );
                        mysql_query($sql);
                    }
                }else{
                    $sql = 'INSERT INTO cj_device (device_id, uuid, major, minor, userid_int) '.
                        'VALUES('.$deviceId.',"'.$list->uuid.'",'.$list->major.','.$list->minor.',1)';
                    $jssdk->printMe('syncDevice() insert sql: ', $sql );
                    mysql_query($sql);
                }
                //stat device
                $this->addStatByDevice($deviceId);

                //stat pages
                $pageIds = $list->page_ids;
                $jssdk->printMe('syncDevice() insert pageIds: ', $pageIds );
                if($pageIds){
                    $arrPageId = explode(',',$pageIds);
                    foreach($arrPageId as $pageId){
                        $this->addStatByPage(intval($pageId));
                    }
                }
            }
            $count = count($devices);
            $begin += 50;
        }
    }

    public function syncStatFromWX() {
        $jssdk = $this->sdk;
        $allPages = $jssdk->searchPage();
        $jssdk->printMe('syncStatFromWX() searchPage', $allPages );
        foreach($allPages as $page){
            $this->addStatByPage($page->page_id);
        }

        $devices = $jssdk->searchDevice();
        $jssdk->printMe('syncStatFromWX() searchDevice', $devices );
        foreach($devices as $device){
            $this->addStatByDevice($device->device_id);
        }

    }

    public function syncStat() {
        $this->syncStatByDevice();
        $this->syncStatByPage();
    }

    public function sync() {
        //$this->listInfo();
        $this->syncDevice();
        //$this->syncDeviceScene();
        //$this->syncStat();
        //$this->syncStatFromWX();
    }
}


/*
echo '<br>searchPage<br>';
$allPages = $jssdk->searchPage();
//$jssdk->printMe('searchPage', $allPages );
foreach($allPages as $thePage){
    //$jssdk->printMe('$thePage', $thePage );
    //$jssdk->printMe('$thePage', $thePage->page_url );
    $pageUrl = $thePage->page_url; //http://www.yifeiyang.net/v-U60606PF4K5D
    $pagePos = strpos($pageUrl,'v-');
    if($pagePos>0){
        $pageCode = substr($pageUrl,$pagePos+2); //U60606PF4K5D

        $sql = "select scenecode_varchar from cj_scene WHERE scenecode_varchar='$pageCode'";
        $jssdk->printMe('$pageSql', $sql );
        $query = mysql_query($sql);
        while ($row = mysql_fetch_array($query)) {
            var_dump( $row['device_id'] );

        }
    }

    /*
    echo '<br>applyId<br>';
    $devices = $jssdk->applyId(2,'test','test',null);
    var_dump( $devices );
    foreach($devices as $device){
        $sql = "INSERT INTO cj_device (device_id, uuid, major, minor) VALUES($device[device_id],'$device[uuid]',$device[major],$device[minor])";
        var_dump( $sql );
        mysql_query($sql);
    }


    echo '<br>searchDevice<br>';
    $devices = $jssdk->searchDevice();
    //var_dump( $devices );

    $arrlength=count($devices);
    echo '<br><br>';
    $jssdk->printMe('devicelength',$arrlength);
    echo '<br><br>';
    for($x=0;$x<$arrlength;$x++) {
        $device = $devices[$x];
        $deviceId   = $device->device_id;
        $pageIds    = $device->page_ids;
        //var_dump($deviceId);
        //var_dump($pageIds);
        $sql = 'select device_id from cj_device WHERE device_id='.$deviceId;
        $jssdk->printMe('sql device',$sql);
        //$sql = 'select device_id from cj_device';
        $query = mysql_query($sql);
        /*
        while ($row = mysql_fetch_array($query)) {
            var_dump( $row['device_id'] );
        }

        //var_dump( $query );
        if(mysql_num_rows($query)==0){
            //var_dump( $deviceId );
            $sql = "INSERT INTO cj_device (device_id, uuid, major, minor,poi_id,status,comment )
                  VALUES($device->device_id,'$device->uuid',$device->major,$device->minor,$device->poi_id,$device->status,'$device->comment')";
            //var_dump($sql);
            $query = mysql_query($sql);
            if (!$query)    die('Error: ' . mysql_error());
            echo "1 record added to device";
        }

        if( !empty($pageIds) ){
            echo '<br><br>';
            var_dump($pageIds);
            $pages = explode(',', $pageIds);
            foreach($pages as $pageId){

            }
        }


    }

    echo '<br>addMaterial<br>';
    //$picUrl = $jssdk->addMaterial("{$_SERVER['DOCUMENT_ROOT']}/userfiles/abc.jpg");
    //echo $picUrl; // http://shp.qpic.cn/wx_shake_bus/0/14345424172e8cb9ac1091da1812f9a17ac392711c/120

    echo '<br>addPage<br>';
    //var_dump( $jssdk->addPage('test','test','http://www.yifeiyang.net/v-U6061737467V', 'test', $picUrl) );

    echo '<br>addPage<br>';

    //var_dump( $jssdk->addPage('test','test','http://www.yifeiyang.net/v-U6061737467V', 'test', $picUrl) );


    /*
    $sql = "select * from quiz order by id asc";
    $query = mysql_query($sql);
    while ($row = mysql_fetch_array($query)) {
        $answers = explode('###', $row['answer']); //explode函数的作用是“把字符串分割为数组”
        $arr[] = array(
            'question' => $row['id'] . '、' . $row['question'],
            'answers' => $answers
        );
    }
    $json = json_encode($arr);

    $sql="INSERT INTO Persons (FirstName, LastName, Age)
    VALUES
    ('$_POST[firstname]','$_POST[lastname]','$_POST[age]')";

    if (!mysql_query($sql,$con))
      {
      die('Error: ' . mysql_error());
      }
    echo "1 record added";

    mysql_query("UPDATE Persons SET Age = '36'
    WHERE FirstName = 'Peter' AND LastName = 'Griffin'");
    public function statDevice($deviceId) {

    */
?>