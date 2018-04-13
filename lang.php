<?php
  $config = parse_ini_file(__DIR__.'/config.ini',true);
  $locale = Locale::acceptFromHttp($_SERVER['HTTP_ACCEPT_LANGUAGE']);
  if (!file_exists(__DIR__.'/'.$locale)) {
    $locale = $config['App']['default_lang'];
  }
  putenv('LC_ALL='.$locale);
  if (!setlocale(LC_ALL, $locale)) setlocale(LC_ALL, '0');
  bindtextdomain('messages', __DIR__.'/lang');
  bind_textdomain_codeset('messages', 'UTF-8');
  textdomain('messages');
  if (!function_exists('pgettext')) {
    function pgettext($context, $msgid) {
      $contextString = "{$context}\004{$msgid}";
      $translation = _($contextString);
      if ($translation == $contextString) return $msgid;
      else return $translation;
    }
  }
