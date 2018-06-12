<script src="//cdn.jsdelivr.net/npm/jquery@3.3.1/dist/jquery.min.js"></script>
<script src="/assets/js/jquery-cookie/src/jquery.cookie.js"></script>
<script>
localStorage.setItem('current_id', '');
localStorage.setItem('current_instance', '');
localStorage.setItem('current_authtoken', '');
$.removeCookie('session');
location.href="/login";
</script>
