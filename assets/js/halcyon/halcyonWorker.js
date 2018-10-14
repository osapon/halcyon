importScripts("/assets/js/mastodon.js/mastodon.js");
function pushNotification(title,message) {
self.registration.showNotification(title, {
body: message,
icon: '/assets/images/halcyon_logo.png'  
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
case "favourite":pushNotification(__("New favourite"),userstream.payload.account.display_name+" "+__("favourited your toot"));break;
case "reblog":pushNotification(__("New boost"),userstream.payload.account.display_name+" "+__("boosted your toot"));break;
case "follow":pushNotification(__("New follower"),userstream.payload.account.display_name+" "+__("followed you"));break;
case "mention":pushNotification(__("New mention"),userstream.payload.account.display_name+" "+__("mentioned you"));break;
}
}
});
}
