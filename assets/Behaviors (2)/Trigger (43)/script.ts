/*
 Trigger event when emitter var global.
*/

class TriggerBehavior extends Sup.Behavior {
  Once_used:boolean = false;
  IsEnable:boolean = true;
  awake() {
    //this.even
  }

  update() {
    
  }
}
Sup.registerBehavior(TriggerBehavior);
