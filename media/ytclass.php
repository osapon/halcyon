<?php
class YTDownloader {
private $cache_dir;
private $cookie_dir;
private $itag_info = array(
// Full Video
18 => "MP4[640x360]",
22 => "HD MP4[1280x720]",
36 => "3GP[320x180]",
43 => "WEBM[640x360]",	
17 => "3GP[176x144]",
// DASH videos
137 => "(Video Only) MP4[1920x1080]",
248 => "(Video Only) WEBM[1920x1080]",
136 => "(Video Only) MP4[1280x720]",
247 => "(Video Only) WEBM[1280x720]",
135 => "(Video Only) MP4[854x480]",
244 => "(Video Only) WEBM[854x480]",
134 => "(Video Only) MP4[640x360]",
243 => "(Video Only) WEBM[640x360]",
133 => "(Video Only) MP4[320x240]",
242 => "(Video Only) WEBM[320x240]",
160 => "(Video Only) MP4[176x144]",
278 => "(Video Only) WEBM[176x144]",
// Dash Audios
140 => "(Audio Only) M4A[128Kbps]",
171 => "(Audio Only) WEBM[128Kbps]",
249 => "(Audio Only) WEBM[50Kbps]",
250 => "(Audio Only) WEBM[70Kbps]",
251 => "(Audio Only) WEBM[160Kbps]"
	);
private $itag_ext = array(
// Full Video
18 => ".mp4",
22 => ".mp4",
36 => ".3gp",
43 => ".webm",
17 => ".3gp",
// DASH videos
137 => ".mp4",
248 => ".webm",
136 => ".mp4",
247 => ".webm",
135 => ".mp4",
244 => ".webm",
134 => ".mp4",
243 => ".webm",
133 => ".mp4",
242 => ".webm",
160 => ".mp4",
278 => ".webm",
// Dash Audios
140 => ".mp4",
171 => ".webm",
249 => ".webm",
250 => ".webm",
251 => ".webm"
);
function __construct(){
$this->cache_dir = dirname(__FILE__).'/.cache';
$this->cookie_dir = sys_get_temp_dir();
if(!file_exists($this->cache_dir) && is_writeable(dirname(__FILE__))) {
mkdir($this->cache_dir,0755);
}
}
public function getDownloadLinks($id) {
$returnData = FALSE;
$videoID = $this->extractId($id);
$webPage = $this->curlGet('https://www.youtube.com/watch?v='.$videoID);
$sts = null;
if(preg_match('|"sts":([0-9]{4,}),"|i', $webPage, $matches)) {
$sts = $matches[1];
}
foreach(array('vevo', 'embedded', 'detailpage') as $elKey) {
$query = http_build_query(array(
'c' => 'web',
'el' => $elKey,
'hl' => 'en_US',
'sts' => $sts,
'cver' => 'html5',
'eurl' => "https://youtube.googleapis.com/v/{$videoID}",
'html5' => '1',
'iframe' => '1',
'authuser' => '1',
'video_id' => $videoID,
));
if($this->is_Ok($videoData = $this->curlGet("http://www.youtube.com/get_video_info?{$query}"))) {
parse_str($videoData, $videoData);
break;
}
}
if(isset($videoData['status']) && $videoData['status'] !== 'fail') {
$vInfo['Title'] = $videoData['title'];
$vInfo['ChannelName'] = $videoData['author'];
$vInfo['ChannelId'] = $videoData['ucid'];
$vInfo['Thumbnail'] = str_replace('default', 'maxresdefault', $videoData['thumbnail_url']);
$vInfo['Duration'] = $videoData['length_seconds'];
//$vInfo['Rating'] = $videoData['avg_rating'];
}
if (isset($videoData['url_encoded_fmt_stream_map']) && isset($videoData['adaptive_fmts'])) {
$draft1 = explode(',',$videoData['url_encoded_fmt_stream_map']);
$draft2 = explode(',',$videoData['adaptive_fmts']);
foreach ($draft1 as $key) {
$draftLink[] = $key;
}
foreach ($draft2 as $key) {
$draftLink[] = $key;
}
foreach($draftLink as $dlink) {
parse_str($dlink,$mLink[]);
}
if (isset($mLink[0]['s'])) {
$instructions = $this->get_instructions($webPage);
}
foreach($mLink as $linker) {
if(isset($linker['s'])) {
$linkData[] = array(
'url' => preg_replace('@(https\:\/\/)[^\.]+(\.googlevideo\.com)@', 'https://redirector$2', $linker['url']).'&signature='.$this->sig_decipher($linker['s'], $instructions).'&title='.$this->clean_name($videoData['title']),
'itag' => $linker['itag'],
'type' => isset($this->itag_info[$linker['itag']]) ? $this->itag_info[$linker['itag']] : 'Unknown'
);
} else {
$linkData[] = array(
'url' => preg_replace('@(https\:\/\/)[^\.]+(\.googlevideo\.com)@', 'https://redirector$2', $linker['url']).'&title='.$this->clean_name($videoData['title']),
'itag' => $linker['itag'],
'type' => isset($this->itag_info[$linker['itag']]) ? $this->itag_info[$linker['itag']] : 'Unknown'
);
}
}
}
if (!empty($vInfo)) {
$returnData['info'] = $vInfo;
}if (!empty($linkData)) {
$returnData['dl'] = $linkData;
}
return $returnData;
}
protected function curlGet($url) {
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
private function is_Ok($var) {
if(!preg_match('|status=fail|i',$var)) {
return true;
}
}
private function extractId($str) {
if(preg_match('/[a-z0-9_-]{11}/i', $str, $matches)){
return $matches[0];
}
return FALSE;
}
private function get_instructions($html) {
$playerPattern = '/"assets":.+?"js":\s*("[^"]+")/';
if(preg_match($playerPattern, $html, $matches) && is_string($_player = json_decode($matches[1])) && strlen($_player) >= 1) {
$playerLink = substr($_player, 0, 2) == '//' ? "https:{$_player}" : "https://www.youtube.com{$_player}";
$cache_player = $this->cache_dir.'/.ht-'.md5($_player);
if(file_exists($cache_player)) {
return unserialize(file_get_contents($cache_player));
} else {
$js_code = $this->curlGet($playerLink);
$instructions = $this->sig_js_decode($js_code);
if($instructions){
if(file_exists($this->cache_dir) && is_writeable($this->cache_dir))
file_put_contents($cache_player, serialize($instructions));
return $instructions;
}
}
}
return false;
}
private function clean_name($name) {
$special_chars = array(".","?", "[", "]", "/", "\\", "=", "<", ">", ":", ";", ",", "'", "\"", "&", "$", "#", "*", "(", ")", "|", "~", "`", "!", "{", "}", "%", "+", chr(0));
$filename = str_replace($special_chars,' ',$name);
$filename = preg_replace( "#\x{00a0}#siu", ' ', $filename );
$filename = str_replace( array( '%20', '+', ' '), '-', $filename );
$filename = preg_replace( '/[\r\n\t -]+/', '-', $filename );
$filename = trim( $filename, '.-_' );
return $filename;
}
private function sig_decipher($signature, $instructions) {
foreach($instructions as $opt){
$command = $opt[0];
$value = $opt[1];
if($command == 'swap'){
$temp = $signature[0];
$signature[0] = $signature[$value % strlen($signature)];
$signature[$value] = $temp;
} elseif($command == 'splice'){
$signature = substr($signature, $value);
} elseif($command == 'reverse'){
$signature = strrev($signature);
}
}
return trim($signature);
}
private function sig_js_decode($file){
$script = $this->getBetween($file, 'a=a.split("");', ';return a.join("")');
$script = str_replace(array("a,","\n"), array(',',''), $script);
$script2= $this->getBetween($file, 'var ' . substr($script, 0, 2).'={', '};');
$script2= str_replace('a,b', 'a', $script2);
$script = str_replace(substr($script, 0, 2).'.', '', $script);
$script = str_replace('(', '', $script);
$script = str_replace(')', '', $script);
$script_ex= explode(";", $script);
$script2_ex = explode("\n", $script2);
for($i = 0; $i < count($script2_ex); $i++) {
$tmp = isset($script2_ex[$i]) ? explode(':', $script2_ex[$i]) : [];
$n = isset($tmp[0]) ? $tmp[0] : '';
$m = isset($tmp[1]) ? $tmp[1] : '';
$tempS[$n] = $m;
}
for($i = 0; $i < count($script_ex); $i++) {
$tmp = isset($script_ex[$i]) ? explode(',', $script_ex[$i]) : [];
$a = isset($tmp[0]) ? $tmp[0] : '';
$b = isset($tmp[1]) ? $tmp[1] : '';
$deKey[] = $this->createCommad($a, $b, $tempS);
}
return $deKey;
}
private function createCommad($value, $num, $source) {
$result = '';
if (isset($source[$value]) && mb_strpos($source[$value], 'reverse')) {
$result = array('reverse', '');
} elseif (isset($source[$value]) && mb_strpos($source[$value], 'a.splice')) {
$result = array('splice', $num);
} else {
$result = array('swap', $num);
}
return $result;
}
private function getBetween($content, $start, $end) {
$r = explode($start, $content);
if (isset($r[1])) {
$r = explode($end, $r[1]);
return $r[0];
}
return '';
}
}
