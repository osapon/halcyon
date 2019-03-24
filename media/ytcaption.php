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
function timevtt($gtime) {
if(strlen(date("H",intval($gtime))-1) == 1) $hour = "0".intval(date("H",intval($gtime))-1);
else $hour = intval(date("H",intval($gtime))-1);
if(strlen(explode(".",$gtime)[1]) == 3) return $hour.":".date("i:s",intval($gtime)).".".explode(".",$gtime)[1];
if(strlen(explode(".",$gtime)[1]) == 2) return $hour.":".date("i:s",intval($gtime)).".".explode(".",$gtime)[1]."0";
if(strlen(explode(".",$gtime)[1]) == 1) return $hour.":".date("i:s",intval($gtime)).".".explode(".",$gtime)[1]."00";
if(strlen(explode(".",$gtime)[1]) == 0) return $hour.":".date("i:s",intval($gtime)).".".explode(".",$gtime)[1]."000";
}
$caption = new SimpleXMLElement(curlGet($_GET["url"]));
echo "WEBVTT\n";
echo "Kind: captions\n";
echo "Language: ".$_GET["lang"]."\n\n";
for($i=0;$i<count($caption->text);$i++) {
if($i == count($caption->text)-1) {
if(strlen(explode(".",$caption->text[$i]["start"])[1]+explode(".",$caption->text[$i]["dur"])[1]) == 3) $endtime = array(explode(".",$caption->text[$i]["start"])[0]+explode(".",$caption->text[$i]["dur"])[0],explode(".",$caption->text[$i]["start"])[1]+explode(".",$caption->text[$i]["dur"])[1]);
else $endtime = array(explode(".",$caption->text[$i]["start"])[0]+explode(".",$caption->text[$i]["dur"])[0]+1,explode(".",$caption->text[$i]["start"])[1]+explode(".",$caption->text[$i]["dur"])[1]);
echo timevtt($caption->text[$i]["start"])." --> ".timevtt(implode(".",$endtime))."\n";
}
else echo timevtt($caption->text[$i]["start"])." --> ".timevtt($caption->text[$i+1]["start"])."\n";
echo preg_replace('/<font color="#[a-fA-F0-9]{6}">/',"",str_replace("</font>","",$caption->text[$i]))."\n\n";
}
?>
