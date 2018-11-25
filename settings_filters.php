 <?php include ('header.php'); ?>
<main id="main">
<?php include dirname(__FILE__).('/widgets/settings_header.php'); ?>
<div class="article_wrap">
<aside class="left_column">
<?php include dirname(__FILE__).('/widgets/side_current_user.php'); ?>
<?php include dirname(__FILE__).('/widgets/side_footer.php'); ?>
</aside>
<article class="center_column">
<header class="timeline_header">
<ul class="header_items">
<li class="item toots view"><?=_('Filter settings')?></li>
</ul>
</header>
<div class="timeline">
<div style="float:left;width:50%;text-align:right;margin-top:16px">
<h3><?=_('Show replies')?></h3>
</div>
<div class="show_replies_wrap" style="float:left;width:50%">
<div class="switch">
<input type="checkbox" id="setting_show_replies">
<div class="switch-btn">
<span></span>
</div>
</div>
</div>
<div style="float:left;width:50%;text-align:right;margin-top:16px">
<h3><?=_('Show toots of bots')?></h3>
</div>
<div class="show_bots_wrap" style="float:left;width:50%">
<div class="switch">
<input type="checkbox" id="setting_show_bots">
<div class="switch-btn">
<span></span>
</div>
</div>
</div>
<div style="float:left;width:50%;text-align:right;margin-top:16px">
<h3><?=_('Add new filter')?></h3>
</div>
<div class="header_wrap" style="float:left;width:50%">
<button class="halcyon_button" id="setting_add_filter" style="width:calc(75% - 2px);margin:10px;padding:0;height:28px;position:relative">
<span style="margin:auto"><?=_('Create a filter')?></span>
</button>
</div>
<table style="width:100%;text-align:center" cellspacing="0" cellpadding="0">
<thead>
<tr>
<th style="border-bottom:1px solid #189EFC;padding-top:5px;padding-bottom:5px"><?=_('Word or phrase to filter')?></th>
<th style="border:1px solid #189EFC;border-top:0"><?=_('Filter in the following timelines')?></th>
<th style="border-bottom:1px solid #189EFC"><?=_('Expires in')?></th>
<th style="border-bottom:1px solid #189EFC;border-left:1px solid #189EFC"></th>
</tr>
</thead>
<tbody id="filterlist"></tbody>
</table>
<span style="visibility:hidden">-</span>
</div>
<footer id="js-timeline_footer" class="timeline_footer">
<i id="savestate" class="fa fa-spin fa-circle-o-notch" aria-hidden="true"></i>
</footer>
</article>
</div>
</main>
<script src="/assets/js/halcyon/halcyonSettings.js"></script>
<?php include ('footer.php'); ?>
