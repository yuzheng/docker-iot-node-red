module.exports = function(RED) {
    "use strict";
    var iot_url = "iot.cht.com.tw";
    function Command_Ack(config) {
        RED.nodes.createNode(this,config);
        /// Load configurations
        this.name = config.name;
        this.APIkey = config.APIkey;
        this.operation = config.operation;
        this.device_id = config.device_id;
        this.sensor_id = config.sensor_id;
        this.save_to_database = config.save_to_database;
        this.time = config.time;
        this.start_time = config.start_time;
        this.end_time = config.end_time;
        var node = this;
        node.on('input', function(msg) {
            switch(node.operation) {
                case "SendSensorCommand":
                    var http = require("https");
                    var options = {
                        "method": "POST",
                        "hostname": iot_url,
                        "port": null,
                        "path": "/iot/v1/device/" + node.device_id + "/command",
                        "headers": {
                            "ck": node.APIkey
                        }
                    };
                    var req = http.request(options, function(res) {
                        var chunks = [];
                        res.on("data", function(chunk) {
                            chunks.push(chunk);
                        });
                        res.on("end", function() {
                            var body = Buffer.concat(chunks);
                            node.send({payload: body.toString()});
                        });
                    });
                    var data = [
                                    { 
                                        id: node.sensor_id,
                                        save: node.save_to_database,
                                        cmd: msg.payload
                                    }
                                ];
                    if(node.time != ""){
                        data[0]["time"] = node.time;
                    }
                    req.write(JSON.stringify(data));
                    req.end();
                    break;
                case "ReadSensorCommand":
                    var http = require("https");
                    var resource = "/iot/v1/device/" + node.device_id + "/sensor/" + node.sensor_id + "/command";
                    if(node.start_time != ""){
                        resource += "?start=" + node.start_time;
                        if(node.end_time != ""){
                            resource += "&end=" + node.end_time;
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
                    req.end();
                    break;
                case "ReadDeviceCommand":
                    var http = require("https");
                    var resource = "/iot/v1/device/" + node.device_id + "/command";
                    var options = {
                        "method": "GET",
                        "hostname": iot_url,
                        "port": null,
                        "path": resource,
                        "headers": {
                            "ck": node.APIkey,
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
                    req.end();
                    break;
                case "DeleteSensorCommand":
                    var http = require("https");
                    var resource = "/iot/v1/device/" + node.device_id + "/sensor/" + node.sensor_id + "/command";
                    if(node.start_time != ""){
                        resource += "?start=" + node.start_time;
                        if(node.end_time != ""){
                            resource += "&end=" + node.end_time;
                        }
                    }
                    var options = {
                        "method": "DELETE",
                        "hostname": iot_url,
                        "port": null,
                        "path": resource,
                        "headers": {
                            "ck": node.APIkey
                        }
                    };
                    var req = http.request(options, function(res) {
                        var chunks = [];
                        res.on("data", function(chunk) {
                            chunks.push(chunk);
                        });
                        res.on("end", function() {
                            var body = Buffer.concat(chunks);
                            node.send({payload: body.toString()});
                        });
                    });
                    req.end();
                    break;
                case "SendSensorAck":
                    var http = require("https");
                    var options = {
                        "method": "POST",
                        "hostname": iot_url,
                        "port": null,
                        "path": "/iot/v1/device/" + node.device_id + "/ack",
                        "headers": {
                            "ck": node.APIkey
                        }
                    };
                    var req = http.request(options, function(res) {
                        var chunks = [];
                        res.on("data", function(chunk) {
                            chunks.push(chunk);
                        });
                        res.on("end", function() {
                            var body = Buffer.concat(chunks);
                            node.send({payload: body.toString()});
                        });
                    });
                    var data = [  
                                    {  
                                        "id": node.sensor_id,
                                        "save": node.save_to_database,  
                                        "ack": msg.payload
                                    }  
                                ];
                    if(node.time != ""){
                        data[0]["time"] = node.time;
                    }
                    req.write(JSON.stringify(data));
                    req.end();
                    break;
                case "ReadSensorAck":
                    var http = require("https");
                    var resource = "/iot/v1/device/" + node.device_id + "/sensor/" + node.sensor_id + "/ack";
                    if(node.start_time != ""){
                        resource += "?start=" + node.start_time;
                        if(node.end_time != ""){
                            resource += "&end=" + node.end_time;
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
                    req.end();
                    break;
                case "ReadDeviceAck":
                    var http = require("https");
                    var resource = "/iot/v1/device/" + node.device_id + "/ack";
                    var options = {
                        "method": "GET",
                        "hostname": iot_url,
                        "port": null,
                        "path": resource,
                        "headers": {
                            "ck": node.APIkey,
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
                    req.end();
                    break;
                case "DeleteSensorAck":
                    var http = require("https");
                    var resource = "/iot/v1/device/" + node.device_id + "/sensor/" + node.sensor_id + "/ack";
                    if(node.start_time != ""){
                        resource += "?start=" + node.start_time;
                        if(node.end_time != ""){
                            resource += "&end=" + node.end_time;
                        }
                    }
                    var options = {
                        "method": "DELETE",
                        "hostname": iot_url,
                        "port": null,
                        "path": resource,
                        "headers": {
                            "ck": node.APIkey
                        }
                    };
                    var req = http.request(options, function(res) {
                        var chunks = [];
                        res.on("data", function(chunk) {
                            chunks.push(chunk);
                        });
                        res.on("end", function() {
                            var body = Buffer.concat(chunks);
                            node.send({payload: body.toString()});
                        });
                    });
                    req.end();
                    break;
            }
        });
    }
    RED.nodes.registerType("Command_Ack",Command_Ack);
}
