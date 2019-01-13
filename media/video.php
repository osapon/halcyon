<?php
if(!isset($_COOKIE["session"]) || $_COOKIE["session"] != "true") {
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
<video class="video-js vjs-default-skin" controls id="player" poster="<?=htmlspecialchars($_GET["preview"])?>" style="width:100%;height:100%">
Your browser does not support the video tag.
</video>
<script>
yp_player({share:false,use_desktop_skin:true,sources:[{src:"<?=htmlspecialchars($_GET["url"])?>",label:"Video",audio:true}]});
</script>
</body>
</html>