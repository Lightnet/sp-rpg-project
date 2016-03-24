class PlayerBehavior extends Sup.Behavior {
  speed = 20;
  teleportSpeedFactor = 2;
  canMove = false;
  canJump = true;
  radius = 2;
  height = 5;

  position: Sup.Math.Vector3;
  angles = new Sup.Math.Vector3(Math.PI / 2, 0, 0);
  direction = new Sup.Math.Vector3(0, 0, 1);

  modelRndr: Sup.ModelRenderer;
  modelPosition = new Sup.Math.Vector3(0, 0, 0);

  shadowActor: Sup.Actor;
  initialShadowScale: Sup.Math.Vector3 = new Sup.Math.Vector3(1, 1, 1);
  shadowScale: Sup.Math.Vector3 = new Sup.Math.Vector3(1, 1, 1);
  shadowoffset = new Sup.Math.Vector3(0, -2, 0);

  awake() {
    Game.playerBehavior = this;
  }
  
  start() {
    this.position = this.actor.getLocalPosition();
    this.angles.y = this.actor.getLocalEulerAngles().y;

    let angle = this.actor.getLocalEulerAngles().y;
    this.actor.cannonBody.body.position.set(this.position.x, this.height / 2, this.position.z);
    this.actor.cannonBody.body.velocity.x = Math.sin(angle) * this.speed / this.teleportSpeedFactor;
    this.actor.cannonBody.body.velocity.z = Math.cos(angle) * this.speed / this.teleportSpeedFactor;
    
    this.actor.cannonBody.body.material = playerMaterial;
    this.actor.cannonBody.body.addEventListener("collide", (event) => {
      // Only allow jumping if touching the floor
      if (event.contact.ni.y > 0.9) this.canJump = true;
    });

    this.modelRndr = this.actor.getChild("Model").modelRenderer;
    this.modelRndr.setAnimation("walk");
    
    this.shadowActor = this.actor.getChild("Shadow");
    this.initialShadowScale = this.shadowActor.getLocalScale();
    this.shadowScale = this.initialShadowScale.clone();
  }

  goLeft()  { return Sup.Input.isKeyDown("LEFT"); Sup.log('LEFT');}
  goRight() { return Sup.Input.isKeyDown("RIGHT"); Sup.log('RIGHT');}
  goUp()    { return Sup.Input.isKeyDown("UP"); Sup.log('UP');}
  goDown()  { return Sup.Input.isKeyDown("DOWN"); Sup.log('LEDOWNFT');}
  jump()    { return Sup.Input.wasKeyJustPressed("SPACE"); Sup.log('SPACE');}
    
  
  update() {
    //Sup.log('update?');
    this.position.set(this.actor.cannonBody.body.position.x, this.actor.cannonBody.body.position.y - this.height / 2, this.actor.cannonBody.body.position.z);
    var scale = Sup.Math.clamp(this.initialShadowScale.y / (1 + (this.actor.cannonBody.body.position.y - this.height / 2) / 8),-7, 2);
    this.shadowScale.x = scale;
    this.shadowScale.y = scale;
    //this.shadowScale.x = this.initialShadowScale.x / ( (this.actor.cannonBody.body.position.y - this.height / 2) / 1);
    //this.shadowScale.y = this.initialShadowScale.y / ( (this.actor.cannonBody.body.position.y - this.height / 2) / 1);
      
    //Sup.log(this.initialShadowScale.y / (1 + (this.actor.cannonBody.body.position.y - this.height / 2) / 8))
    //Sup.log(scale);
      
    this.shadowActor.setLocalScale(this.shadowScale);
      //0.1
    this.shadowActor.setPosition(new Sup.Math.Vector3(this.actor.cannonBody.body.position.x, this.shadowoffset.y, this.actor.cannonBody.body.position.z +this.shadowoffset.z));
    
    this.actor.setLocalEulerAngles(this.angles);
    if (!this.canMove) { return; }

    if (this.goLeft()) { this.direction.x = -1; }
    else if (this.goRight()) { this.direction.x = 1; }
    else { this.direction.x = 0; }

    if (this.goUp()) { this.direction.z = -1; }
    else if (this.goDown()) { this.direction.z = 1; }
    else { this.direction.z = 0; }

    if (this.direction.length() !== 0) {
      this.direction.normalize();
      this.actor.cannonBody.body.velocity.x = this.direction.x * this.speed;
      this.actor.cannonBody.body.velocity.z = this.direction.z * this.speed;
    } else {
      this.actor.cannonBody.body.velocity.x = 0;
      this.actor.cannonBody.body.velocity.z = 0;
    }

    let animation = "idle";
    if ((this.actor.cannonBody.body.velocity.x !== 0 || this.actor.cannonBody.body.velocity.z !== 0)) {
      animation = "walk";
      let angle = Math.atan2(-this.actor.cannonBody.body.velocity.z, this.actor.cannonBody.body.velocity.x) + Math.PI / 2;
      this.angles.set(Math.PI / 2, angle, 0);
    }
    
    if (!this.canJump) animation = "jump";
    else if (this.canJump && this.jump()) {
      this.canJump = false;
      this.actor.cannonBody.body.velocity.y = 30;
      animation = "jump";
      //Sup.Audio.playSound("Sounds/Jump");
    }
    
    //this.modelRndr.setAnimation(animation);
    this.modelRndr.setAnimation(animation);
  }

  teleport(angle: number) {
    this.canMove = false;
    
    this.actor.cannonBody.body.velocity.x = Math.sin(angle) * this.speed / this.teleportSpeedFactor;
    this.actor.cannonBody.body.velocity.z = Math.cos(angle) * this.speed / this.teleportSpeedFactor;
    
    this.angles.y = angle;
  }
}
Sup.registerBehavior(PlayerBehavior);
