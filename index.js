var config = require('./config/server.json');
var voty = require('./config/voty.json');

config.app = app = require('http').createServer()
config.io = require('socket.io')(app);

const Server = require('./src/server')(config);
const GameManager = require('./src/gameManager')();


Server.io.on('connect',(socket) => {


    socket.id = Math.random();
    
    Server.clients.push(socket);

    console.log("connect user : " + socket.id);

    socket.on('joinParty', function (data) {

        const player = GameManager.createPlayer({
            pseudo : data["pseudo"],
            image : data["image"],
            socket : socket
        });

        GameManager.joinParty(data.id,player);

    });

    socket.on('createParty', function (data) {

        var party;

        if(data.type == "voty"){
            party = voty
        }
        
        const id = GameManager.createParty(party);

        socket.emit("createParty",{
            id : id
        });

    });

    socket.on('disconnect', function () {

        indexClient = Server.findClient(socket.id);

        if(indexClient === -1) return console.log("Error disconnect User with id :" + socket.id);
        
        client = Server.clients[indexClient];

        if(client.currentGame){
            GameManager.banFromParty(client.getIdParty(),client);
        }

        console.log("disconnect user : " + client.id);

        Server.clients.splice(indexClient,1);
        
    });

});

Server.start();