<?php
include("header.php");
$config = parse_ini_file('../config/config.ini',true);
?>
<main id="main">
<article id="article">
<h2><?=_('Halcyon Terms of Use')?></h2>
<p class="description"><?=_('This terms of use agreement is for the users of web service Halcyon for Mastodon and Pleroma (Halcyon for short) hosted at')?> <a href="<?php echo $config["App"]["api_client_website"] ?>"><?php echo $config["App"]["api_client_website"] ?></a>.</p><br/>
<?php echo file_get_contents("../config/terms.txt") ?>
</article>
</main>
<?php include("footer.php") ?>
