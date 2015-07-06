<?php
namespace Home\Model;
use Think\Model;
class HelpModel extends Model
{
    protected $tableName = 'categories'; //数据表名称是think_categories
    //protected $trueTableName = 'top_categories'; // trueT ableName 需要完整的表名定义
    protected $dbName = 'top';

    public function helpDB() {
        $User = M('User');
        // 动态的切换数据库，支持切换到相同和不同的数据库类型
        //Model->db("数据库编号","数据库配置");
        $User->db(1, "mysql://root:123456@localhost:3306/test")->query("查询SQL");
        $User->db(1)->query("查询SQL");

        // select
        $User->where('status=1')->order('create_time')->limit(10)->select();
        $User->select(array('order' => 'create_time', 'where' => 'status=1', 'limit' => '10'));

        // find and delete a record
        $User->where('id=1')->field('id,name,email')->find();
        $User->where('status=1 and id=1')->delete();

            // 配合预处理机制，确保更加安全
        $User->where("id=%d and username='%s' and xx='%f'", '$id', '$username', '$xx')->select();

            // 多表进行操作
        $User->field('user.name,role.title')
            ->table('think_user user,think_role role')
            ->limit(10)->select();

        $Model = M('Model');
        $Model->field('user.name,role.title')
            ->table(array('think_user' => 'user', 'think_role' => 'role'))
            ->limit(10)->select();

        $Model = M('User');
        $Model->alias('a')->join('__DEPT __ b ON b.user_id= a.id')->select();
        // SELECT * FROM think_user a INNER JOIN think_dept b ON b.user_id= a.id

        // 调用save方法更新数据的时候 会自动判断当前的数据对象里面是否有主键值存在，如果有的话会自动作为更新条件
        $Model = M('User');
        $data['id'] = 8;
        $data['name'] = '流年';
        $data['email'] = 'thinkphp@qq.com';
        $Model->save($data); // 等效 $Model->data($data)->where('id=8')->save();

        $Model->field('id,title,content as name')->select(); // SELECT id,title,content as name FROM table

        $Model->field('id,SUM(score)')->select(); // SELECT id,SUM(score) FROM table

        $Model->field(array('id', 'concat(name,'-',id)' => 'truename', 'LEFT (title,7)' => 'sub_title'))->select(); // SELECT id,concat(name,'-',id) as truename,LEFT (title,7) as sub_title FROM table

        $Model->field('user_id,content', true)->select(); // 获取除了user_id, content之外的所有字段

        $Article = M('Article');
        $Article->page('1,10')->select(); // 查询第一页数据
        $Article->page('2,10')->select(); // 查询第二页数据

            // group方法只有一个参数，并且只能使用字符串
        $this->field('username,max(score)')->group('user_id')->select(); // SELECT username,max(score) FROM think_score GROUP BY user_id

        $Model = M('Artist');
        $Model
        ->join('think_work ON think_artist.id = think_work.artist_id')
        ->join('think_card ON think_artist.card_id = think_card.id')
        ->select();

            // UNION操作用于合并两个或多个 SELECT 语句的结果集。
        $Model->field('name')
        ->table('think_user_0')
        ->union('SELECT name FROM think_user_1')
        ->union('SELECT name FROM think_user_2')
        ->select();

        $Model->distinct(true)->field('name')->select(); // SELECT DIST INCT name FROM think_user

            // Lock方法是用于数据库的锁机制，如果在查询或者执行操作的时候使用：自动在生成的SQL语句最后加上 FOR UPDATE 或者FOR UPDATE NOWAIT （Oracle数据库）。
        $Model->distinct(true)->field('name')->select().lock(true);
            // cache方法用于查询缓存操作 cache 可以用于select 、find 和getField 在缓存有效期之内不会再次进行数据库查询操作
        $Model = M('User');
        $Model->cache(true, 60, 'xcache')->find(); // 对查询结果使用xcache缓存，缓存有效期60秒

            // COMMENT方法 用于在生成的SQL语句中添加注释内容
        $this->comment('查询考试前十名分数')
        ->field('username,score')
        ->limit(10)
        ->order('score desc')
        ->select(); // SELECT username,score FROM think_score ORDER BY score desc LIMIT 10 /* 查询考试前十名分数 */

            // fetchSql用于直接返回SQL而不是执行查询，适用于任何的CURD操作方法
        $result = M('User')->fetchSql(true)->find(1); // 输出result结果为： SELECT * FROM think_user where id = 1

            // token方法可用于临时关闭令牌验证 即可在提交表单的时候临时关闭令牌验证（即使开启了T OKEN_ON参数）
        $Model->token(false)->create();

            //读取数据是指读取数据表中的一行数据（或者关联数据），主要通过find 方法完成;  多行记录 用select
        $User = M("User"); // 实例化User对象
            // 查找status值为1name值为think的用户数据
        $data = $User->where('status=1 AND name="thinkphp"')->find();
        dump($data);

        $this->getField('id,name', 5); // 限制返回5条记录

            // 3.2.3版本开始，setInc和setDec方法支持延迟更新
        $Article->where('id=5')->setInc('view', 1, 60); // 文章阅读数加1，并且延迟60秒更新（写入）

            //exp查询的条件不会被当成字符串，所以后面的查询条件可以使用任何SQL支持的语法，包括使用函数和字段名称。查询表达式不仅可用于查询条件，也可以用于数据更新，例如：
        $User = M("User"); // 实例化User对象
            // 要修改的数据对象属性赋值
        $data['name'] = 'ThinkPHP';
        $data['score'] = array('exp', 'score+1');// 用户的积分加1
        $User->where('id=5')->save($data); // 根据条件保存修改的数据

            //execute用于更新和写入数据的sql操作，如果数据非法或者查询错误则返回false ，否则返回影响的记录数。
        $Model = new \Think\Model(); // 实例化一个model对象 没有对应任何数据表
        $Model->execute("update think_user set name='thinkPHP' wherestatus=1");
        // 如果你当前采用了分布式数据库，并且设置了读写分离的话，execute方法始终是在写服务器执行，因此execute方法对应的都是写操作，而不管你的SQL语句是什么。

        //静态定义:在模型类里面预先定义好该模型的自动验证规则，我们称为静态定义。
    }

    public function helpSelect() {
        $User = M("User");
        $User->where('status=1')->order('create_time')->limit(10)->select();

        $User->select(array('order'=>'create_time','where'=>'status=1','limit'=>'10'));

        $User->where('id=1')->field('id,name,email')->find();
	    $User->where('status=1 and id=1')->delete();

        $User->table('db_name.think_user')->where('status>1')->select();

        // 简化数据表前缀的传入; 自动获取当前模型对应的数据表前缀来生成 think_user 数据表名称
        $User->table('__USER__')->where('status>1')->select();

        // 对多表进行操作
        $User->field('user.name,role.title')
        ->table('think_user user,think_role role')
        ->limit(10)->select();

        // 为了尽量避免和mysql的关键字冲突，可以建议使用数组方式定义
        $User->field('user.name,role.title')
	    ->table(array('think_user'=>'user','think_role'=>'role'))
	    ->limit(10)->select();

        // 分页查询
        $User->limit(10,25)->select(); //从第10行开始的25条数据

        // COMMENT方法
        $User->comment('查询考试前十名分数')
            ->field('username,score')
	        ->limit(10)
	        ->order('score desc')
	        ->select();
        // 最终生成的SQL语句是 SELECT username,score FROM think_score ORDER BY score desc LIMIT 10 /* 查询考试前十名分数 */



    }

    public function helpDBOperation() {
        $User = M('User');

        $User->getDbFields(); //获取当前数据字段
        $User->findAll(); //查找所有记录
        $User->findAll('1,3,8'); //查询主键为1,3,8的记录集
        $User->count(); // 获取记录数
        $User->max('score'); // 获取用户的最大积分
        $User->min('score','score>0'); // 获取积分大于 0 的用户的最小积分
        $User->avg('字段名'); // 获取所有记录的字段值的平均值
        $User->sum('字段名'); // 统计字段值
        $User->getN(2,'score>80','score desc'); // 返回符合条件的第 2 条记录
        $User->getN(2,'score>80','score desc'); //还可以获取最后第二条记录
        $User->first('score>80','score desc'); //如果要查询第一条记录，还可以使用
        $User->last('score>80','score desc'); // 获取最后一条记录
        $User->top(5,'','score desc'); // 获取积分最高的前 5 条记录
        $User->getBy('name','liu21st'); //跟据字段的字段值来查询记录
        $Model = new Model(); // 实例化一个 model 对象 没有对应任何数据表
        $Model->query("select * from think_user where status=1");
        $objrs = $Model->query("select * from think_user where status=1"); //自定义查询
        $Model->execute("update think_user set name='thinkPHP' where status=1"); //用于更新和写入数据的 sql 操作，返回影响的记录数
        $User->startTrans(); // 启动事务
        $User->commit(); // 提交事务
        $User->rollback(); // 事务回滚
    }

    public function getDeviceByUserAndStatus($userid,$status) {
        $m_device = M('device');
        $sql['status']=array('GT',0);//$status;
        $sql['userid_int']=$userid;
        $_devices = $m_device->where($sql)->select();

        $firstDevice='';
        $jsonstrtemp = '[';
        foreach($_devices as $vo) {
            if($firstDevice == '') $firstDevice = $vo["device_id"];
            if( $jsonstrtemp != '[') $jsonstrtemp = $jsonstrtemp .',';
            $jsonstrtemp = $jsonstrtemp . '{"id": ' . $vo["device_id"] . ',"name":"'. $vo["device_name"] .'"}';
        }
        $jsonstrtemp = $jsonstrtemp . ']';

        //json_encode($_devices);

        return array("count"=>count($_devices),
                       "firstDevice"=>$firstDevice,
                       "listJson"=>$jsonstrtemp
        );
    }

    public function bindPage($deviceId, $pageId) {
        $m_device = M('device');
        $where['device_id']=$deviceId;
        $_devices = $m_device->where($where)->select();
        foreach($_devices as $vo) {
            $poiId = $vo["poi_id"];
            if(!empty($poiId)) $poiId += ','.$pageId;
            $datainfo['poi_id'] = $poiId;
            $m_device->where($where)->save($datainfo);
        }
    }

    public function getDeviceByUser($userid) {
        $m_device = M('device');
        $sql['userid_int']=$userid;
        $_devices = $m_device->where($sql)->select();

        $firstDevice='';
        $jsonstrtemp = '[';
        foreach($_devices as $vo) {
            if($firstDevice == '') $firstDevice = $vo["device_id"];
            if( $jsonstrtemp != '[') $jsonstrtemp = $jsonstrtemp .',';
            $jsonstrtemp = $jsonstrtemp . '{"id": ' . $vo["device_id"] . ',"name":"'. $vo["device_name"] .'"}';
        }
        $jsonstrtemp = $jsonstrtemp . ']';

        //json_encode($_devices);

        return array("count"=>count($_devices),
                       "firstDevice"=>$firstDevice,
                       "listJson"=>$jsonstrtemp
        );
    }

    public function getSceneByDeviceId($deviceId) {
        $rtn = '';
        $m_device_scene = M('device');
        $sql['device_id']=$deviceId;
        $_device_scenes = $m_device_scene->where($sql)->select();

        foreach($_device_scenes as $vo) {
            $rtn = $vo['page_ids'];
        }
        return $rtn;
    }

    public function getDeviceInfo($sceneid) {
        $deviceInfo = '';
        $m_device_scene = M('scene');
        $sql['sceneid_bigint']=$sceneid;
        $_device_scenes = $m_device_scene->where($sql)->select();
        if($_device_scenes){
            $deviceid = $_device_scenes[0]["deviceid_int"];

            $m_device = M('device');
            $sql['device_id']=$deviceid;
            $_devices = $m_device->where($sql)->select();

            if($_devices) $deviceInfo = $_devices[0]["device_name"].'('.$_devices[0]["device_id"].')';
        }
        return $deviceInfo;
    }
}
?>
