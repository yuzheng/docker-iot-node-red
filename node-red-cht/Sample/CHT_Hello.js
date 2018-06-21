module.exports = function(RED) {
    function hello(config) {
        RED.nodes.createNode(this,config);
        var context = this.context();
        var node = this;
        this.on('input', function(msg) {

        var outMsg = {payload: "CHT, Hello"};
    
        node.send(outMsg);
        
        });
    }
    RED.nodes.registerType("CHT_Hello",hello);
};
