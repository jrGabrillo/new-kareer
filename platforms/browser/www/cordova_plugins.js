cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/cordova-plugin-facebook5/www/facebook-browser.js",
        "id": "cordova-plugin-facebook5.FacebookConnectPluginBrowser",
        "pluginId": "cordova-plugin-facebook5",
        "clobbers": [
            "facebookConnectPlugin"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-whitelist": "1.3.3",
    "cordova-plugin-facebook5": "1.9.1"
}
// BOTTOM OF METADATA
});