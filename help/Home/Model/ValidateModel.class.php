<?php
namespace Home\Model;
use Think\Model;
class ValidateModel extends Model {
    //静态定义:在模型类里面预先定义好该模型的自动验证规则，我们称为静态定义。
    Protected $autoCheckFields = false; //虚拟模型是指虽然是模型类，但并不会真正的操作数据库的模型

    protected $_auto = array (
        array('status','1'), // 新增的时候把status字段设置为1
        array('password','md5',3,'function') , // 对password字段在新增和编辑的时候使md5函数处理
        array('name','getName',3,'callback'), // 对name字段在新增和编辑的时候回调getName方法
        array('update_time','time',2,'function'), // 对update_time字段在更新的时候写入当前时间戳
        array('password','',2,'ignore'), // 表示password字段编辑的时候留空则忽略
    );

    protected $_validate = array(
        array('verify','require','验证码必须！'), //默认情况下用正则进行验证
        array('name','','帐号名称已经存在！',0,'unique',1), // 在新增的时候验证name字段是否唯一
        array('value',array(1,2,3),'值的范围不正确！',2,'in'), // 当值不为空的候判断是否在一个范围内
        array('repassword','password','确认密码不正确',0,'confirm'), // 验证确认密码是否和密码一致
        array('password','checkPwd','密码格式不正确',0,'function'), // 自定义函数验证密码格式
        array('verify','require','{%VERIFY_CODE_MUST }'), // VERIFY_CODE_MUST 是我们在语言包里面定义的多语言变量。
    );

    protected $insertFields = array('account','password','nickname','email'); //调用add方法写入用户数据的时候，只能写入'account','password','nickname','email' 这几个字段
    protected $updateFields = array('nickname','email'); //编辑的时候只能更新'nickname','email' 两个字段

    public function helpValidate(){
        // 定义好验证规则后，就可以在使用create方法创建数据对象的时候自动调用：
        $User = D("User"); // 实例化User对象
        if(!$User->validate($this->$_validate)->create()){

        }

        if (!$User->create()){
            // 如果创建失败 表示验证没有通过 输出错误提示信息
            exit($User->getError());
        }else{
            // 验证通过 可以进行其他数据操作
            die();
        }
    }
}
?>
