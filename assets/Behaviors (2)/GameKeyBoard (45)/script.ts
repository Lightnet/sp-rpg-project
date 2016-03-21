let { x, y } = Sup.Input.getMousePosition();

class GameKeyBoardBehavior extends Sup.Behavior {
    keyInventory:string = "I";
    steppress:number = 0;

    awake() {
        
    }
    
    
    //OpenInventory(){return Sup.Input.wasKeyJustPressed("I") ; Sup.log('I');};
    OpenInventory(){return Sup.Input.wasKeyJustPressed("I") ; Sup.log('I');};

    update() {
        
        x = (x + 1) / 2 * Sup.Input.getScreenSize().x;
        y = (1 - (y + 1) / 2) * Sup.Input.getScreenSize().y;
        
        if( (Sup.Input.wasKeyJustReleased("I") == true)) {
            this.steppress += 1;
            this.steppress = this.steppress % 2;
            Sup.log(this.steppress);
            Sup.log('key press inventory');
            if(RPGee !=null){
                if(this.steppress == 0){
                    RPGee.emit('itemtoggle','true');
                }else{
                    RPGee.emit('itemtoggle','false');
                }
                
            }
        } 
    }
}
Sup.registerBehavior(GameKeyBoardBehavior);
