<?php
namespace HalcyonSuite\HalcyonForMastodon;
require_once('mastodon-api/mastodon.php');
class Mastodon extends \Mastodon_api {
function __construct(){
$appSettings = parse_ini_file('../config/config.ini',true);
$this->datadir = "../data";
$this->clientName = $appSettings["App"]["api_client_name"];
$this->clientRedirectUris = $appSettings["App"]["api_client_website"].'/auth urn:ietf:wg:oauth:2.0:oob';
$this->clientWebsite = $appSettings["App"]["api_client_website"];
$this->clientScopes = array('read','write','follow');
$this->instances = array();
$this->readInstances();
}
private function newInstance($domain) {
$res = $this->create_app($this->clientName,$this->clientScopes,$this->clientRedirectUris,$this->clientWebsite);
if(isset($res['html']['client_id'])) {
$this->instances[$domain] = $res['html'];
file_put_contents($this->datadir."/".substr($domain,8).".txt",json_encode(array("client_id" => $res['html']['client_id'],"client_secret" => $res['html']['client_secret'])));
}
else {
throw new Exception("Invalid instance");
}
}
public function selectInstance($domain) {
$this->set_url($domain);
if(!$this->instanceExists($domain)) {
$this->newInstance($domain);
}
$this->set_client($this->instances[$domain]['client_id'],$this->instances[$domain]['client_secret']);
}
public function getInstance($domain) {
$this->set_url($domain);
if (!$this->instanceExists($domain)) {
$this->newInstance($domain);
}
return array('client_id' => $this->instances[$domain]['client_id'],'client_secret' => $this->instances[$domain]['client_secret']);
}
public function instanceExists($domain) {
return isset($this->instances[$domain]);
}
private function readInstances() {
$instlist = array_diff(scandir($this->datadir),array("..",".",".htaccess"));
foreach($instlist as $index => $item) {
$itemname = "https://".substr($item,0,-4);
$this->instances[$itemname] = json_decode(file_get_contents($this->datadir."/".$item),true);
}
}
}
?>
