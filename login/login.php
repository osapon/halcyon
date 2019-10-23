<?php
require_once(__DIR__.'/../lang.php');
require_once('../authorize/mastodon.php');
use HalcyonSuite\HalcyonForMastodon\Mastodon;
if (isset($_POST['acct'])) {
$domain = explode("@", mb_strtolower(htmlspecialchars((string)filter_input(INPUT_POST, 'acct'), ENT_QUOTES)))[2];
$URL= 'https://'.$domain;
$api= new Mastodon();
if ( !preg_match('/(^[a-z0-9\-\.\/]+?\.[a-z0-9-]+$)/', $domain) ) {
header('Location: '.$api->clientWebsite.'/login?cause=domain', true, 303);
die();
} else {
try {
$client_id = $api->getInstance($URL)["client_id"];
$authorizeURL= $URL.'/oauth/authorize?client_id='.$client_id.'&response_type=code&scope=read+write+follow&redirect_uri='.urlencode($api->clientWebsite.'/auth?&host='.$domain);
header("Location: {$authorizeURL}", true, 303);
die();
} catch (Exception $e) {
header('Location: '.$api->clientWebsite.'/login?cause=domain', true, 303);
die();
}
}
}
include("../language.php");
?>
<!DOCTYPE HTML>
<html lang="<?=$lang?>">
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Halcyon</title>
<link rel="shortcut icon" href="/assets/images/favicon.ico">
<link rel="stylesheet" href="/login/assets/css/style.css" media="all">
<link rel="stylesheet" href="/assets/css/fontawesome.min.css" media="all">
<link rel="stylesheet" href="/assets/css/cookieconsent.min.css">
<script src="/assets/js/jquery/jquery.min.js"></script>
<script src="/assets/js/cookieconsent/cookieconsent.min.js"></script>
<script src="/assets/js/jquery-cookie/src/jquery.cookie.js"></script>
<script src="/login/assets/js/halcyon_login.js"></script>
<script>
if(
localStorage.getItem("current_id") |
localStorage.getItem("current_instance") |
localStorage.getItem("current_authtoken")
){
location.href = "/";
};
</script>
</head>
<body>
<header id="header">
<div id="header_wrap">
<div id="header_title_wrap" class="header_box header_right_box">
<div class="header_box_child title_box">
<a href="/">
<img src="/login/assets/images/halcyon-title.png" alt="Halcyon for mastodon">
</a>
</div>
</div>
<div id="header_menu_wrap" class="header_box header_left_box">
<nav class="header_box_child nav_box">
<ul>
<a href="<?=$config['App']['news_link']?>" class="no-underline">
<li>
<span><i class="fa fa-newspaper-o" aria-hidden="true"></i><?=_('News')?></span>
</li>
</a>
<a href="<?=$config['App']['source_link']?>" class="no-underline">
<li>
<span><i class="fa fa-code" aria-hidden="true"></i><?=_('Source')?></span>
</li>
</a>
<a href="/terms" class="no-underline">
<li>
<span><i class="fa fa-balance-scale" aria-hidden="true"></i><?=_('Terms')?></span>
</li>
</a>
<a href="/privacy" class="no-underline">
<li>
<span><i class="fa fa-shield" aria-hidden="true"></i><?=_('Privacy')?></span>
</li>
</a>
<?php if(file_exists("../config/imprint.txt")) { ?>
<a href="/imprint" class="no-underline">
<li>
<span><i class="fa fa-id-card-o" aria-hidden="true"></i><?=_('Imprint')?></span>
</li>
</a>
<?php } ?>
<a href="http://www.nikisoft.one/contact.php" class="no-underline">
<li>
<span><i class="fa fa-envelope" aria-hidden="true"></i><?=_('Contact')?></span>
</li>
</a>
<a href="#login_form_wrap" class="no-underline">
<li>
<span><i class="fa fa-user-circle-o" aria-hidden="true"></i><?=_('Login')?></span>
</li>
</a>
</ul>
</nav>
</div>
</div>
</header>
<main id="main">
<div id="login_form_wrap">

<div style="background-color:#FFF; color:red; width:50%;margin:24px auto;">2020年1月末で、halcyon.osa-p.netでの提供を終了します。引き続きHalcyonを利用したい方は、<a href="https://www.halcyon.social/instances.php" style="font-weight:bold; text-decoration:underline;">本家の提供リスト</a>から他のサーバーを探してください。日本の国旗が表示されているサーバなら日本語表示が可能です。</div>

<div class="login_form">
<form method="POST" >
<h2><?=_('Login to Halcyon')?></h2>
<p>
<?=_('or')?> <a href="https://joinmastodon.org/"><?=_('create an account')?></a>
</p>
<div class="session_aleart">
<span></span>
</div>
<div class="login_form_main">
<input name="acct" type="text" class="login_form_input" placeholder="@johndoe@example.com" required>
<label class="login_form_continue pointer">
<i class="fa fa-chevron-circle-right" aria-hidden="true"></i>
<input id="login_continue" type="submit" value="" class="invisible"></input>
</label>
</div>
<div class="login_form_agree">
<input id="agree" type="checkbox" required checked>
<label for="agree" class="login_form_agree_check disallow_select pointer">
<?=_('I agree with the')?> <a href="/terms"><?=_('Terms')?></a>
</label>
</div>
</form>
</div>
</div>
<article id="article">
<h2><?=_('What is Halcyon')?></h2>
<p>
<?=_('Halcyon is a webclient for')?><a href="https://joinmastodon.org"> Mastodon </a><?=_('and')?><a href="https://pleroma.social"> Pleroma </a><?=_('which aims to recreate the simple and beautiful user interface of Twitter while keeping all advantages of decentral networks in focus.')?>
</p>
<div class="image_wrap">
<ul>
<li><img src="/login/assets/images/preview3.png" alt="halcyon_screenshot"/></li>
<li><img src="/login/assets/images/preview2.png" alt="halcyon_screenshot"/></li>
<li><img src="/login/assets/images/preview1.png" alt="halcyon_screenshot"/></li>
<li><img src="/login/assets/images/preview0.png" alt="halcyon_screenshot"/></li>
</ul>
<button class="prev_button switch_button"><i class="fa fa-angle-left" aria-hidden="true"></i></button>
<button class="next_button switch_button"><i class="fa fa-angle-right" aria-hidden="true"></i></button>
</div>
<h2><?=_('Contact / Feedback')?></h2>
<p>
Mastodon: <a href="<?=$config['App']['contact_link']?>" target="_blank"><?=$config['App']['contact_link']?></a><br />
Github: <a href="<?=$config['App']['source_link']?>" target="_blank"><?=$config['App']['source_link']?></a>
</p>
<h2>このサーバのHalcyonは機能追加されています</h2>
<p>
<ul style="list-style:inside;">
<li>Input history, Zero-width space addition function added pictogram input.（入力履歴・ゼロ幅スペース追加機能付き絵文字入力）</li>
<li>Draft（下書き機能）</li>
<li>Fix images are missing with multiple images toots.（複数枚画像の投稿不具合修正）</li>
<li>Image size reduction function of timeline.（タイムラインの画像サイズ縮小）</li>
<li>Sensitive image can switched for show / hide.（画像の非表示化）</li>
<li>Notification tab is split(All / Reply / Follow / Boost &amp; Fav / Direct).（通知タブの分類分け）</li>
<li>Only voting, posting of votes is not supported.（投票だけ、投票の投稿は未対応）</li>
</ul>
</p>
</article>
</main>
<!-- FOOTER -->
<footer id="footer">
<div class="footer_anchor">
<a href="#">
<i class="fa fa-angle-up" aria-hidden="true"></i>
</a>
</div>
<span>Photo by <a href="https://www.flickr.com/photos/95387826@N08/">Michio Morimoto on Flickr</a> (CC BY 2.0)</span><br/>
<?php
if(file_exists("../config/footerlinks.txt")) {
$footerlinks = json_decode(file_get_contents("../config/footerlinks.txt"));
$haslinks = false;
for($i=0;$i<count($footerlinks);$i++) {
if($footerlinks[$i]->logout == true) {
if($haslinks == false) {
$haslinks = true;
echo "<span>";
}
else {
echo " | ";
}
echo "<a href='".$footerlinks[$i]->link."'>".$footerlinks[$i]->title."</a>";
}
}
if($haslinks == true) {
echo "</span><br/>";
}
}
?>
<span>Halcyon version <?php echo file_get_contents("../version.txt") ?></span>
</footer>
</body>
<script>
window.cookieconsent.initialise({
"palette": {
"popup": {
"background": "#000"
},
"button": {
"background": "#f1d600"
}
},
"theme": "classic",
"position": "bottom"
});
</script>
<?php if (isset($_GET['cause'])): ?>
<script>
$(function() {
var cause = "<?= htmlspecialchars((string)filter_input(INPUT_GET, 'cause'), ENT_QUOTES) ?>";
if(cause === "domain") {
$('.login_form_main').addClass('error');
$('.session_aleart').removeClass('invisible');
$('.session_aleart > span').text('This instance does not exist.');
}
});
$(document).on('click','.login_form_main', function(e) {
$(this).removeClass('error');
});
</script>
<?php endif; ?>
</html>
