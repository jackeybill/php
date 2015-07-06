<?php
namespace Home\Model;
use Think\Model;
class DeviceModel extends Model {

    public function addDevice() {
		$m_scene=M('device');
		$mapp = array();
		$mapp['userid_int'] = session('userid');
		$mapp['delete_int'] = 1;
		$delete_count = $m_scene->where($mapp)->count();
		$mapp2 = array();
		$mapp2['userid_int'] = session('userid');
		$create_count = $m_scene->where($mapp2)->count();
		$sum = $create_count - $delete_count;
		if(session('scene_times')<=$sum){
			
			echo json_encode(array("success" => true,
									"code"=> 1006,
									"msg" => session('scene_times'),
									"obj"=> null,
									"map"=> null,
									"list"=> null
								   )
							);
			return;
		}
		$m_scenepage=M('scenepage');
		$datas = $_POST;

		$datainfo['scenecode_varchar'] = 'U'.(date('y',time())-9).date('m',time()).randorderno(6,-1);
		$datainfo['scenename_varchar'] = $datas['name'];
		$datainfo['movietype_int'] = $datas['pageMode'];
		$datainfo['scenetype_int'] = intval($datas['type']);
		$datainfo['ip_varchar'] = get_client_ip();
		$datainfo['thumbnail_varchar'] = "default_thum.jpg";
		$datainfo['userid_int'] = session('userid');
		$datainfo['createtime_time'] = date('y-m-d H:i:s',time());
		
		$result1 = $m_scene->add($datainfo);
		//var_dump($result1);exit;
		if($result1){
			$datainfo2['scenecode_varchar'] = $datainfo['scenecode_varchar'];
			$datainfo2['sceneid_bigint'] = $result1;
			$datainfo2['content_text'] = "[]";
			$datainfo2['properties_text'] = 'null';
			$datainfo2['userid_int'] = session('userid');
			$result2 = $m_scenepage->add($datainfo2);

            // create page and device mapping
            if($result2){
                $m_deviceScene=M('device_scene');
                $deviceSceneInfo['device_id']=intval($datas['deviceID']);
                $deviceSceneInfo['sceneid_bigint']=$result1;
                $result3 = $m_deviceScene->add($deviceSceneInfo);

                echo json_encode(array("success" => true,
                        "code"=> 200,
                        "msg" => "success",
                        "obj"=> $result1,
                        "map"=> null,
                        "list"=> null
                    )
                );
            }
		}else{
			exit;
		}
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
