# Node-RED-Docker (with Cht-iot module)

Reference [node-red/node-red-docker](https://github.com/node-red/node-red-docker)

Add CHT IoT Modules [node-red-contrib-CHT ](https://iot.cht.com.tw/iot/developer/download)

To run this directly in docker at it's simplest just run

        docker build -t="cht-iot/nodered:1.0" .
        docker run -it -p 1880:1880 --name chtnodered -t cht-iot/nodered:1.0
