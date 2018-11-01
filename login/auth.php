<!DOCTYPE HTML>
<html lang='en'>
<head>
<script>
if(
localStorage.getItem('current_id') |
localStorage.getItem('current_instance') |
localStorage.getItem('current_authtoken')
){
location.href = '/logout';
};
</script>
<script src="/assets/js/jquery/jquery.min.js"></script>
<script src="/assets/js/mastodon.js/mastodon.js"></script>
<script src="/assets/js/jquery-cookie/src/jquery.cookie.js"></script>
<?php
require_once('../authorize/mastodon.php');
use HalcyonSuite\HalcyonForMastodon\Mastodon;
$api = new Mastodon();
if ($_GET['code']) {
$domain = htmlspecialchars((string)filter_input(INPUT_GET, 'host'), ENT_QUOTES);
$URL= 'https://'.$domain;
$api->selectInstance($URL);
$response = $api->get_access_token($api->clientWebsite.'/auth?&host='.$domain, htmlspecialchars((string)filter_input(INPUT_GET, 'code'), ENT_QUOTES));
if ($response['html']["access_token"]) {
$access_token = $response['html']["access_token"];
$profile = $api->accounts_verify_credentials()['html'];
$account_id = $profile['id'];
echo "
<script>
localStorage.setItem('current_id','$account_id');
localStorage.setItem('current_instance','$domain');
localStorage.setItem('current_authtoken', '$access_token');
localStorage.setItem('setting_post_stream', 'auto');
localStorage.setItem('setting_post_privacy', 'public');
localStorage.setItem('setting_local_instance', 'default');
localStorage.setItem('setting_search_filter', 'all');
localStorage.setItem('setting_link_previews', 'true');
localStorage.setItem('setting_desktop_notifications', 'true');
localStorage.setItem('setting_service_worker', 'false');
localStorage.setItem('setting_who_to_follow', 'false');
localStorage.setItem('setting_show_replies', 'true');
localStorage.setItem('setting_show_content_warning', 'false');
localStorage.setItem('setting_show_nsfw', 'false');
localStorage.setItem('setting_compose_autocomplete', 'true');
localStorage.setItem('setting_post_privacy','".$profile["source"]["privacy"]."');
localStorage.setItem('setting_post_sensitive','".$profile["source"]["sensitive"]."');
$.cookie('darktheme','false',{path:'/',expires:3650});
location.href = '/';
</script>
";
}
}
?>
</head>
<body>
</body>
</html>
