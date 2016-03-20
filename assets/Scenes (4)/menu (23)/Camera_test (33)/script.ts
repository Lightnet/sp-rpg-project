class Camera_testBehavior extends Sup.Behavior {
  ry:any;
  
  awake() {
    this.ry = 0;
    
    Sup.log(this);
  }

  update() {
    //Sup.log('');
    //this.actor.setEulerY();
    if(Sup.Input.isKeyDown("UP")){
      this.actor.move(0,0.1,0);
      //if(this.actor.spriteRenderer.getAnimation() !== "Walk"){
        //this.actor.spriteRenderer.setAnimation("Walk");
        //Sup.log("Set animation to walk");
      //}
    }
    if(Sup.Input.isKeyDown("DOWN")){
      this.actor.move(0,-0.1,0);
      //if(this.actor.spriteRenderer.getAnimation() !== "Walk"){
        //this.actor.spriteRenderer.setAnimation("Walk");
        //Sup.log("Set animation to walk");
      //}
      
    }
  }
}
Sup.registerBehavior(Camera_testBehavior);
