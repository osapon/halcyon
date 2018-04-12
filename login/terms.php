<?php
require_once('../lang.php');
?><!DOCTYPE HTML>
<html lang="en">
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Halcyon for Mastodon</title>
<link rel="shortcut icon" href="/assets/images/favicon.ico">
<link rel="stylesheet" href="/login/assets/css/style.css" media="all">
<link rel="stylesheet" href="//cdn.staticfile.org/font-awesome/4.7.0/css/font-awesome.min.css" media="all">
<link rel="stylesheet" href="//cdn.staticfile.org/cookieconsent2/3.0.4/cookieconsent.min.css">
<script src="//yastatic.net/jquery/3.2.1/jquery.min.js"></script>
<script src="//cdn.staticfile.org/cookieconsent2/3.0.4/cookieconsent.min.js"></script>
<script src="/assets/js/jquery-cookie/src/jquery.cookie.js"></script>
<script src="/login/assets/js/halcyon_login.js"></script>
</head>
<body>
<header id="header">
<div id="header_wrap">
<div id="header_title_wrap" class="header_box header_right_box">
<div class="header_box_child title_box">
<a href="/">
<img src="/login/assets/images/halcyon-title.png" alt="Halcyon for mastodon"/>
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
<a class="no-underline">
<li>
<span><i class="fa fa-balance-scale" aria-hidden="true"></i><?=_('Terms')?></span>
</li>
</a>
<a href="<?=$config['App']['contact_link']?>" class="no-underline">
<li>
<span><i class="fa fa-envelope" aria-hidden="true"></i><?=_('Contact')?></span>
</li>
</a>
<a href="/login/#login_form_wrap" class="no-underline">
<li>
<span><i class="fa fa-user-circle-o" aria-hidden="true"></i><?=_('Login')?></span>
</li>
</a>
</ul>
</nav>
</div>
</div>
</header>
<?php $config = parse_ini_file('../config.ini',true) ?>
<main id="main">
<article id="article">
<h2><?=_('Halcyon Terms of Use')?></h2>
<p class="description"><?=_('This terms of use agreement is for the users of web service Halcyon for Mastodon (Halcyon for short) hosted at')?> <a href="<?php echo $config["App"]["api_client_website"] ?>"><?php echo $config["App"]["api_client_website"] ?></a>.</p><br/>
<?php echo file_get_contents("../terms.txt") ?>
</article>
</main>
<footer id="footer">
<div class="footer_anchor">
<a href="#">
<i class="fa fa-angle-up" aria-hidden="true"></i>
</a>
</div>
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
</html>
