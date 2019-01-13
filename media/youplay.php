<?php
$config = parse_ini_file('../config/config.ini',true);
if(!isset($_COOKIE["session"]) || $_COOKIE["session"] != "true" || !$config["Media"]["youplay"]) {
http_response_code(403);
die('Forbidden');
}
?>
<!DOCTYPE html>
<html lang="en" style="height:100%">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<script src="/assets/js/player/youplay.js"></script>
</head>
<body style="margin:0;height:100%;overflow:hidden">
<?php
include("ytclass.php");
$ytclass = new YTDownloader();
$vdata = $ytclass->getDownloadLinks(htmlspecialchars($_GET["id"]));
if($vdata) {
$vlink = $vdata["dl"];
?>
<video class="video-js vjs-default-skin" controls id="player" poster="<?=$vdata["info"]["Thumbnail"]?>" title="<?=$vdata["info"]["Title"]?>" style="width:100%;height:100%">
Your browser does not support the video tag.
</video>
<script>
yp_player({share:false,use_desktop_skin:true,sources:[
<?php
$formats = array();
for($i=0;$i<count($vlink);$i++) {
if(!strstr($vlink[$i]["type"]," Only)")) {
array_push($formats,$vlink[$i]["type"]);
echo "{src:'".$vlink[$i]["url"]."',label:'".$vlink[$i]["type"]."',audio:true},";
}
else if(strstr($vlink[$i]["type"],"(Video Only)") && !in_array(substr($vlink[$i]["type"],13),$formats)) echo "{src:'".$vlink[$i]["url"]."',label:'".substr($vlink[$i]["type"],13)."',audio:false},";
}
?>
],audio_url:[
<?php
for($i=0;$i<count($vlink);$i++) {
if(strstr($vlink[$i]["type"],"(Audio Only)")) echo "'".$vlink[$i]["url"]."',";
}
?>
]});
</script>
<?php } else { ?>
Sorry, there was an error while trying to load your video.
<?php } ?>
</body>
</html>