
<?php
    header("Content-Type: application/json");
    require_once __DIR__ . '/php-graph-sdk-5.0.0/src/Facebook/autoload.php';
    $fb= new Facebook\Facebook([
    'app_id' => '105687296626875',
    'app_secret' => '969948184832f5034de83057622f8748',
    'default_graph_version' => 'v2.8',
    ]);
    $accesstoken='EAABgHz3F0LsBAM2nw7SOj5fX2cn8RZA5Eg8zVLAR0YPo1pDY3vPLAsy5z7mZC9KNNjoxm6Tepo0ZBqGXsvEZBcJGYnO5ToQkYZBWQ5CtRRtZBSPSgJRbYGwq2VTbujfZAVZCfLdHQYyGcqHToRyXmJbFqZCy5eN9Yjw4ZD';

$key=$_GET["keyword"];
$intype=$_GET["searchtype"];
$iden=$_GET["iden"];
$details=$_GET["details"];


if($details!=null) 

	{
	if($details=="false" ){
	$picture=$_GET["picurl"];
	if($picture!=null)
	{
	 $albumPhotoUrl='/'.$picture.'/picture';
	 $pictureResponse=$fb->get($albumPhotoUrl,$accesstoken);
	$pictureResponse1=$pictureResponse->getHeaders();
	 echo json_encode($pictureResponse1);
	}
	}
	else{
	$userId=$_GET["id_details"];
	$id_url = $userId."?fields=id,name,picture.width(700).height(700),albums.limit(5){name,photos.limit(2){name, picture}},posts.limit(5){message,story,created_time}&format=json";
    $id_url1 = $fb->get($id_url,$accesstoken);
    $id_url2 = $id_url1->getDecodedBody();
    echo json_encode($id_url2);
	}
	
	

	}


if($iden==null && $details==null )
{
    if( $intype!="place")
    $fbquery='/search?q='.$key.'&type='.$intype.'&fields=id,name,picture.width(700).height(700)';
    else
    {
        $lat=$_GET["latitude"];
        $log=$_GET["longitude"];
        $fbquery='/search?q='.$key.'&type='.$intype.'&center='.$lat.','.$log.'&fields=id,name,picture.width(700).height(700)';

    }
 if($fbquery!="")
        {
            try
            {   
                $res=$fb->get($fbquery,$accesstoken);
            }
            catch(Facebook\Exceptions\FacebookResponseException $e)
            {
                echo "graph retured by server is error".$e->getMessage();
                exit;
            }
            catch(Facebook\Exceptions\FacebookSDKException $e)
            {
                echo "sdk retured by server is error". $e->getMessage();
                exit;
            }
        }

 $user=$res->getDecodedBody();
 echo json_encode($user);
}

else if($iden=='next' || $iden=='previous')
{
    if($iden=='next')$url= $_GET["nexturl"];
    else
        $url= $_GET["previousurl"];
    $urlpos= strpos($url,"/search");
    $fbquery = substr($url, $urlpos, strlen($url));
    if($fbquery!="")
        {
            try
            {   
                $res=$fb->get($fbquery,$accesstoken);
            }
            catch(Facebook\Exceptions\FacebookResponseException $e)
            {
                echo "graph retured by server is error".$e->getMessage();
                exit;
            }
            catch(Facebook\Exceptions\FacebookSDKException $e)
            {
                echo "sdk retured by server is error". $e->getMessage();
                exit;
            }
        }
    $user=$res->getDecodedBody();
    echo json_encode($user);
    
}

?>