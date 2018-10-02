<?php
$config = parse_ini_file(__DIR__.'/config/config.ini',true);
$locale = '';
if(isset($_COOKIE['language'])) $locale = $_COOKIE['language'];
else if(isset($_SERVER['HTTP_ACCEPT_LANGUAGE'])) {
$langcode = Locale::acceptFromHttp($_SERVER['HTTP_ACCEPT_LANGUAGE']);
if(file_exists(__DIR__.'/locale/'.$langcode)) $locale = $langcode;
else if(file_exists(__DIR__.'/locale/'.explode("_",$langcode)[0])) $locale = explode("_",$langcode)[0];
else $locale = $config['App']['default_language'];
}
else $locale = $config['App']['default_language'];
if(function_exists("putenv")) {
putenv('LC_ALL='.$locale);
}
if(!setlocale(LC_ALL,$locale)) {
if(!setlocale(LC_ALL,$locale.".UTF-8")) setlocale(LC_ALL,0);
}
bindtextdomain('messages',__DIR__.'/locale');
bind_textdomain_codeset('messages','UTF-8');
textdomain('messages');
if(!function_exists('pgettext')) {
function pgettext($context,$msgid) {
$contextString = "{$context}\004{$msgid}";
$translation = _($contextString);
if($translation == $contextString) return $msgid;
else return $translation;
}
}
if(strstr($locale,"_")) $lang = explode('_',$locale)[0];
else $lang = $locale;
?>
