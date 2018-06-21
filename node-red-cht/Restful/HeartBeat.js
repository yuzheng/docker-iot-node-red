module.exports = function(RED) {
    "use strict";
    var iot_url = "iot.cht.com.tw";
    function HeartBeat(config) {
        RED.nodes.createNode(this,config);
        /// Load configurations
        this.name = config.name;
        this.APIkey = config.APIkey;
        this.operation = config.operation;
        this.device_id = config.device_id;
        this.pulse = config.pulse;
        var node = this;
        node.on('input', function(msg) {
            switch(node.operation) {
                case "PostHeartBeat":
                    var http = require("https");
                    var options = {
                        "method": "POST",
                        "hostname": iot_url,
                        "port": null,
                        "path": "/iot/v1/device/" + node.device_id + "/heartbeat",
                        "headers": {
                            "ck": node.APIkey,
                            "content-type": "application/json"
                        }
                    };
                    var req = http.request(options, function (res) {
                        var chunks = [];
                        res.on("data", function (chunk) {
                            chunks.push(chunk);
                        });
                        res.on("end", function () {
                            var body = Buffer.concat(chunks);
                            node.send({payload: body.toString()});
                        });
                    });
                    req.write(JSON.stringify({ pulse: node.pulse }));
                    req.end();
                    break;
                case "GetHeartBeat":
                    var http = require("https");
                    var options = {
                        "method": "GET",
                        "hostname": iot_url,
                        "port": null,
                        "path": "/iot/v1/device/" + node.device_id + "/heartbeat",
                        "headers": {
                            "ck": node.APIkey,
                            "content-type": "application/json"
                        }
                    };
                    var req = http.request(options, function (res) {
                        var chunks = [];
                        res.on("data", function (chunk) {
                            chunks.push(chunk);
                        });
                        res.on("end", function () {
                            var body = Buffer.concat(chunks);
                            node.send({payload: JSON.parse(body.toString())});
                        });
                    });
                    req.write(JSON.stringify({ pulse: '10000' }));
                    req.end();
                    break;
            }
        });
    }
    RED.nodes.registerType("HeartBeat",HeartBeat);
}
