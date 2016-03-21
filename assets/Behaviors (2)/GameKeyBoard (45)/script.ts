let { x, y } = Sup.Input.getMousePosition();


class GameKeyBoardBehavior extends Sup.Behavior {
    keyInventory:string = "I";
    steppress:number = 0;
    benable:boolean = true;

    bInputKeyInvent:boolean = false;

    awake() {
        
    }
    
    
    //OpenInventory(){return Sup.Input.wasKeyJustPressed("I") ; Sup.log('I');};
    OpenInventory(){return Sup.Input.wasKeyJustPressed("I") ; Sup.log('I');};

    update() {
        if(!this.benable){
            return;
        }
        
        x = (x + 1) / 2 * Sup.Input.getScreenSize().x;
        y = (1 - (y + 1) / 2) * Sup.Input.getScreenSize().y;
        
        if( (Sup.Input.wasKeyJustReleased("I") == true)) {
            RPGee.emit('itemtoggle');
            //this.steppress += 1;
            //this.steppress = this.steppress % 2;
            //Sup.log(this.steppress);
            //Sup.log('key press inventory');
            //if(RPGee !=null){
                //if(this.steppress == 0){
                    //RPGee.emit('itemtoggle','true');
                //}else{
                    //RPGee.emit('itemtoggle','false');
                //}
            //}
        }
        
        /*
        if(Sup.Input.isKeyDown("I")){
            this.bInputKeyInvent = true;
        }
        if((this.bInputKeyInvent == true)&&(Sup.Input.wasKeyJustReleased("I") == true)){
            Sup.log("release?");
            this.bInputKeyInvent = false;
        }
        */
        
    }
}
Sup.registerBehavior(GameKeyBoardBehavior);
