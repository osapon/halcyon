// mastodon javascript lib
// by @kirschn@pleasehug.me 2017
// no fucking copyright
// do whatever you want with it
// but please don't hurt it (and keep this header)
var MastodonAPI = function(config) {
var apiBase = config.instance + "/api/v1/";
return {
setConfig: function (key, value) {
config[key] = value;
},
getConfig: function(key) {
return config[key];
},
get: function (endpoint) {
var queryData,callback,queryStringAppend = "?";
if (typeof arguments[1] === "function") {
queryData = {};
callback = arguments[1];
} else {
queryData = arguments[1];
callback = arguments[2];
}
if(typeof queryData == "string") {
queryStringAppend = queryData;
}
else {
for (var i in queryData) {
if (queryData.hasOwnProperty(i)) {
if (typeof queryData[i] === "string") {
queryStringAppend += queryData[i] + "&";
} else if (typeof queryData[i] === "object") {
queryStringAppend += queryData[i].name + "="+ queryData[i].data + "&";
}
}
}
}
var xquerydata = queryData;
$.ajax({
url: apiBase + endpoint + queryStringAppend,
type: "GET",
headers: {"Authorization": "Bearer " + config.api_user_token},
success: function(data, textStatus, xhr) {
console.log("Successful GET API request to " +apiBase+endpoint);
responce_headers = xhr.getAllResponseHeaders();
callback(data,textStatus);
},
error: function(xhr, textStatus, errorThrown) {
if(xhr.readyState == 0) {
api.get(endpoint,queryStringAppend,callback);
}
else {
putMessage(`[${xhr.status}] ${xhr.responseJSON['error']}`);
if ( xhr.status === 401 ) {
location.href = "/logout";
}
}
}
});
},
getArray: function (endpoint) {
var queryData, callback,
queryStringAppend = "?";
if (typeof arguments[1] === "function") {
queryData = {};
callback = arguments[1];
} else {
queryData = arguments[1];
callback = arguments[2];
}
for (var i in queryData) {
if (queryData.hasOwnProperty(i)) {
if (typeof queryData[i] === "string") {
queryStringAppend += queryData[i] + "&";
} else if (typeof queryData[i] === "object") {
for ( var j in queryData[i].data ){
queryStringAppend += queryData[i].name + "[]="+ queryData[i].data[j] + "&";
}
}
}
}
$.ajax({
url: apiBase + endpoint + queryStringAppend,
type: "GET",
headers: {"Authorization": "Bearer " + config.api_user_token},
success: function(data, textStatus, xhr) {
console.log("Successful GET API request to " +apiBase+endpoint);
responce_headers = xhr.getAllResponseHeaders();
callback(data,textStatus);
},
error: function(xhr, textStatus, errorThrown) {
if(xhr.readyState == 0) {
api.getArray(endpoint,queryData,callback);
}
else {
putMessage(`[${xhr.status}] ${xhr.responseJSON['error']}`);
if ( xhr.status === 401 ) {
location.href = "/logout";
}
}
}
});
},
getOther: function (domainAndEndpoint) {
var queryData, callback,
queryStringAppend = "?";
if (typeof arguments[1] === "function") {
queryData = {};
callback = arguments[1];
} else {
queryData = arguments[1];
callback = arguments[2];
}
for (var i in queryData) {
if (queryData.hasOwnProperty(i)) {
if (typeof queryData[i] === "string") {
queryStringAppend += queryData[i] + "&";
} else if (typeof queryData[i] === "object") {
queryStringAppend += queryData[i].name + "="+ queryData[i].data + "&";
}
}
}
$.ajax({
url: domainAndEndpoint + queryStringAppend,
type: "GET",
success: function(data, textStatus, xhr) {
console.log("Successful GET API request to " +domainAndEndpoint);
responce_headers = xhr.getAllResponseHeaders();
callback(data,textStatus);
},
error: function(xhr, textStatus, errorThrown) {
if(xhr.readyState == 0) {
api.getOther(endpoint,queryData,callback);
}
else {
putMessage(`[${xhr.status}] ${xhr.responseJSON['error']}`);
if ( xhr.status === 401 ) {
location.href = "/logout";
}
}
}
});
},
post: function (endpoint) {
var postData, callback;
if (typeof arguments[1] === "function") {
postData = {};
callback = arguments[1];
} else {
postData = arguments[1];
callback = arguments[2];
}
var requestHeaders = {"Authorization":"Bearer "+config.api_user_token};
if(endpoint == "statuses") {
if(arguments.length == 4) {
var idempotencykey = arguments[3];
}
else {
var idempotencykey = getRandom();
}
requestHeaders["Idempotency-Key"] = idempotencykey;
}
$.ajax({
url: apiBase + endpoint,
type: "POST",
data: postData,
headers: requestHeaders,
success: function(data, textStatus) {
if(endpoint == "statuses") {
$(".js_current_toots_count").html(++localStorage.current_statuses_count);
}
else if(endpoint.indexOf("/follow") != -1) {
$(".js_current_following_count").html(++localStorage.current_following_count);
}
else if(endpoint.indexOf("/unfollow") != -1) {
$(".js_current_following_count").html(--localStorage.current_following_count);
}
console.log("Successful POST API request to " +apiBase+endpoint);
callback(data,textStatus)
},
error: function(xhr, textStatus, errorThrown) {
if(xhr.readyState == 0) {
api.post(endpoint,postData,callback,idempotencykey);
}
else {
putMessage(`[${xhr.status}] ${xhr.responseJSON['error']}`);
if ( xhr.status === 401 ) {
location.href = "/logout";
}
}
}
});
},
postMedia: function (endpoint) {
var postData, callback;
if (typeof arguments[1] === "function") {
postData = {};
callback = arguments[1];
} else {
postData = arguments[1];
callback = arguments[2];
}
$.ajax({
url: apiBase + endpoint,
type: "POST",
data: postData,
contentType: false,
processData: false,
headers: {"Authorization": "Bearer " + config.api_user_token},
success: function(data, textStatus) {
console.log("Successful POST API request to " +apiBase+endpoint);
callback(data,textStatus)
},
error: function(xhr, textStatus, errorThrown) {
if(xhr.readyState == 0) {
api.postMedia(endpoint,postData,callback);
}
else {
putMessage(`[${xhr.status}] ${xhr.responseJSON['error']}`);
if ( xhr.status === 401 ) {
location.href = "/logout";
}
}
}
});
},
delete: function (endpoint, callback) {
$.ajax({
url: apiBase + endpoint,
type: "DELETE",
headers: {"Authorization": "Bearer " + config.api_user_token},
success: function(data, textStatus) {
if(endpoint.indexOf("statuses") != -1) {
$(".js_current_toots_count").html(--localStorage.current_statuses_count);
}
console.log("Successful DELETE API request to " +apiBase+endpoint);
callback(data,textStatus)
},
error: function(xhr, textStatus, errorThrown) {
if(xhr.readyState == 0) {
api.delete(endpoint,callback);
}
else {
putMessage(`[${xhr.status}] ${xhr.responseJSON['error']}`);
if ( xhr.status === 401 ) {
location.href = "/logout";
}
}
}
});
},
stream: function (streamType, onData) {
var es = new WebSocket("wss://" + apiBase.substr(8) + "streaming?access_token=" + config.api_user_token + "&stream=" + streamType);
var listener = function (event) {
console.log("Got Data from Stream " + streamType);
event = JSON.parse(event.data);
event.payload = JSON.parse(event.payload);
onData(event);
};
es.onmessage = listener;
es.onclose = function() {
api.stream(streamType,onData);
};
}
};
};
