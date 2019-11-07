module.exports = class Player {

    constructor(info){
        this.socket = info.socket;
        this.pseudo = info.pseudo;
        this.image = info.image;
        this.currentGame = 0;
        this.idParty = 0;
    }

    setIdParty(id){ this.idParty = id }
    getIdParty(){ return this.idParty}

}