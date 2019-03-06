<?php include ('header.php'); ?>
<main id="main">
<div class="article_wrap">
<aside class="left_column">
<?php include dirname(__FILE__).('/widgets/side_current_user.php'); ?>
<?php include dirname(__FILE__).('/widgets/side_footer.php'); ?>
</aside>
<article class="center_column">
<header class="timeline_header">
<ul class="header_items">
<li class="item toots view" id="instance_title"></li>
</ul>
</header>
<div class="timeline">
<div id="instance_description" style="margin:10px"></div>
<img id="instance_thumbnail" style="width:100%">
<div id="instance_information" style="margin:10px">
<div id="js-follows_profile" style="width:290px;float:left">
<div style="width:100%">
<center style="margin:5px"><?=_("Administrated by")?></center>
</div>
</div>
<div style="float:left;width:calc(100% - 290px)">
<div style="width:32%;float:left;margin-right:6px">
<center style="margin:5px"><?=_("Users")?></center>
<div class="instance_field" id="instance_users"></div>
</div>
<div style="width:32%;float:left;margin-right:6px">
<center style="margin:5px"><?=_("Toots")?></center>
<div class="instance_field" id="instance_posts"></div>
</div>
<div style="width:32%;float:left">
<center style="margin:5px"><?=_("Connections")?></center>
<div class="instance_field" id="instance_domains"></div>
</div>
</div>
<div style="float:left;width:calc(100% - 290px)">
<div style="width:32%;float:left;margin-right:6px">
<center style="margin:5px"><?=_("Version")?></center>
<div class="instance_field" id="instance_version"></div>
</div>
<div style="width:calc(66% - 5px);float:left">
<center style="margin:5px"><?=_("Contact")?></center>
<div class="instance_field" style="padding-top:21px;padding-bottom:22px">
<i class="fa fa-envelope"></i>
<div style="margin-top:-20px">
<a id="instance_contact" style="font-size:16px"></a>
</div>
</div>
</div>
</div>
<span style="visibility:hidden">-</span>
</div>
</div>
<footer id="js-timeline_footer" class="timeline_footer">
<i id="savestate" class="fa fa-spin fa-circle-o-notch" aria-hidden="true"></i>
</footer>
</article>
</div>
</main>
<script>
setInstance();
$('title').text('Halcyon / Instance');
</script>
<?php include ('footer.php'); ?>
