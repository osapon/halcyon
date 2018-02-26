// mastodon javascript lib
// by @kirschn@pleasehug.me 2017
// no fucking copyright
// do whatever you want with it
// but please don't hurt it (and keep this header)

var MastodonAPI = function(config) {
    var apiBase = config.instance + "/api/v1/";
    return {
        setConfig: function (key, value) {
            // modify initial config afterwards
            config[key] = value;
        },
        getConfig: function(key) {
            //get config key
            return config[key];
        },
        get: function (endpoint) {
            // for GET API calls
            // can be called with two or three parameters
            // endpoint, callback
            // or
            // endpoint, queryData, callback
            // where querydata is an object {["paramname1", "paramvalue1], ["paramname2","paramvalue2"]}

            // variables
            var queryData, callback,
                queryStringAppend = "?";

            // check with which arguments we're supplied
            if (typeof arguments[1] === "function") {
                queryData = {};
                callback = arguments[1];
            } else {
                queryData = arguments[1];
                callback = arguments[2];
            }
            // build queryData Object into a URL Query String
            for (var i in queryData) {
                if (queryData.hasOwnProperty(i)) {
                    if (typeof queryData[i] === "string") {
                        queryStringAppend += queryData[i] + "&";
                    } else if (typeof queryData[i] === "object") {
                        queryStringAppend += queryData[i].name + "="+ queryData[i].data + "&";
                    }
                }
            }
            // ajax function
            $.ajax({
                url: apiBase + endpoint + queryStringAppend,
                type: "GET",
                headers: {"Authorization": "Bearer " + config.api_user_token},
                success: function(data, textStatus, xhr) {

                    //weeey it was successful
                    console.log("Successful GET API request to " +apiBase+endpoint);
                    responce_headers = xhr.getAllResponseHeaders();

                    //aaand start the callback
                    //might have to check what "textStatus" actually is, jquery docs are a bit dodgy
                    callback(data,textStatus);
                },
                error: function(xhr, textStatus, errorThrown) {
                  putMessage(`[${xhr.status}] ${xhr.responseJSON['error']}`);
                  if ( xhr.status === 401 ) {
                    location.href = "/logout"
                  }
                }
            });
        },
        getArray: function (endpoint) {
            // for GET API calls
            // can be called with two or three parameters
            // endpoint, callback
            // or
            // endpoint, queryData, callback
            // where querydata is an object {["paramname1", "paramvalue1], ["paramname2","paramvalue2"]}

            // variables
            var queryData, callback,
                queryStringAppend = "?";

            // check with which arguments we're supplied
            if (typeof arguments[1] === "function") {
                queryData = {};
                callback = arguments[1];
            } else {
                queryData = arguments[1];
                callback = arguments[2];
            }
            // build queryData Object into a URL Query String
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
            // ajax function
            $.ajax({
                url: apiBase + endpoint + queryStringAppend,
                type: "GET",
                headers: {"Authorization": "Bearer " + config.api_user_token},
                success: function(data, textStatus, xhr) {

                    //weeey it was successful
                    console.log("Successful GET API request to " +apiBase+endpoint);
                    responce_headers = xhr.getAllResponseHeaders();

                    //aaand start the callback
                    //might have to check what "textStatus" actually is, jquery docs are a bit dodgy
                    callback(data,textStatus);
                },
                error: function(xhr, textStatus, errorThrown) {
                  putMessage(`[${xhr.status}] ${xhr.responseJSON['error']}`);
                  if ( xhr.status === 401 ) {
                    location.href = "/logout"
                  }
                }
            });
        },
        getOther: function (domainAndEndpoint) {

            var queryData, callback,
                queryStringAppend = "?";

            // check with which arguments we're supplied
            if (typeof arguments[1] === "function") {
                queryData = {};
                callback = arguments[1];
            } else {
                queryData = arguments[1];
                callback = arguments[2];
            }
            // build queryData Object into a URL Query String
            for (var i in queryData) {
                if (queryData.hasOwnProperty(i)) {
                    if (typeof queryData[i] === "string") {
                        queryStringAppend += queryData[i] + "&";
                    } else if (typeof queryData[i] === "object") {
                        queryStringAppend += queryData[i].name + "="+ queryData[i].data + "&";
                    }
                }
            }
            // ajax function
            $.ajax({
                url: domainAndEndpoint + queryStringAppend,
                type: "GET",
                success: function(data, textStatus, xhr) {

                    //weeey it was successful
                    console.log("Successful GET API request to " +domainAndEndpoint);
                    responce_headers = xhr.getAllResponseHeaders();

                    //aaand start the callback
                    //might have to check what "textStatus" actually is, jquery docs are a bit dodgy
                    callback(data,textStatus);
                },
                error: function(xhr, textStatus, errorThrown) {
                  putMessage(`[${xhr.status}] ${xhr.responseJSON['error']}`);
                  if ( xhr.status === 401 ) {
                    location.href = "/logout"
                  }
                }
            });
        },
        post: function (endpoint) {
            // for POST API calls
            var postData, callback;
            // check with which arguments we're supplied
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
                headers: {"Authorization": "Bearer " + config.api_user_token},
                success: function(data, textStatus) {
                    console.log("Successful POST API request to " +apiBase+endpoint);
                    callback(data,textStatus)
                },
                error: function(xhr, textStatus, errorThrown) {
                    putMessage(`[${xhr.status}] ${xhr.responseJSON['error']}`);
                    if ( xhr.status === 401 ) {
                      location.href = "/logout"
                    }
                }
            });
        },
        postMedia: function (endpoint) {

            // for POST API calls
            var postData, callback;
            // check with which arguments we're supplied
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
                  putMessage(`[${xhr.status}] ${xhr.responseJSON['error']}`);
                  if ( xhr.status === 401 ) {
                    location.href = "/logout"
                  }
                }
            });

        },
        delete: function (endpoint, callback) {
            // for DELETE API calls.
            $.ajax({
                url: apiBase + endpoint,
                type: "DELETE",
                headers: {"Authorization": "Bearer " + config.api_user_token},
                success: function(data, textStatus) {
                    console.log("Successful DELETE API request to " +apiBase+endpoint);
                    callback(data,textStatus)
                },
                error: function(xhr, textStatus, errorThrown) {
                  putMessage(`[${xhr.status}] ${xhr.responseJSON['error']}`);
                  if ( xhr.status === 401 ) {
                    location.href = "/logout"
                  }
                }
            });
        },
        stream: function (streamType, onData) {
            // Event Stream Support
            // websocket streaming is undocumented. i had to reverse engineer the fucking web client.
            // streamType is either
            // user for your local home TL and notifications
            // public for your federated TL
            // public:local for your home TL
            // hashtag&tag=fuckdonaldtrump for the stream of #fuckdonaldtrump
            // callback gets called whenever new data ist recieved
            // callback { event: (eventtype), payload: {mastodon object as described in the api docs} }
            // eventtype could be notification (=notification) or update (= new toot in TL)
            var es = new WebSocket("wss://" + apiBase.substr(8)
                +"streaming?access_token=" + config.api_user_token + "&stream=" + streamType);
            var listener = function (event) {
                console.log("Got Data from Stream " + streamType);
                event = JSON.parse(event.data);
                event.payload = JSON.parse(event.payload);
                onData(event);
            };
            es.onmessage = listener;


        }
    };
};

// node.js
if (typeof module !== 'undefined') { module.exports = MastodonAPI; };
