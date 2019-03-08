<?php
function curlGet($url) {
if(in_array('curl', get_loaded_extensions())){
$appSettings = parse_ini_file('../config/config.ini',true);
$ch = curl_init($url);
curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (X11; Linux x86_64; rv:62.0) Gecko/20100101 Firefox/62.0');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_HEADER, 0);
//curl_setopt($ch, CURLOPT_IPRESOLVE, CURL_IPRESOLVE_V4);
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
return FALSE;
}
header("Content-type: image/jpeg");
$thumbparts = explode("|",$_GET["data"]);
$i = count($thumbparts)-1;
$thumbdata = explode("#",$thumbparts[$i]);
$base_url = $thumbparts[0];
$thumbs = imagecreatetruecolor($thumbdata[0]*$thumbdata[3],$thumbdata[1]*ceil($thumbdata[2]/$thumbdata[3]));
for($j=0;$j<ceil($thumbdata[2]/($thumbdata[3]*$thumbdata[4]));$j++) {
$link = str_replace('$L',$i-1,$base_url)."&";
$link = str_replace('$N',$thumbdata[6],$link);
$link = str_replace('$M',$j,$link)."sigh=".$thumbdata[7];
$thumb = imagecreatefromstring(curlGet($link));
imagecopy($thumbs,$thumb,0,$j*$thumbdata[1]*$thumbdata[4],0,0,$thumbdata[0]*$thumbdata[3],$thumbdata[1]*$thumbdata[4]);
}
imagejpeg($thumbs);
?>
