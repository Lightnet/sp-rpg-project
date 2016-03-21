//https://github.com/mseyne/superpowers-tutorials/blob/master/1SuperPong/ch4.md#scripting-a-button

var ray : Sup.Math.Ray;

class ButtonBehavior extends Sup.Behavior {
  isHover : boolean = false;
  unhover:string = "";
  hover:string = "";
  

  awake() {
    ray = new Sup.Math.Ray(this.actor.getPosition(), new Sup.Math.Vector3(0, 0, -1));
    
  }

/* We define different possible actions of the mouse,
  click action load the game scene, hovering and unhovering
  make the button to change the sprite.*/

  mouse(action) {
    if(action == "click"){
      //Sup.loadScene("Game");
      Sup.log('click');
    }
    else if(action == "hover"){
      //Sup.getActor("Button").spriteRenderer.setSprite("MenuSprites/starton");
      Sup.log('hover');
    }
    else if(action == "unhover"){
      //Sup.getActor("Button").spriteRenderer.setSprite("MenuSprites/startoff");
      Sup.log('unhover');
    }
  }

  update() {
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
Sup.registerBehavior(ButtonBehavior);
