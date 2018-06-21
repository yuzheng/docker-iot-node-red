module.exports = function(RED) {
    function CHTRestful(config) {
        RED.nodes.createNode(this,config);
        var node = this;

        node.on('input', function(msg) {
            var resource = "/v1/device/4411709975/sensor/Temp/rawdata";
            var APIkey = "DKCG24ZHUSHAZYGHYF";
            var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
            var xmlHttp = new XMLHttpRequest();

            xmlHttp.open( "GET", "https://iot.cht.com.tw/iot" + resource, false ); // false for synchronous request
            xmlHttp.setRequestHeader("Accept", "application/json");
            xmlHttp.setRequestHeader( "CK", APIkey);
            xmlHttp.send( null );
            var rep1= JSON.parse(xmlHttp.responseText);

            var outMsg = {payload: rep1};
            node.send(outMsg);
        });
    }
    RED.nodes.registerType("Restful",CHTRestful);
}
