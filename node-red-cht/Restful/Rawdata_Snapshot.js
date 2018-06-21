module.exports = function(RED) {
    "use strict";
    var iot_url = "iot.cht.com.tw";
    function Rawdata_Snapshot(config) {
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
        this.interval = config.interval;
        this.raw = config.raw;
        this.option = config.option;
        this.snapshot_id = config.snapshot_id;
        this.snapshot_value = config.snapshot_value;
        var node = this;
        node.on('input', function(msg) {
            switch(node.operation) {
                case "SendSensorData":
                    var http = require("https");
                    var options = {
                        "method": "POST",
                        "hostname": iot_url,
                        "port": null,
                        "path": "/iot/v1/device/" + node.device_id + "/rawdata",
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
                                        "value": [ msg.payload ],
                                        "save": node.save_to_database,
                                    }
                               ];
                    if(node.time != ""){
                        data[0]["time"] = node.time;
                    }
                    req.write(JSON.stringify(data));
                    req.end();
                    break;
                case "ReadSensorData":
                    var http = require("https");
                    var resource = "/iot/v1/device/" + node.device_id + "/sensor/" + node.sensor_id + "/rawdata";
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
                case "ReadStatisticalSensorData":
                    var http = require("https");
                    var resource = "/iot/v1/device/" + node.device_id + "/sensor/" + node.sensor_id + "/rawdata/statistic";
                    if(node.start_time != ""){
                        resource += "?start=" + node.start_time;
                        if(node.end_time != ""){
                            resource += "&end=" + node.end_time;
                        }
                        if(node.interval != ""){
                                resource += "&interval=" + node.interval;
                        }
                        if(node.raw == "true"){
                            resource += "&raw=" + node.raw;
                        }
                        if(node.option == "strict"){
                            resource += "&option=" + node.option;
                        }
                    }
                    var options = {
                        "method": "GET",
                        "hostname": "iot.cht.com.tw",
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
                    req.end();
                    break;
                case "DeleteSensorData":
                    var http = require("https");
                    var resource = "/iot/v1/device/" + node.device_id + "/sensor/" + node.sensor_id + "/rawdata";
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
                case "DeleteSnapshot":
                    var http = require("https");
                    var resource = "/iot/v1/device/" + node.device_id + "/sensor/" + node.sensor_id + "/snapshot";
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
                case "UploadSnapshot":
                    if(typeof msg.error != "undefined"){
                        node.send({payload:'File Not Found!'})
                        break;
                    }
                    var http = require("https");
                    var options = {
                      "method": "POST",
                      "hostname": iot_url,
                      "port": null,
                      "path": "/iot/v1/device/" + node.device_id + "/snapshot",
                      "headers": {
                        "content-type": "multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW",
                        "ck": node.APIkey
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
                    var data = {
                        id: node.sensor_id,
                        value: [ node.snapshot_value ]
                    }
                    var tmpArr = msg.filename.split(".");
                    var fileType = tmpArr[tmpArr.length - 1];
                    var upload_msg = "------WebKitFormBoundary7MA4YWxkTrZu0gW\r\n" + 
                                     "Content-Disposition: form-data; name=\"meta\"\r\n\r\n" + 
                                     JSON.stringify(data) + "\r\n" +
                                     "------WebKitFormBoundary7MA4YWxkTrZu0gW\r\n" +
                                     "Content-Disposition: form-data; name=\"img\"; filename=\"UploadSnapshot.jpg\"\r\n" +
                                     "Content-Type: image/" + fileType + "\r\n\r\n";
                    req.write(upload_msg)
                    req.write(msg.payload);
                    req.write("\r\n------WebKitFormBoundary7MA4YWxkTrZu0gW--");
                    req.end();
                    break;
                case "ReadLatestSnapshotInformation":
                    var http = require("https");
                    var resource = "/iot/v1/device/" + node.device_id + "/sensor/" + node.sensor_id + "/snapshot/meta";
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
                case "DownloadLatestSnapshot":
                    var http = require("https");
                    var options = {
                        "method": "GET",
                        "hostname": iot_url,
                        "port": null,
                        "path": "/iot/v1/device/" + node.device_id + "/sensor/" + node.sensor_id + "/snapshot",
                        "headers": {
                            "ck": node.APIkey
                        }
                    };
                    var req = http.request(options, function (res) {
                        var chunks = [];
                        res.on("data", function (chunk) {
                            chunks.push(chunk);
                        });
                        res.on("end", function () {
                            var body = Buffer.concat(chunks);
                            node.send({payload: body});
                        });
                    });
                    req.end();
                    break;
                case "DownloadSnapshotByID":
                    var http = require("https");
                    var options = {
                        "method": "GET",
                        "hostname": iot_url,
                        "port": null,
                        "path": "/iot/v1/device/" + node.device_id + "/sensor/" + node.sensor_id + "/snapshot/" + node.snapshot_id,
                        "headers": {
                            "ck": node.APIkey
                        }
                    };
                    var req = http.request(options, function (res) {
                        var chunks = [];
                        res.on("data", function (chunk) {
                            chunks.push(chunk);
                        });
                        res.on("end", function () {
                            var body = Buffer.concat(chunks);
                            node.send({payload: body});
                        });
                    });
                    req.end();
                    break;
            }
        });
    }
    RED.nodes.registerType("Rawdata_Snapshot",Rawdata_Snapshot);
}
