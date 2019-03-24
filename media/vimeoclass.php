<?php
ini_set("display_errors","1");
error_reporting(E_ALL);
function curl_load($url) {
if(in_array('curl', get_loaded_extensions())){
$appSettings = parse_ini_file('../config/config.ini',true);
$ch = curl_init($url);
curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (X11; Linux x86_64; rv:62.0) Gecko/20100101 Firefox/62.0');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_HEADER, 0);
if($appSettings["Proxy"]["type"]) {
curl_setopt($ch, CURLOPT_PROXY, $appSettings["Proxy"]["type"]."://".$appSettings["Proxy"]["domain"].":".$appSettings["Proxy"]["port"]);
curl_setopt($ch, CURLOPT_PROXYUSERPWD, $appSettings["Proxy"]["username"].":".$appSettings["Proxy"]["password"]);
}
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
$result = curl_exec($ch);
curl_close($ch);
return $result;
}
}
function vimeo($id) {
$data = curl_load("https://www.vimeo.com/".$id);
if(!strstr($data,"window.vimeo.exception_data")) {
$data = stristr($data, 'config_url":"');
$start = substr($data, strlen('config_url":"'));
$stop = stripos($start, ',');
$str = substr($start, 0, $stop);
$data = json_decode(curl_load(rtrim(str_replace("\\", "", $str), '"')));
$captions = array();
if(isset($data->request->text_tracks)) {
for($i=0;$i<count($data->request->text_tracks);$i++) {
$caption = array();
$caption["title"] = $data->request->text_tracks[$i]->label;
$caption["lang"] = $data->request->text_tracks[$i]->lang;
$caption["url"] = $data->request->text_tracks[$i]->url;
array_push($captions,$caption);
}
}
$info = array();
$info["info"] = array();
$info["info"]["Title"] = $data->video->title;
$info["info"]["Thumbnail"] = $data->video->thumbs->base;
$info["info"]["Captions"] = $captions;
$info["info"]["Thumbs"] = array();
$info["info"]["Thumbs"]["src"] = "image.php?url=".urlencode($data->request->thumb_preview->url);
$info["info"]["Thumbs"]["width"] = $data->request->thumb_preview->width;
$info["info"]["Thumbs"]["height"] = $data->request->thumb_preview->height;
$info["info"]["Thumbs"]["fwidth"] = $data->request->thumb_preview->frame_width;
$info["info"]["Thumbs"]["fheight"] = $data->request->thumb_preview->frame_height;
$info["info"]["Thumbs"]["fcount"] = $data->request->thumb_preview->frames;
$info["info"]["Thumbs"]["row"] = $data->request->thumb_preview->columns;
$info["dl"] = array();
for($i=0;$i<count($data->request->files->progressive);$i++) {
$xinfo = array();
$xinfo["url"] = $data->request->files->progressive[$i]->url;
$xinfo["type"] = $data->request->files->progressive[$i]->quality;
array_push($info["dl"],$xinfo);
}
return $info;
}
else {
return false;
}
}
?>
