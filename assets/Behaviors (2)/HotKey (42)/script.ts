var ray : Sup.Math.Ray;

class HotKeyBehavior extends Sup.Behavior {
    ActorPanel:string = "";
    EventName:string = "";
    isVariable:boolean = false;
    value:string = "";
    isHover : boolean = false;
    unhover:string = "";
    hover:string = "";
    button:Array<string> = [];
  
    awake() {
        ray = new Sup.Math.Ray(this.actor.getPosition(), new Sup.Math.Vector3(0, 0, -1));    
    }

    /* We define different possible actions of the mouse,
    click action load the game scene, hovering and unhovering
    make the button to change the sprite.
    */

    mouse(action) {
        if(action == "click"){
            //Sup.loadScene("Game");
            //Sup.log('click');
            Sup.log(this.actor.getVisible());
            if((this.EventName != null)&&(this.EventName != "")){
                if(RPGee !=null){
                    if(this.isVariable){
                        RPGee.emit(this.EventName,this.value);
                    }else{
                        RPGee.emit(this.EventName);
                    }
                }    
            }
        }
        else if(action == "hover"){
            //Sup.getActor("Button").spriteRenderer.setSprite("MenuSprites/starton");
            //Sup.log('hover');
        }
        else if(action == "unhover"){
            //Sup.getActor("Button").spriteRenderer.setSprite("MenuSprites/startoff");
            //Sup.log('unhover');
        }
    }

    update() {
        if(this.ActorPanel != ""){
            if(Sup.getActor(this.ActorPanel).getVisible() == false){
                return;
            }    
        }
        
        
        // Refresh position of the mouse in the camera
        ray.setFromCamera(Sup.getActor("CameraO").camera, Sup.Input.getMousePosition());
    
        /* Condition to check if yes or no, the mouse hover
        the button, and if yes, check if the mouse click.
        We call the mouse function with the action related. */
    
        if(ray.intersectActor(this.actor, false).length > 0){
            if(!this.isHover){
                this.mouse("hover");
                this.isHover = true;
            }
            if(Sup.Input.wasMouseButtonJustPressed(0)){
                this.mouse("click")
            }
        }
        else if(this.isHover){
            this.isHover = false;
            this.mouse("unhover")
        }
    }
}
Sup.registerBehavior(HotKeyBehavior);
