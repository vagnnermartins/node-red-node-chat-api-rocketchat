var request = require('request');

module.exports = function(RED) {
    function NodeRedChatAPIWhatsapp(config) {
        RED.nodes.createNode(this,config);
        this.urlInstance = config.urlInstance;
        this.token = config.token;
        var node = this;

        node.on('input', function(msg) {
          var url = `${this.urlInstance}/message?token=${this.token}`;
          var data = {
              phone: msg.payload.phone,
              body: msg.payload.text,
          };
          request({
              url: url,
              method: "POST",
              json: data
          }, function (error, response, body) {
            if(response.statusCode == 200 && body.sent){
              node.status({fill:"green",shape:"dot",text:"message sent"});
            } else {
              node.status({fill:"red",shape:"ring",text:"error"});
            }
          });
        });
    }
    RED.nodes.registerType("node-red-node-chat-api-whatsapp",NodeRedChatAPIWhatsapp);
}
