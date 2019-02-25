<?php
/**
 * Class Mastodon_api
 *
 * PHP version 7.1
 *
 * Mastodon     https://mastodon.social/
 * API LIST     https://github.com/tootsuite/documentation/blob/master/Using-the-API/API.md
 *
 * @author      KwangSeon Yun   <middleyks@hanmail.net>
 * @copyright   KwangSeon Yun
 * @license     https://raw.githubusercontent.com/yks118/Mastodon-api-php/master/LICENSE     MIT License
 * @link        https://github.com/yks118/Mastodon-api-php
 */
class Mastodon_api {
private $mastodon_url = '';
private $client_id = '';
private $client_secret = '';
private $token = array();
private $scopes = array();
public function __construct () {}
public function __destruct () {}
private function _post ($url,$data = array()) {
$parameters = array();
$parameters[CURLOPT_POST] = 1;
if (isset($this->token['access_token'])) {
$data['access_token'] = $this->token['access_token'];
}
if (count($data)) {
$parameters[CURLOPT_POSTFIELDS] = http_build_query($data);
}
$url = $this->mastodon_url.$url;
$response = $this->get_content_curl($url,$parameters);
return $response;
}
private function _get ($url,$data = array()) {
$parameters = array();
if (isset($this->token['access_token'])) {
$authorization = 'Authorization: '.$this->token['token_type'].' '.$this->token['access_token'];
$parameters[CURLOPT_HTTPHEADER] = array('Content-Type: application/json',$authorization);
}
$url = $this->mastodon_url.$url;
if (count($data)) {
$url .= '?'.http_build_query($data);
}
$response = $this->get_content_curl($url,$parameters);
return $response;
}
private function _patch ($url,$data = array()) {
$parameters = array();
$parameters[CURLOPT_CUSTOMREQUEST] = 'PATCH';
if (isset($this->token['access_token'])) {
$authorization = 'Authorization: '.$this->token['token_type'].' '.$this->token['access_token'];
$parameters[CURLOPT_HTTPHEADER] = array('Content-Type: application/json',$authorization);
}
if (count($data)) {
$parameters[CURLOPT_POSTFIELDS] = json_encode($data);
}
$url = $this->mastodon_url.$url;
$response = $this->get_content_curl($url,$parameters);
return $response;
}
private function _delete ($url) {
$parameters = array();
$parameters[CURLOPT_CUSTOMREQUEST] = 'DELETE';
if (isset($this->token['access_token'])) {
$authorization = 'Authorization: '.$this->token['token_type'].' '.$this->token['access_token'];
$parameters[CURLOPT_HTTPHEADER] = array('Content-Type: application/json',$authorization);
}
$url = $this->mastodon_url.$url;
$response = $this->get_content_curl($url,$parameters);
return $response;
}
protected function get_content_curl ($url,$parameters = array()) {
$data = array();
if (!isset($parameters[CURLOPT_USERAGENT])) {
if (isset($_SERVER['HTTP_USER_AGENT'])) {
$parameters[CURLOPT_USERAGENT] = $_SERVER['HTTP_USER_AGENT'];
} else {
$parameters[CURLOPT_USERAGENT] = 'Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; rv:11.0) like Gecko';
}
}
if (function_exists('curl_init')) {
$ch = curl_init();
curl_setopt($ch,CURLOPT_URL,$url);
foreach ($parameters as $key => $value) {
curl_setopt($ch,$key,$value);
}
if (!isset($parameters[CURLOPT_SSL_VERIFYPEER])) {
curl_setopt($ch,CURLOPT_SSL_VERIFYPEER,FALSE);
}
if (!isset($parameters[CURLOPT_SSLVERSION])) {
curl_setopt($ch,CURLOPT_SSLVERSION,6);
}
if (!isset($parameters[CURLOPT_HEADER])) {
curl_setopt($ch,CURLOPT_HEADER,0);
}
if (!isset($parameters[CURLOPT_POST]) && !isset($parameters[CURLOPT_CUSTOMREQUEST])) {
curl_setopt($ch,CURLOPT_POST,0);
}
if (!isset($parameters[CURLOPT_RETURNTRANSFER])) {
curl_setopt($ch,CURLOPT_RETURNTRANSFER,1);
}
if (!isset($parameters[CURLOPT_HTTP_VERSION])) {
curl_setopt($ch,CURLOPT_HTTP_VERSION,3);
}
if (!isset($parameters[CURLINFO_HEADER_OUT])) {
curl_setopt($ch,CURLINFO_HEADER_OUT,TRUE);
}
$data['html'] = json_decode(curl_exec($ch),true);
$data['response'] = curl_getinfo($ch);
curl_close($ch);
}
return $data;
}
public function set_url ($path) {
$this->mastodon_url = $path;
}
public function set_client ($id,$secret) {
$this->client_id = $id;
$this->client_secret = $secret;
}
public function set_token ($token,$type) {
$this->token['access_token'] = $token;
$this->token['token_type'] = $type;
}
public function set_scopes ($scopes) {
$this->scopes = $scopes;
}
public function create_app ($client_name,$scopes = array(),$redirect_uris = '',$website = '') {
$parameters = array();
if (count($scopes) == 0) {
if (count($this->scopes) == 0) {
$scopes = array('read','write','follow');
} else {
$scopes = $this->scopes;
}
}
$parameters['client_name'] = $client_name;
$parameters['scopes'] = implode(' ',$scopes);
if (empty($redirect_uris)) {
$parameters['redirect_uris'] = 'urn:ietf:wg:oauth:2.0:oob';
} else {
$parameters['redirect_uris'] = $redirect_uris;
}
if ($website) {
$parameters['website'] = $website;
}
$response = $this->_post('/api/v1/apps',$parameters);
if (isset($response['html']['client_id'])) {
$this->client_id = $response['html']['client_id'];
$this->client_secret = $response['html']['client_secret'];
}
return $response;
}
public function login ($id,$password) {
$parameters = array();
$parameters['client_id'] = $this->client_id;
$parameters['client_secret'] = $this->client_secret;
$parameters['grant_type'] = 'password';
$parameters['username'] = $id;
$parameters['password'] = $password;
if (count($this->scopes) == 0) {
$parameters['scope'] = implode(' ',array('read','write','follow'));
} else {
$parameters['scope'] = implode(' ',$this->scopes);
}
$response = $this->_post('/oauth/token',$parameters);
if (isset($response['html']["access_token"])) {
$this->token['access_token'] = $response['html']['access_token'];
$this->token['token_type'] = $response['html']['token_type'];
}
return $response;
}
public function get_access_token ($redirect_uri,$code) {
$parameters = array();
$parameters['grant_type']    = 'authorization_code';
$parameters['redirect_uri']  = $redirect_uri;
$parameters['client_id']     = $this->client_id;
$parameters['client_secret'] = $this->client_secret;
$parameters['code']          = $code;
$response = $this->_post('/oauth/token',$parameters);
if (isset($response['html']["access_token"])) {
$this->token['access_token'] = $response['html']['access_token'];
$this->token['token_type'] = $response['html']['token_type'];
}
return $response;
}
public function accounts ($id) {
$response = $this->_get('/api/v1/accounts/'.$id);
return $response;
}
public function accounts_verify_credentials () {
$response = $this->_get('/api/v1/accounts/verify_credentials');
return $response;
}
public function accounts_update_credentials ($parameters) {
$response = $this->_patch('/api/v1/accounts/update_credentials',$parameters);
return $response;
}
public function accounts_followers ($id) {
$response = $this->_get('/api/v1/accounts/'.$id.'/followers');
return $response;
}
public function accounts_following ($id) {
$response = $this->_get('/api/v1/accounts/'.$id.'/following');
return $response;
}
public function accounts_statuses ($id) {
$response = $this->_get('/api/v1/accounts/'.$id.'/statuses');
return $response;
}
public function accounts_follow ($id) {
$response = $this->_post('/api/v1/accounts/'.$id.'/follow');
return $response;
}
public function accounts_unfollow ($id) {
$response = $this->_post('/api/v1/accounts/'.$id.'/unfollow');
return $response;
}
public function accounts_block ($id) {
$response = $this->_post('/api/v1/accounts/'.$id.'/block');
return $response;
}
public function accounts_unblock ($id) {
$response = $this->_post('/api/v1/accounts/'.$id.'/unblock');
return $response;
}
public function accounts_mute ($id) {
$response = $this->_post('/api/v1/accounts/'.$id.'/mute');
return $response;
}
public function accounts_unmute ($id) {
$response = $this->_post('/api/v1/accounts/'.$id.'/unmute');
return $response;
}
public function accounts_relationships ($parameters) {
$response = $this->_get('/api/v1/accounts/relationships',$parameters);
return $response;
}
public function accounts_search ($parameters) {
$response = $this->_get('/api/v1/accounts/search',$parameters);
return $response;
}
public function blocks () {
$response = $this->_get('/api/v1/blocks');
return $response;
}
public function favourites () {
$response = $this->_get('/api/v1/favourites');
return $response;
}
public function follow_requests () {
$response = $this->_get('/api/v1/follow_requests');
return $response;
}
public function follow_requests_authorize ($id) {
$response = $this->_post('/api/v1/follow_requests/authorize',array('id'=>$id));
return $response;
}
public function follow_requests_reject ($id) {
$response = $this->_post('/api/v1/follow_requests/reject',array('id'=>$id));
return $response;
}
public function follows ($uri) {
$response = $this->_post('/api/v1/follows',array('uri'=>$uri));
return $response;
}
public function instance () {
$response = $this->_get('/api/v1/instance');
return $response;
}
public function media ($file_path) {
$url = $this->mastodon_url.'/api/v1/media';
$parameters = $data = array();
$parameters[CURLOPT_HTTPHEADER] = array('Content-Type'=>'multipart/form-data');
$parameters[CURLOPT_POST] = true;
if (isset($this->token['access_token'])) {
$parameters[CURLOPT_POSTFIELDS]['access_token'] = $this->token['access_token'];
}
if (is_file($file_path)) {
$mime_type = mime_content_type($file_path);
$cf = curl_file_create($file_path,$mime_type,'file');
$parameters[CURLOPT_POSTFIELDS]['file'] = $cf;
}
$response = $this->get_content_curl($url,$parameters);
return $response;
}
public function mutes () {
$response = $this->_get('/api/v1/mutes');
return $response;
}
public function notifications ($id = 0) {
$url = '/api/v1/notifications';
if ($id > 0) {
$url .= '/'.$id;
}
$response = $this->_get($url);
return $response;
}
public function notifications_clear () {
$response = $this->_post('/api/v1/notifications/clear');
return $response;
}
public function get_reports () {
$response = $this->_get('/api/v1/reports');
return $response;
}
public function post_reports ($parameters) {
$response = $this->_post('/api/v1/reports',$parameters);
return $response;
}
public function search ($parameters) {
$response = $this->_get('/api/v1/search',$parameters);
return $response;
}
public function statuses ($id) {
$response = $this->_get('/api/v1/statuses/'.$id);
return $response;
}
public function statuses_context ($id) {
$response = $this->_get('/api/v1/statuses/'.$id.'/context');
return $response;
}
public function statuses_card ($id) {
$response = $this->_get('/api/v1/statuses/'.$id.'/card');
return $response;
}
public function statuses_reblogged_by ($id) {
$response = $this->_get('/api/v1/statuses/'.$id.'/reblogged_by');
return $response;
}
public function statuses_favourited_by ($id) {
$response = $this->_get('/api/v1/statuses/'.$id.'/favourited_by');
return $response;
}
public function post_statuses ($parameters) {
$response = $this->_post('/api/v1/statuses',$parameters);
return $response;
}
public function delete_statuses ($id) {
$response = $this->_delete('/api/v1/statuses/'.$id);
return $response;
}
public function statuses_reblog ($id) {
$response = $this->_post('/api/v1/statuses/'.$id.'/reblog');
return $response;
}
public function statuses_unreblog ($id) {
$response = $this->_post('/api/v1/statuses/'.$id.'/unreblog');
return $response;
}
public function statuses_favourite ($id) {
$response = $this->_post('/api/v1/statuses/'.$id.'/favourite');
return $response;
}
public function statuses_unfavourite ($id) {
$response = $this->_post('/api/v1/statuses/'.$id.'/unfavourite');
return $response;
}
public function timelines_home () {
$response = $this->_get('/api/v1/timelines/home');
return $response;
}
public function timelines_public ($parameters = array()) {
$response = $this->_get('/api/v1/timelines/public',$parameters);
return $response;
}
public function timelines_tag ($hashtag,$parameters = array()) {
$response = $this->_get('/api/v1/timelines/tag/'.$hashtag,$parameters);
return $response;
}
}
?>
