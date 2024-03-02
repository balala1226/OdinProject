export class PlayingCardModel{
    constructor(id = '', url = ''){
        this.id = id;
        this.url = url;
        this.isSelected = false;
    }

    getId(){
        return this.id;
    }

    getIsSelected(){
        return this.isSelected;
    }

    setIsSelected(value){
        this.isSelected = value;
    }

    setUrl(value){
        this.url = value;
    }

    getUrl(){
        return this.url;
    }
}