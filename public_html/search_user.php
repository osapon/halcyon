<?php include ('header.php'); ?>

<!-- MAIN -->
<main id="main">

    <?php include dirname(__FILE__).('/widgets/search_header.php'); ?>

    <div class="article_wrap">

        <aside class="left_column">

            <?php include dirname(__FILE__).('/widgets/side_who_to_follow.php'); ?>
            <?php include dirname(__FILE__).('/widgets/side_footer.php'); ?>

        </aside>

        <article class="center_column">

          <div id="js-follows_profile">

          </div>

          <footer id="js-follows_footer">
            <i class="fa fa-spin fa-circle-o-notch" aria-hidden="true"></i>
          </footer>

        </article>

    </div>

</main>

<script>

  // namespace
  current_file = location.pathname;

  <?php if(isset($_GET['q'])): ?>
    const query = "<?= htmlspecialchars((string)filter_input(INPUT_GET, 'q'), ENT_QUOTES) ?>";
    $('title').text(query+' - Halcyon Search');
    $('#js-search_title_box > h1').text(query);
    $('#js-search_nav_peoples').toggleClass('view');
    $('#js-search_nav_toots a ').attr('href','/search'+location.search);
    $('#js-search_nav_peoples a ').attr('href','/search/users'+location.search);
    setUserSearch(query);

  <?php endif; ?>

</script>

<?php include ('footer.php'); ?>