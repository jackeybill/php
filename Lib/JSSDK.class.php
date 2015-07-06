<?php
class JSSDK {
    const WEIXIN_URL_HTTPS = 'https://api.weixin.qq.com/';
    const SHARKE_AROUND = 'shakearound';
    private $appId;
    private $appSecret;

    public function __construct($appId, $appSecret) {
        $this->appId = $appId;
        $this->appSecret = $appSecret;
    }

    // var_dump
    public function printMe($title,$data) {
        error_log(print_r($title,true));
        error_log(print_r($data,true));
    }

    public function getSignPackage() {
        $jsapiTicket = $this->getJsApiTicket();

        // 注意 URL 一定要动态获取，不能 hardcode.
        $protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off' || $_SERVER['SERVER_PORT'] == 443) ? "https://" : "http://";
        $url = "$protocol$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";

        $timestamp = time();
        $nonceStr = $this->createNonceStr();

        // 这里参数的顺序要按照 key 值 ASCII 码升序排序
        $string = "jsapi_ticket=$jsapiTicket&noncestr=$nonceStr&timestamp=$timestamp&url=$url";

        $signature = sha1($string);

        $signPackage = array(
            "appId"     => $this->appId,
            "nonceStr"  => $nonceStr,
            "timestamp" => $timestamp,
            "url"       => $url,
            "signature" => $signature,
            "rawString" => $string
        );
        return $signPackage;
    }

    /*
     * 上传图片素材
     *
     * 上传在摇一摇页面展示的图片素材，素材保存在微信侧服务器上。
     * 格式限定为：jpg,jpeg,png,gif，图片大小建议120px*120 px，限制不超过200 px *200 px，图片需为正方形。
     *  /shakearound/material/add?access_token=ACCESS_TOKEN
     * $res->data->pic_url;
     */
    public function addMaterial($real_path) {
        $arr= array("media"=>"@{$real_path}");
        return $this->callWeiXin($arr, '/material/add');
    }

    /*
     * 申请设备ID
     *
     * 申请配置设备所需的UUID、Major、Minor。申请成功后返回批次ID，可用返回的批次ID用“查询设备列表”接口拉取本次申请的设备ID。
     * 单次新增设备超过500个，需走人工审核流程，大概需要三个工作日；单次新增设备不超过500个的，当日可返回申请的设备ID。
     * 一个公众账号最多可申请99999个设备ID，如需申请的设备ID数超过最大限额，
     * 请邮件至zhoubian@tencent.com，邮件格式如下：
     *      标题：申请提升设备ID额度
     *      内容：1、公众账号名称及appid（wx开头的字符串，在mp平台可查看） 2、用途 3、预估需要多少设备ID
     */
    public function applyId($quantity, $reason,$comment, $poiId) {
        $arr = array (
            "quantity"         => $quantity, // 申请的设备ID的数量，单次新增设备超过500个，需走人工审核流程
            "apply_reason"  => $reason,//申请理由，不超过100个字
            "comment"       => $comment,//备注，不超过15个汉字或30个英文字母
            "poi_id"      => $poiId // 设备关联的门店ID，关联门店后，在门店1KM的范围内有优先摇出信息的机会。
        );
        return $this->callWeiXin($arr, "/device/applyid");
    }

    /*
     * 配置设备与页面的关联关系
     *
     * 配置设备与页面的关联关系。支持建立或解除关联关系，也支持新增页面或覆盖页面等操作。
     * 配置完成后，在此设备的信号范围内，即可摇出关联的页面信息。在申请设备ID后，可使用接口直接配置页面（无需激活），
     * 然后摇一摇即可摇出接口所配置的页面信息。若设备配置多个页面，则随机出现页面信息。一个设备最多可配置30个关联页面。
     */
    public function bindpage($deviceId, $pageId) {
        $arr = array (
            "device_identifier"	=>	array (
                "device_id" => $deviceId
            ),
            "page_ids"=> array($pageId),
            "bind"=> 1, //关联操作标志位， 0为解除关联关系，1为建立关联关系
            "append"=> 1, //新增操作标志位， 0为覆盖，1为新增
        );
        return $this->callWeiXin($arr, "/device/bindpage");
    }

    /*
     * 新增页面
     *
     * 新增摇一摇出来的页面信息，包括在摇一摇页面出现的主标题、副标题、图片和点击进去的超链接。
     * 其中，图片必须为用素材管理接口上传至微信侧服务器后返回的链接。
     *
        参数	      说明
        $res->data->page_id;
     */
    public function addPage($title, $description, $pageUrl, $comment, $iconUrl) {
        $arr = array (
            "title"         => $title, // 在摇一摇页面展示的主标题，不超过6个字
            "description"  => $description,//在摇一摇页面展示的副标题，不超过7个字
            "page_url"      => $pageUrl,//
            "comment"       => $comment,//页面的备注信息，不超过15个字
            "icon_url"      => $iconUrl // 在摇一摇页面展示的图片。图片需先上传至微信侧服务器，用“素材管理-上传图片素材”接口上传图片，返回的图片URL再配置在此处
        );
        return $this->callWeiXin($arr, "/page/add");
    }

    function callWeiXin($arr, $url) {
        $data = json_encode($arr);
        $this->printMe('JSSDK.callWeiXin() data=',$data);
        $accessToken = $this->getAccessToken();
        if(!$accessToken) $accessToken = $this->getAccessToken();

        $url = $this::WEIXIN_URL_HTTPS.$this::SHARKE_AROUND.$url.'?access_token='.$accessToken;
        $this->printMe('JSSDK.callWeiXin() url=',$url);
        $res = json_decode($this->httpPost($url, $data));
        $this->printMe('JSSDK.callWeiXin() res=',$res);
        if($res->errcode){
            return $res->errmsg;
        }else{
            return $res->data;
        }
    }

    /*
     * 编辑页面信息
     *
     * 编辑摇一摇出来的页面信息，包括在摇一摇页面出现的主标题、副标题、图片和点击进去的超链接。
     *
        参数	      说明 /update?access_token=ACCESS_TOKEN

     */
    public function updatePage($pageId, $title, $description, $pageUrl, $comment, $iconUrl) {
        $arr = array (
            "page_id"       => $pageId,
            "title"         => $title, // 在摇一摇页面展示的主标题，不超过6个字
            "description"  => $description,//在摇一摇页面展示的副标题，不超过7个字
            "page_url"      => $pageUrl,//
            "comment"       => $comment,//页面的备注信息，不超过15个字
            "icon_url"      => $iconUrl // 在摇一摇页面展示的图片。图片需先上传至微信侧服务器，用“素材管理-上传图片素材”接口上传图片，返回的图片URL再配置在此处
        );
        return $this->callWeiXin($arr, "/page/update");
    }

    /*
     * 删除页面
     *
     * 删除已有的页面，包括在摇一摇页面出现的主标题、副标题、图片和点击进去的超链接。只有页面与设备没有关联关系时，才可被删除。
     *
        参数	      说明

     */
    public function deletePage($pageId) {
        $arr = array (
            "page_ids"   => array($pageId)
        );
        return $this->callWeiXin($arr, "/page/delete");
    }

    /*
     * 查询页面列表
     *
     * 查询已有的页面，包括在摇一摇页面出现的主标题、副标题、图片和点击进去的超链接。
     * 提供两种查询方式，可指定页面ID查询，也可批量拉取页面列表
     *
        参数	      说明
        beacon_info	 设备信息，包括UUID、major、minor，以及距离
        UUID、major、minor	 UUID、major、minor
        distance	 Beacon信号与手机的距离，单位为米
        page_id	    摇周边页面唯一ID
        openid	    商户AppID下用户的唯一标识
        poi_id	    门店ID，有的话则返回，反之不会在JSON格式内
     */
    public function searchPage() {
        $arr = array (
            "begin"   => 0,
            "count"=> 50
        );
        return $this->callWeiXin($arr, "/page/search");
    }

    /*
     * 获取摇周边的设备及用户信息
     *
     * 获取设备信息，包括UUID、major、minor，以及距离、openID等信息
     *
        参数	      说明
        beacon_info	 设备信息，包括UUID、major、minor，以及距离
        UUID、major、minor	 UUID、major、minor
        distance	 Beacon信号与手机的距离，单位为米
        page_id	    摇周边页面唯一ID
        openid	    商户AppID下用户的唯一标识
        poi_id	    门店ID，有的话则返回，反之不会在JSON格式内
     */
    public function getshakeinfo($ticket) {
        $arr = array (
            "ticket"   => $ticket, //摇周边业务的ticket，可在摇到的URL中得到，ticket生效时间为30分钟，每一次摇都会重新生成新的ticket
            "need_poi"=> 1  //是否需要返回门店poi_id，传1则返回，否则不返回；
        );
        return $this->callWeiXin($arr, "/user/getshakeinfo");
    }

    /*
     * 以页面为维度的数据统计接口
     *
     * 查询单个页面通过摇周边摇出来的人数、次数，点击摇周边页面的人数、次数；查询的最长时间跨度为30天。
     */
    public function statPage($pageId) {
        $arr = array (
            "page_id"   => $pageId,
            "begin_date"=> time() - (3 * 24 * 60 * 60),
            "end_date"  => time() - (1 * 24 * 60 * 60)
        );
        return $this->callWeiXin($arr, "/statistics/page");
    }

    /*
     * 以设备为维度的数据统计接口
     *
     * 查询单个设备进行摇周边操作的人数、次数，点击摇周边消息的人数、次数；查询的最长时间跨度为30天。
     */
    public function statDevice($deviceId) {
        $arr = array (
            "device_identifier"	=>	array (
                "device_id" => $deviceId,
                "uuid"	=>	"FDA50693-A4E2-4FB1-AFCF-C6EB07647825",
                "major"=> 1002,
                "minor"=>1223
            ),
            "begin_date"=> time() - (3 * 24 * 60 * 60),
            "end_date"=> time() - (1 * 24 * 60 * 60)
        );
        return $this->callWeiXin($arr, "/statistics/device");
    }

    /*
     * 配置设备与门店的关联关系
     *
     * 修改设备关联的门店ID、设备的备注信息。可用设备ID或完整的UUID、Major、Minor指定设备，二者选其一。
     */
    public function bindlocation($poiId, $deviceId) {
        $arr = array (
            "device_identifier"	=>	array (
                "device_id" => $deviceId,
                "uuid"	=>	"FDA50693-A4E2-4FB1-AFCF-C6EB07647825",
                "major"=> 1002,
                "minor"=>1223
            ),
            "poi_id"=> $poiId
        );
        return $this->callWeiXin($arr, "/device/bindlocation");
    }

    /*
     * 查询门店列表
     *
     * 商户可以通过该接口，批量查询自己名下的门店list，并获取已审核通过的poi_id（所有状态均会返回poi_id，但该poi_id 不一定为最终id）、
     * 商户自身sid 用于对应、商户名、分店名、地址字段。
     */
    public function getPois() {
        $arr = array (
            "begin"	=>	0,
            "limit"	=>	50
        );
        $data = json_encode($arr);
        $accessToken = $this->getAccessToken();
        $url = "https://api.weixin.qq.com/cgi-bin/poi/getpoilist?access_token=$accessToken";

        error_log(print_r($url, true));

        $res = json_decode($this->httpPost($url, $data));
        error_log(print_r($res, true));
        return $res->business_list;
    }

    public function searchDevice($begin=0, $count=50) {
        $arr = array (
            "begin"	=>	$begin,
            "count"	=>	$count
        );
        return $this->callWeiXin($arr, "/device/search");
    }

    private function createNonceStr($length = 16) {
        $chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        $str = "";
        for ($i = 0; $i < $length; $i++) {
            $str .= substr($chars, mt_rand(0, strlen($chars) - 1), 1);
        }
        return $str;
    }

    private function getJsApiTicket() {
        // jsapi_ticket 应该全局存储与更新，以下代码以写入到文件中做示例
        $data = json_decode(file_get_contents("jsapi_ticket.json"));
        if ($data->expire_time < time()) {
            $accessToken = $this->getAccessToken();
            // 如果是企业号用以下 URL 获取 ticket
            // $url = "https://qyapi.weixin.qq.com/cgi-bin/get_jsapi_ticket?access_token=$accessToken";
            $url = "https://api.weixin.qq.com/cgi-bin/ticket/getticket?type=jsapi&access_token=$accessToken";
            $res = json_decode($this->httpGet($url));
            $ticket = $res->ticket;
            if ($ticket) {
                $data->expire_time = time() + 7000;
                $data->jsapi_ticket = $ticket;
                $fp = fopen("jsapi_ticket.json", "w");
                fwrite($fp, json_encode($data));
                fclose($fp);
            }
        } else {
            $ticket = $data->jsapi_ticket;
        }

        return $ticket;
    }

    private function getAccessToken() {
        // access_token 应该全局存储与更新，以下代码以写入到文件中做示例
        $data = json_decode(file_get_contents("access_token.json"));
        $this->printMe('JSSDK.getAccessToken() data=',$data);
        if ($data || $data->expire_time < time()) {
            // 如果是企业号用以下URL获取access_token
            // $url = "https://qyapi.weixin.qq.com/cgi-bin/gettoken?corpid=$this->appId&corpsecret=$this->appSecret";
            $url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=$this->appId&secret=$this->appSecret";
            $res = json_decode($this->httpGet($url));
            $access_token = $res->access_token;
            if ($access_token) {
                $data->expire_time = time() + 7000;
                $data->access_token = $access_token;
                $fp = fopen("access_token.json", "w");
                fwrite($fp, json_encode($data));
                fclose($fp);
            }
        } else {
            $access_token = $data->access_token;
        }
        return $access_token;
    }

    private function httpGet($url) {
        $curl = curl_init();
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($curl, CURLOPT_TIMEOUT, 500);
        curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, false);
        curl_setopt($curl, CURLOPT_URL, $url);

        $res = curl_exec($curl);
        curl_close($curl);

        return $res;
    }

    private function httpPost($url, $data) {
        $curl = curl_init();
        $header = "Accept-Charset: utf-8";
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($curl, CURLOPT_TIMEOUT, 500);
        curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, false);
        curl_setopt($curl, CURLOPT_URL, $url);
        curl_setopt($curl, CURLOPT_CUSTOMREQUEST, "POST");
        curl_setopt($curl, CURLOPT_HTTPHEADER, $header);
        curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
        //curl_setopt($curl, CURLOPT_USERAGENT, ‘Mozilla/5.0 (compatible; MSIE 5.01; Windows NT 5.0)’);
        //curl_setopt($curl, CURLOPT_FOLLOWLOCATION, 1);
        //curl_setopt($curl, CURLOPT_AUTOREFERER, 1);
        //curl_setopt($curl, CURLOPT_POST, 1 );
        //curl_setopt($curl, CURLOPT_REFERER, 'https://mp.weixin.qq.com/' ); ,模拟请求源,for WeiXin upload pic

        $res = curl_exec($curl);
        curl_close($curl);

        return $res;
    }
}
?>
