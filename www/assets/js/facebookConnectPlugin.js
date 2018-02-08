"use strict";

/*
 * @author Ally Ogilvie
 * @copyright Wizcorp Inc. [ Incorporated Wizards ] 2014
 * @file - facebookConnectPlugin.js
 * @about - JavaScript interface for PhoneGap bridge to Facebook Connect SDK
 *
 *
 */
document.addEventListener("deviceready", function(){
    console.log('xxx');
    if (cordova.platformId == "browser") {

        var facebookConnectPlugin = {
            getLoginStatus: function (s, f) {
                try {
                    FB.getLoginStatus(function (response) {
                        s(response);
                    });
                } 
                catch (error) {
                    if (!f) {
                        console.error(error.message);
                    } else {
                        f(error.message);
                    }
                }
            },
            showDialog: function (options, s, f) {
                if (!options.name) {
                    options.name = "";
                }
                if (!options.message) {
                    options.message = "";
                }
                if (!options.caption) {
                    options.caption = "";
                }
                if (!options.description) {
                    options.description = "";
                }
                if (!options.href) {
                    options.href = "";
                }
                if (!options.picture) {
                    options.picture = "";
                }

                try {
                    FB.ui(options,
                    function (response) {
                        if (response && (response.request || !response.error_code)) {
                            s(response);
                        } else {
                            f(response);
                        }
                    });
                } catch (error) {
                    if (!f) {
                        console.error(error.message);
                    } else {
                        f(error.message);
                    }
                }
            },
            login: function (permissions, s, f) {
                var permissionObj = {};
                if (permissions && permissions.length > 0) {
                    permissionObj.scope = permissions.toString();
                }
                FB.login(function (response) {
                    if (response.authResponse) {
                        s(response);
                    } else {
                        f(response.status);
                    }
                }, permissionObj);
            },
            getAccessToken: function (s, f) {
                var response = FB.getAccessToken();
                if (!response) {
                    if (!f) {
                        console.error("NO_TOKEN");
                    } else {
                        f("NO_TOKEN");
                    }
                } else {
                    s(response);
                }
            },
            logEvent: function (eventName, params, valueToSum, s, f) {
                s();
            },
            logPurchase: function (value, currency, s, f) {
                s();
            },
            logout: function (s, f) {
                try {
                    FB.logout( function (response) {
                        s(response);
                    });
                } catch (error) {
                    if (!f) {
                        console.error(error.message);
                    } else {
                        f(error.message);
                    }
                }
            },
            api: function (graphPath, permissions, s, f) {
                try {
                    FB.api(graphPath, function (response) {
                        if (response.error) {
                            f(response);
                        } else {
                            s(response);
                        }
                    });
                } 
                catch (error) {
                    if (!f) {
                        console.error(error.message);
                    } else {
                        f(error.message);
                    }
                }
            },
            browserInit: function (appId, version) {
                if (!version) {
                    version = "v2.0";
                }
                FB.init({
                    appId      : appId,
                    cookie     : true,
                    xfbml      : true,
                    version    : version
                });
            }
        };
            
        (function () {
            if (!window.FB) {
                console.log("launching FB SDK");
                var e = document.createElement('script');
                e.src = document.location.protocol + '//connect.facebook.net/en_US/sdk.js';
                e.async = true;
                document.getElementById('fb-root').appendChild(e);
                if (!window.FB) {
                    // e.src = 'phonegap/plugin/facebookConnectPlugin/fbsdk.js';
                    e.src = 'https://connect.facebook.net/en_US/all.js';
                    document.getElementById('fb-root').appendChild(e);
                    console.log("Attempt local load: ", e);
                }
            }
        }());
        return facebookConnectPlugin;
    } 
    else {
        var exec = require("cordova/exec");
        var facebookConnectPlugin = {
            getLoginStatus: function (s, f) {
                exec(s, f, "FacebookConnectPlugin", "getLoginStatus", []);
            },
            showDialog: function (options, s, f) {
                exec(s, f, "FacebookConnectPlugin", "showDialog", [options]);
            },
            login: function (permissions, s, f) {
                exec(s, f, "FacebookConnectPlugin", "login", permissions);
            },
            logEvent: function(name, params, valueToSum, s, f) {
                if (!params && !valueToSum) {
                    exec(s, f, "FacebookConnectPlugin", "logEvent", [name]);
                } 
                else if (params && !valueToSum) {
                    exec(s, f, "FacebookConnectPlugin", "logEvent", [name, params]);
                } 
                else if (params && valueToSum) {
                    exec(s, f, "FacebookConnectPlugin", "logEvent", [name, params, valueToSum]);
                } 
                else {
                    f("Invalid arguments");
                }
            },
            logPurchase: function(value, currency, s, f) {
                exec(s, f, "FacebookConnectPlugin", "logPurchase", [value, currency]);
            },
            getAccessToken: function(s, f) {
                exec(s, f, "FacebookConnectPlugin", "getAccessToken", []);
            },
            logout: function (s, f) {
                exec(s, f, "FacebookConnectPlugin", "logout", []);
            },
            api: function (graphPath, permissions, s, f) {
                if (!permissions) { permissions = []; }
                exec(s, f, "FacebookConnectPlugin", "graphApi", [graphPath, permissions]);
            }
        };
        return facebookConnectPlugin;
    }
}, false);