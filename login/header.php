<?php include("../language.php") ?>
<!DOCTYPE HTML>
<html lang="en">
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
</head>
<body>
<header id="header">
<div id="header_wrap">
<div id="header_title_wrap" class="header_box header_right_box">
<div class="header_box_child title_box">
<a href="/">
<img src="/login/assets/images/halcyon-title.png" alt="Halcyon">
</a>
</div>
</div>
<div id="header_menu_wrap" class="header_box header_left_box">
<nav class="header_box_child nav_box">
<ul>
<a href="https://www.halcyon.social" class="no-underline">
<li>
<span><i class="fa fa-home" aria-hidden="true"></i><?=_('Website')?></span>
</li>
</a>
<a href="https://social.csswg.org/@halcyon" class="no-underline">
<li>
<span><i class="fa fa-newspaper-o" aria-hidden="true"></i><?=_('News')?></span>
</li>
</a>
<a href="https://notabug.org/halcyon-suite/halcyon" class="no-underline">
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
<a href="https://www.nikisoft.one/contact.php" class="no-underline">
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
