module.exports = function(RED) {
    "use strict";
    var iot_url = "iot.cht.com.tw";
    function Registry_Thing(config) {
        RED.nodes.createNode(this,config);
        /// Load configurations
        this.name = config.name;
        this.APIkey = config.APIkey;
        this.operation = config.operation;
        this.time = config.time;
        this.start_time = config.start_time;
        this.end_time = config.end_time;
        this.command = config.command;
        this.ack = config.ack;
        this.serial_num = config.serial_num;
        this.digest = config.digest;
        this.device_id = config.device_id;
        this.product_code = config.product_code;
        var node = this;
        node.on('input', function(msg) {
            switch(node.operation) {
                case "CreateConfigurationData":
                    var http = require("https");
                    var options = {
                      "method": "POST",
                      "hostname": iot_url,
                      "port": null,
                      "path": "/iot/v1/registry/" + node.serial_num,
                      "headers": {
                        "ck": node.APIkey,
                        "content-type": "application/json",
                      }
                    };
                    var req = http.request(options, function (res) {
                        var chunks = [];
                        res.on("data", function (chunk) {
                            chunks.push(chunk);
                        });
                        res.on("end", function () {
                            var body = Buffer.concat(chunks);
                            try{
                                body = JSON.parse( body.toString() );
                            }catch(err){
                                body = body.toString();
                            }
                            node.send({payload: body});
                        });
                    });
                    req.write(JSON.stringify({ op: 'Reconfigure',
                        digest: node.digest }));
                    req.end();
                    break;
                case "SetDeviceId":
                    var http = require("https");
                    var options = {
                      "method": "POST",
                      "hostname": iot_url,
                      "port": null,
                      "path": "/iot/v1/registry/" + node.serial_num,
                      "headers": {
                        "ck": node.APIkey,
                        "content-type": "application/json",
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
                    req.write(JSON.stringify({ op: 'SetDeviceId',
                        digest: node.digest,
                        deviceId: node.device_id,
                        authority: 'device' }));
                    req.end();
                    break;
                case "GetProductDeviceInfo":
                    var http = require("https");
                    var resource = "/iot/v1/thing/";
                    if(node.serial_num != ""){
                        resource += node.serial_num;
                        if(node.digest != ""){
                            resource += "?digest=" + node.digest;
                        }
                    }
                    var options = {
                        "method": "GET",
                        "hostname": iot_url,
                        "port": null,
                        "path": resource,
                        "headers": {
                            "ck": node.APIkey,
                        }
                    };
                    var req = http.request(options, function(res) {
                        var chunks = [];
                        res.on("data", function(chunk) {
                            chunks.push(chunk);
                        });
                        res.on("end", function() {
                            var body = Buffer.concat(chunks);
                            node.send({payload: JSON.parse(body.toString())});
                        });
                    });
                    req.write("");
                    req.end();
                    break;
                case "GetProductInfo":
                    var http = require("https");
                    var resource = "/iot/v1/product/";
                    if(node.product_code != ""){
                        resource += node.product_code;
                        if(node.serial_num != ""){
                            resource += "/" + node.serial_num;
                        }
                    }
                    var options = {
                        "method": "GET",
                        "hostname": iot_url,
                        "port": null,
                        "path": resource,
                        "headers": {
                            "ck": node.APIkey,
                        }
                    };
                    var req = http.request(options, function(res) {
                        var chunks = [];
                        res.on("data", function(chunk) {
                            chunks.push(chunk);
                        });
                        res.on("end", function() {
                            var body = Buffer.concat(chunks);
                            node.send({payload: JSON.parse(body.toString())});
                        });
                    });
                    req.write("");
                    req.end();
                    break;
            }
        });
    }
    RED.nodes.registerType("Registry_Thing",Registry_Thing);
}
