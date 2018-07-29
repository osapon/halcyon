<?php
$config = parse_ini_file(__DIR__.'/config/config.ini',true);
$locale = '';
if(isset($_COOKIE['lang'])) $locale = $_COOKIE['lang'];
else $locale = Locale::acceptFromHttp($_SERVER['HTTP_ACCEPT_LANGUAGE']);
if(!file_exists(__DIR__.'/locale/'.$locale)) {
$locale = $config['App']['default_language'];
}
if(function_exists("putenv")) {
putenv('LC_ALL='.$locale);
}
if(!setlocale(LC_ALL,$locale)) setlocale(LC_ALL,'0');
bindtextdomain('messages',__DIR__.'/locale');
bind_textdomain_codeset('messages','UTF-8');
textdomain('messages');
if(!function_exists('gettext')) {
function gettext($context,$msgid) {
$contextString = "{$context}\004{$msgid}";
$translation = _($contextString);
if($translation == $contextString) return $msgid;
else return $translation;
}
}
$lang = explode('_',$locale);
if(count($lang)==2) $lang = $lang[0];
else $lang = 'en';
?>
