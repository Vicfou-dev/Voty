


class Server{

    constructor(config){
        this.port = config.port;
        this.app = config.app;
        this.io = config.io;
        this.clients = [];
    }

    findClient(id){
        var client = this.clients.findIndex( function(socket){
            return socket.id == id;
        });

        return client;
    }

    getAllClient(){
        return this.clients.map(function(socket){
            return socket.id;
        });
    }
    

    start(){

        this.app.listen(this.port );
        console.log("Server is running on port " + this.port);

    }
}


module.exports = (config) => { return new Server(config); }