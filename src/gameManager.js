const Proby = require('./game/proby.js');
const Voty = require('./game/voty.js');
const Player = require('./player.js');

class GameManager{
    
    constructor(){
        this.games = [];
    }

    createParty(config){

        var party;

        if(config.type = "proby"){
            party = new Proby(config);
        }
        else if(config.type = "voty"){
            party = new Voty(config)
        }

        this.games.push(party);

        return party.getId();

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

    deleteFromParty(id,player){

        party = this.games.find( function(element,index){
            if(element.id == id ) return index;
        });

        if(party == null) return false;

        this.games[party].deletePlayer[player];

    }

}

module.exports = () => { return new GameManager(); }