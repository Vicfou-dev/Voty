module.exports = class Game {

    constructor(config){
        this.players = [];
        this.nbPlayerMin = config.nbPlayerMin;
        this.pathFileQuestion = config.pathFileQuestion;
        this.id = generateRandomInt(config.max);
    }

    generateRandomInt(max){
        return Math.floor(Math.random() * Math.floor(max));
    }

    addPlayer(player){
        this.players.push(player);
    }

    deletePlayer(player){
        this.players = this.players.filter( a => a.id == player.id);
    }


}

