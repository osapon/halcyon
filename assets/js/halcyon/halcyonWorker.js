importScripts("/assets/js/mastodon.js/mastodon.js");
function pushNotification(param) {
  self.registration.showNotification(param.title, {
    body: param.message,
    icon: (param.icon?param.icon:'/assets/images/halcyon_logo.png')
  });
}
function __(msg) {return translation[msg]}
onmessage = function(msg) {
translation = msg.data.translation;
api = new MastodonAPI({
instance:'https://'+msg.data.instance,
api_user_token:msg.data.authtoken
});
api.stream("user", function(userstream) {
if(userstream.event === "notification") {
if(userstream.payload.account.display_name.length == 0) {
userstream.payload.account.display_name = userstream.payload.account.username;
}
switch(userstream.payload.type) {
  case "favourite":
    title = Pomo.getText('favourited your toot').replace('${name}', userstream.payload.account.display_name);
    pushNotification({
      title: title,
      message: $('<p>').html(userstream.payload.status.content).text(),
      icon: userstream.payload.account.avatar_static
    });
    break;
  case "reblog":
    title = Pomo.getText('boosted your toot').replace('${name}', userstream.payload.account.display_name);
    pushNotification({
      title: title,
      message: $('<p>').html(userstream.payload.status.content).text(),
      icon: userstream.payload.account.avatar_static
    });
    break;
  case "follow":
    title = Pomo.getText('followed your account').replace('${name}', userstream.payload.account.display_name);
    pushNotification({
      title: title,
      message: '',
      icon: userstream.payload.account.avatar_static
    });
    $(".js_current_followers_count").html(++localStorage.current_followers_count);
    break;
  case "mention":
    title = Pomo.getText('mentioned you').replace('${name}', userstream.payload.account.display_name);
    pushNotification({
      title: title,
      message: $('<p>').html(userstream.payload.status.content).text(),
      icon: userstream.payload.account.avatar_static
    });
    break;
}
}
});
}
