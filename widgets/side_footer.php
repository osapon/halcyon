<footer class="side_widgets_footer side_widget"><ul>
<li><?=_('Halcyon for')?> <a href="https://github.com/tootsuite/mastodon">Mastodon</a> <?=_('and')?> <a href="https://git.pleroma.social/pleroma/pleroma">Pleroma</a></li>
<li><a href="/instance"><?=_('About')?></a></li>
<li><a class="footer_widget_terms"><?=_('Terms')?></a></li>
<li><a href="https://github.com/tootsuite/documentation/blob/master/Using-Mastodon/Apps.md"><?=_('Apps')?></a></li>
<li><a href="https://notabug.org/halcyon-suite/halcyon"><?=_('Source code')?></a></li>
<li><a href="https://instances.social"><?=_('Other instances')?></a></li>
<li><a href="/privacy"><?=_('Privacy policy')?></a></li>
<?php
if(file_exists("config/imprint.txt")) {
echo "<li><a href='/imprint'>"._("Imprint")."</a></li>";
}
if(file_exists("config/footerlinks.txt")) {
$footerlinks = json_decode(file_get_contents("config/footerlinks.txt"));
for($i=0;$i<count($footerlinks);$i++) {
if($footerlinks[$i]->login == true) {
echo "<li><a href='".$footerlinks[$i]->link."'>".$footerlinks[$i]->title."</a></li>";
}
}
}
?>
<li><?=_('Version')?> <?php echo file_get_contents("version.txt") ?></li>
</ul>
</footer>
<img style="display:block;margin:16px auto;width: 30%;opacity: .3;" src="/assets/images/halcyon.png">
