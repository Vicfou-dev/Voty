
const Proby = require('./game/proby.js');
const Voty = require('./game/voty.js');
const Player = require('./player.js');

class Server{

    constructor(config){
        this.port = config.port;
        this.app = config.app;
        this.io = config.io;
        this.games = [];
        this.clients = [];
    }

    createParty(config){
        if(config.type = 1) this.games.push( new Proby(config) );
        else if(config.type = 2) this.games.push( new Voty(config) ); 
    }

    createPlayer(info){
        return new Player(info);
    }

    joinParty(id,player){

        party = this.games.find( function(element,index){
            if(element.id == id ) return index;
        });

        if(party == null) return false;

        this.games[party].addPlayer[player];

    }

    banFromParty(id,player){

        party = this.games.find( function(element,index){
            if(element.id == id ) return index;
        });

        if(party == null) return false;

        this.games[party].deletePlayer[player];

    }

    findClient(id){
        client = this.clients.find( function(socket,index){
            if(socket.id == id ) return index;
        });

        if(client == null) return false;

        return client;
    }

    connection(socket){

        socket.id = Math.random();

        this.clients.push(socket);

        socket.on('joinParty', function (data) {

            this.createPlayer(config);
        });

        socket.on('createParty', function (data) {
            this.createParty();
        });


        socket.on('disconnect', function () {

            indexClient = this.findClient(socket.id);

            client = this.client[indexClient];

            if(client.currentGame){
                this.banFromParty(client.getIdParty(),client);
            }

            delete this.clients[client];
            
      
        });
    }

    start(){

        this.io.on("connection",this.connection);
        this.app.listen(this.port );
        console.log("Server is running on port " + this.port);

    }
}


module.exports = (config) => { return new Server(config); }