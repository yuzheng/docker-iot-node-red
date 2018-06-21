module.exports = function(RED) {
    "use strict";
    function Device_Sensor(config) {
        RED.nodes.createNode(this,config);
        this.resource = config.resource;
        this.APIkey = config.APIkey;
        this.operation = config.operation;
        var node = this;
        node.on('input', function(msg) {
            // var APIkey = "DKCG24ZHUSHAZYGHYF";
            var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
            var xmlHttp = new XMLHttpRequest();

            xmlHttp.open( node.operation, "https://iot.cht.com.tw/iot" + node.resource, false ); // false for synchronous request
            xmlHttp.setRequestHeader("Accept", "application/json");
            xmlHttp.setRequestHeader( "CK", node.APIkey);
            xmlHttp.send( null );
            var rep1= JSON.parse(xmlHttp.responseText);

            var outMsg = {payload: rep1};
            node.send(outMsg);
        });
    }
    RED.nodes.registerType("Device_Sensor",Device_Sensor);
}
