<?php
include("header.php");
$config = parse_ini_file('../config.ini',true);
?>
<main id="main">
<article id="article">
<h2><?=_('Imprint')?></h2>
<?php
if(file_exists("../config/imprint.txt")) {
$imprint = explode("\n",file_get_contents("../config/imprint.txt"));
$imprint[0] = "<b>".$imprint[0]."</b>";
$imprint = implode("\n",$imprint);
echo nl2br($imprint);
}
else {
echo _("Imprint not set!");
}
?>
</article>
</main>
<?php include("footer.php") ?>
