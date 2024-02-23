const ShipsLengthList = [5,4,3,3,2];

class Ship{
    constructor(length = 2){
        this.length = length;
        this.hitCount = 0;
    }

    hit(){
        this.hitCount++;
    }

    isSunk(){
        if (this.hitCount < this.length){
            return false;
        }

        return true;
    }
}

module.exports = {
    Ship,
    ShipsLengthList
};