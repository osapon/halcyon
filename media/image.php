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
echo curlGet($_GET["url"]);
?>
