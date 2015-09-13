<?php
require_once "email.class.php";

/**
 * 获取公司ID
 *
 * return comapnyId
 */
function getCompanyId($token) {
    $companyId = 0;
    $user = session('user');
    if ($user) {
        $companyId = $user['company'];
    }elseif($token){
        $company = D('companyToken')->where(array("token"=>$token))->find();
        if($company){
            $companyId = $company['company'];
        }
    }
    return $companyId;
}

/**
 * create user VO
 *  use to add create_as.
 *
 * return userVO
 */
function createUser($company, $name, $email, $phone, $wechat, $userType=1,$now,$image){
    return array(
        "company"		=>	$company,
        "name"			=>	$name,
        "email" 		=>	$email,
        "wechat" 		=>	$wechat,
        "phone" 		=>	$phone,
        "user_type" 	=>	$userType,
        "updated_at" 	=>	$now,
        "image" 	    =>	$image
    );
}

/**
 * 根据公司ID获取公司的扩展字段的所有信息
 *
 * @param int $companyId
 * @return array
 */
function getDetailExtendField($companyId) {

    $where = array(
        'company' => $companyId,
        'status' => \Home\Model\ChecklistExtendModel::STATUS_NORMAL,
    );
    $fields = M('ChecklistExtend')->where($where)->select();

    return $fields;
}

/**
 * 根据公司ID获取公司的扩展字段
 * 
 * @param int $companyId
 * @param string $field getFeild方法的第一个参数，需要返回的表字段名称，以逗号分隔
 * @param mix $option getField方法的第二个参数
 * @return array
 */
function getExtendField($companyId, $field, $option = null) {

    $where = array(
        'company' => $companyId,
        'status' => \Home\Model\ChecklistExtendModel::STATUS_NORMAL,
    );
    if (is_null($option)) {
        $fields = M('ChecklistExtend')->where($where)->getField($field);
    } else {
        $fields = M('ChecklistExtend')->where($where)->getField($field, $option);
    }

    return $fields;
}

/**
 * 获取当前时间
 * 
 * @param $format 时间格式
 * @return date
 */
function getDateFormat($format = 'Y-m-d H:i:s') {

    return date($format);
}

/**
 * 下载csv文件
 * 
 * @param $filename 下载文件名
 * @param $content  下载内容
 * @return null
 */
function download($filename, $content) {

    @set_time_limit(30);
    @ini_set('memory_limit', '512M');

    // 编码转换
    // $filename   = iconv('utf-8', 'gbk', $filename);
    // $content = iconv('utf-8', 'gbk', $content);

    // 输出到浏览器
    $user_agent = trim($_SERVER['HTTP_USER_AGENT']);
    if(strpos($user_agent,'MSIE')) {
        $isIE = true;
    } else if(strpos($user_agent,'Internet Explorer')) {
        $isIE = true;
    } else{
        $isIE = false;
    }

    ob_start();
    header("Content-type:vnd.ms-excel");
    header("Content-Disposition:attachment;filename=" . $filename);   
    header('Content-Transfer-Encoding: binary');
    if ($isIE) {
        header('Cache-Control: must-revalidate, post-check=0, pre-check=0');
        header('Pragma: public');
    } else {
        header('Pragma: no-cache');
    }

    echo $content;
    ob_end_flush();
    exit;
}

/**
 * sendmail in html templete
 *
 * @param $from 发件人
 * @param $to  发给...
 * @param $subject  邮件标题
 * @param $message  邮件正文
 * @return null
 */
function sendMail($from, $to, $subject, $message) {
//******************** 配置信息 ********************************
    $smtpserver = "smtp.visitoreasy.com";//SMTP服务器
    $smtpserverport =25;//SMTP服务器端口
    $smtpusermail = "admin@visitoreasy.com";//SMTP服务器的用户邮箱
    //$smtpemailto = $_POST['toemail'];//发送给谁
    $smtpuser = "admin@visitoreasy.com";//SMTP服务器的用户帐号
    $smtppass = "John2015@sh";//SMTP服务器的用户密码
    //$mailtitle = $_POST['title'];//邮件主题
    //$mailcontent = "<h1>".$_POST['content']."</h1>";//邮件内容
    $mailtype = "HTML";//邮件格式（HTML/TXT）,TXT为文本邮件
    //************************ 配置信息 ****************************
    $smtp = new smtp($smtpserver,$smtpserverport,true,$smtpuser,$smtppass);//这里面的一个true是表示使用身份验证,否则不使用身份验证.
    $smtp->debug = false;//是否显示发送的调试信息
    $state = $smtp->sendmail($to, $smtpusermail, $subject, $message, $mailtype);
    return $state;
    /*

    echo "<div style='width:300px; margin:36px auto;'>";
    if($state==""){
        echo "对不起，邮件发送失败！请检查邮箱填写是否有误。";
        echo "<a href='index.html'>点此返回</a>";
        exit();
    }
    echo "恭喜！邮件发送成功！！";
    echo "<a href='index.html'>点此返回</a>";
    echo "</div>";
    */
}

function sendMail1($from, $to, $subject, $message) {
    $headers = "From: $from<$from>\r\n";
    $headers .= "Return-Path: <$from>\r\n";     //防止被当做垃圾邮件，但在sina邮箱里不起作用
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html; charset = \"UTF-8\";\r\n";
    $headers .= "Content-Transfer-Encoding: 8bit\r\n";
    /*
    $message = '
			<html>
			<head>
			   <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
			   <title>eVisitor::Notification</title>
			</head>
			<body>
			   <p>你的访客'.$VName.'已经到达公司前台<br>'.$CheckinTime.'
			   <p>'.$HostID.'，你好！</p>
			   <table>
				<tr>
					<td><img src="http://www.visitoreasy.com/Public/images/backend/visitor/25.jpg"></td>
					<td>你的访客'.$VName.'已经到达公司前台，完成签到，请前去接洽. 联系方式'.$VPhoneNum.'</td>
				</tr>
			   </table>
				<p> 谢谢！ <p>
			</body>
			</html>
			';
    $to = "shhujian@163.com";
    //$from = "jackey@visitoreasy.com";
    $subject = $VName."来访，请去前台接待";
    */
    ini_set('sendmail_from', $from);     //解决mail的一个bug
    $return = mail($to,$subject,$message,$headers);
    trace($return);
    return $return;
}

/**
 * sendmail in html templete
 *
 * @param $from 发件人
 * @param $to  发给...
 * @param $subject  邮件标题
 * @param $message  邮件正文
 * @return null
 */
function getOrCreateUserId($name, $phone, $email, $company, $image, $usertype=0){
    $now = date('y-m-d H:i:s',time());

    $userDB = D('user');
    $companyDB = D('company');
    $sql = 'phone="'.$phone.'" or email="'.$email.'"';
    $user = $userDB->where($sql)->find();
    if($user){
        $visitor = $user['id'];
    }else{
        // create new user
        $sql = 'name="'.$company.'"';
        $companyInfo = $companyDB->where($sql)->find();
        if($companyInfo){
            $newCompanyId = $companyInfo['id'];
        }else{
            // create new comapny
            $companyInfo['name']=$company;
            $companyInfo['created_at']=$now;
            $companyInfo['updated_at']=$now;
            $newCompanyId = $companyDB->add($companyInfo);
            trace($newCompanyId);
        }
        $userInfo=createUser($newCompanyId, $name,$email, $phone, null, $usertype, $now, $image);
        $userInfo['created_at']=$now;
        $visitor = $userDB->add($userInfo);
        trace($user);
    }
    return $visitor;
}

function echoJsonBack($ret){
    header('Content-type: application/json;charset=UTF-8');
    echo $ret;
}

function getBaseErrJson($errcode=9,$errmsg='no record found'){
    return array("errcode"=>$errcode,"errmsg"=>$errmsg);
}

function getBaseSucErrJson($errcode=0,$errmsg='success'){
    return array("errcode"=>$errcode,"errmsg"=>$errmsg);
}

/*
 * 访问地址：http://wt.3tong.net/json/sms/Submit
提交方式：必须POST
名称     Submit
功能     发送一条或者多条内容相同的短信
输入说明     参数值说明：
以下json内容为提交请求数据格式：
{"account":"8528",
"password":"e717ebfd5271ea4a98bd38653c01113d",
"msgid":"2c92825934837c4d0134837dcba00150",
"phones":"15711666132",
"content":"您好，您的手机验证码为：430237。",
"sign":"【8528】",
"subcode":"8528",
"sendtime":"201405051230"}
字段说明
account：用户账号；
password：账号密码，需采用MD5加密(32位小写)；
msgid：该批短信编号(32位UUID)，需保证唯一，选填；
phones：接收手机号码，多个手机号码用英文逗号分隔，最多500个，必填；
content：短信内容，最多350个汉字，必填；
sign：短信签名，该签名需要提前报备，生效后方可使用，不可修改，必填
，示例如：【大汉三通】；
subcode：短信签名对应子码(大汉三通提供)+自定义扩展子码(选填)，必须是数字，选填，未填使用签名对应子码；
sendtime：定时发送时间，格式yyyyMMddHHmm，为空或早于当前时间则立即发送；
输出说明     响应数据格式:
{"msgid":"f02adaaa99c54ea58d626aac2f4ddfa8",
"result":"0",
"desc":"提交成功",
"failPhones":"12935353535,110,130123123"
}
字段说明
msgid：该批短信编号；
result：该批短信提交结果；说明请参照：6.1.提交响应错误码；
desc:状态描述；
failPhones:如果提交的号码中含有黑名单或错误（格式）号码将在此显示。
胡总，账号目前已经开好，具体账号信息如下：
账号：dh24751
密码：b!BWt13j 99a4501ad3ac89fb7f31c4ce7467e6f0
签名：【易访客】
绑定ip:121.40.59.219
接口方式：http接入方式
随附账号有100条测试短信，目前已
 * */
function sendSMS($phone, $content) {
    $data = array(
        'account'   => 'dh24751',
        'password'   => '99a4501ad3ac89fb7f31c4ce7467e6f0',
        //'msgid'   => '2c92825934837c4d0134837dcba00150',
        'phones'   => $phone,
        'content'   => $content,
        //'subcode'   => '8528',
        //'sendtime'   => '201405051230',
        'sign'   => '【易访客】'
    );
    $url = "http://wt.3tong.net/json/sms/Submit";
    return httpPost($url, json_encode($data));
}

function httpPost($url, $data) {
    $curl = curl_init();
    //$header = "Accept-Charset: utf-8";
    $header = array( "Accept-Charset: utf-8" );
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
    if(curl_errno($curl)){
        $res = null;
    }
    curl_close($curl);

    return $res;
}