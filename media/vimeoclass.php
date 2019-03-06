<?php
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
$info = array();
$info["info"] = array();
$info["info"]["Title"] = $data->video->title;
$info["info"]["Thumbnail"] = $data->video->thumbs->base;
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