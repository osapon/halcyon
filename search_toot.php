<?php include ('header.php'); ?>
<main id="main">
<?php include dirname(__FILE__).('/widgets/search_header.php'); ?>
<div class="article_wrap">
<aside class="left_column">
<?php include dirname(__FILE__).('/widgets/side_who_to_follow.php'); ?>
<?php include dirname(__FILE__).('/widgets/side_footer.php'); ?>
</aside>
<article class="center_column">
<div id="js-stream_update">
<button>
<?=_('View new Toots')?>
</button>
</div>
<div id="js-hashtag">
</div>
<ul id="js-timeline" class="timeline">
</ul>
<div id="js-follows_profile">
</div>
</article>
<aside class="right_column"></aside>
</div>
</main>
<script>
  current_file = location.pathname;
  <?php if (isset($_GET['q'])): ?>
  $(function() {
    const query = "<?= htmlspecialchars((string)filter_input(INPUT_GET, 'q'), ENT_QUOTES) ?>";
    $('#js-search_title_box > h1').text(query);
    $('title').text(query+' - Halcyon Search');
    $('#js-search_nav_toots').toggleClass('view');
    $('#js-search_nav_toots a ').attr('href','/search'+location.search);
    $('#js-search_nav_hashtag a ').attr('href','/search/tag'+location.search);
    $('#js-search_nav_peoples a ').attr('href','/search/users'+location.search)
    api.get('search', [{name:'q', data:query},{name:'resolve', data:1}], function(search){
      if (search.accounts) {
        for(let i in search.accounts) {
          follows_template(search.accounts[i]).appendTo("#js-follows_profile");;
        }
      }
      if (search.hashtags) {
        let hashtags = search.hashtags;
        for ( let i in hashtags ) {
          hashtag_template(hashtags[i]).appendTo("#js-hashtag");
        };
      }
      if (search.statuses) {
        let statuses = search.statuses;
        for ( let i in statuses ) {
          timeline_template(statuses[i]).appendTo("#js-timeline");
        };
      }
      replaceInternalLink();
      replace_emoji();
    });
  });
  <?php endif; ?>
</script>
<?php include ('footer.php'); ?>
