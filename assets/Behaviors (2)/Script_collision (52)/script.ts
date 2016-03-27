class Script_collisionBehavior extends Sup.Behavior {
    index: number;
    position: Sup.Math.Vector3;
    model: Sup.Model;
    //playerBehavior: Player2DBehavior;

    awake() {
        this.position = this.actor.getPosition();
        this.position.y -= this.actor.getLocalScale().y / 2;
        this.model = this.actor.modelRenderer.getModel();
        //this.playerBehavior = Sup.getActor("2D Scene").getChild(`Player ${this.index}`).getBehavior(Player2DBehavior);
    }

    update() {
        //if (Game.playerBehavior.position.distanceTo(this.position) < 2 || (Game.player2Behavior && Game.player2Behavior.position.distanceTo(this.position) < 2)) {
        if (Game.playerBehavior.position.distanceTo(this.position) < 2 ) {
          //this.actor.modelRenderer.setModel("Scenes/2D/Buttons/Press");
          this.press();
            Sup.log('press');
        } else { 
            this.actor.modelRenderer.setModel(this.model); 
            //Sup.log('other');
        }
        //Sup.log(Game.playerBehavior.position.distanceTo(this.position).toString() );
    }
    press() {
        
        
        /*
        switch(this.actor.getName()) {
          case "Left":  this.playerBehavior.goLeft();  break;
          case "Right": this.playerBehavior.goRight(); break;
          case "Punch": this.playerBehavior.punch();   break;
        }
        */
    }
}
Sup.registerBehavior(Script_collisionBehavior);
