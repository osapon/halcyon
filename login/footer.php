<footer id="footer">
<div class="footer_anchor">
<a href="#">
<i class="fa fa-angle-up" aria-hidden="true"></i>
</a>
</div>
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
</html>
