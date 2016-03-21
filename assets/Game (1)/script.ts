namespace Game {
    
    export let playerBehavior: PlayerBehavior;
    export let player2Behavior: Player2Behavior;
    
    export function initScene(sceneName: string) {
        playerBehavior = null;
        player2Behavior = null;
        /*
        if (music.getState() !== Sup.Audio.SoundPlayer.State.Playing) music.play();
        Sup.loadScene("Scenes/" + sceneName + "/Scene");
        let playerActor = Sup.getActor("Player");

        if (currentScene != null) {
          let spawnActor = Sup.getActor(currentScene);
          playerActor.setLocalPosition(spawnActor.getLocalPosition());
          playerActor.setLocalEulerAngles(Math.PI, spawnActor.getLocalEulerAngles().y + Math.PI, 0);
        }
        currentScene = sceneName;

        let backscreenActor = Sup.getActor("Blackscreen");
        new Sup.Tween(backscreenActor, { opacity: 1 })
          .to({ opacity: 0 }, 600)
          .onUpdate(function(object) { backscreenActor.spriteRenderer.setOpacity(object.opacity); })
          .onComplete(function() { playerActor.getBehavior(PlayerBehavior).canMove = true; })
          .start();
          */
    }
  
    export function init() {
        Sup.log('init game?');
        RPGee.on('itemselect',(index)=>{
            Sup.log('itemselect:'+index);
        });
        
        RPGee.on('itemscroll',(number)=>{
            Sup.log('itemscroll:'+number);
        });
        
        RPGee.on('itemtoggle',(toggle)=>{
            var inventoryactor:any;
            Sup.log('itemtoggle:'+toggle);
            if(typeof toggle == 'undefined'){
                Sup.log('checking.. ');
                inventoryactor = Sup.getActor('UI_Inventory');
                inventoryactor
                Sup.log('isVisible'+inventoryactor.getVisible());
                if(inventoryactor.getVisible() == true){
                    inventoryactor.setVisible(false);
                }else{
                    inventoryactor.setVisible(true);
                }
                inventoryactor =null;
            }else{
                Sup.log('toggle'+toggle);
                inventoryactor = Sup.getActor('UI_Inventory');
                if(toggle == 'false'){
                    inventoryactor.setVisible(false);    
                }
                if(toggle == 'true'){
                    inventoryactor.setVisible(true);
                    
                }
                //inventoryactor.destroy();
                //Sup.log(inventoryactor);
                inventoryactor =null;
            }
        });
    }
}

Game.init();

let world = Sup.Cannon.getWorld();
world.gravity.set(0, -100, 0);
world.defaultContactMaterial.friction = 0.1;

let playerMaterial = new CANNON.Material("playerMaterial");
world.addContactMaterial(new CANNON.ContactMaterial(playerMaterial, world.defaultMaterial, {
  friction: 0,
  restitution: 0,
  contactEquationStiffness: 1e8,
  contactEquationRelaxation: 3
}));


//Sup.log("test");

//RPGee.on('event',()=>{
  //Sup.log('event test!game');
//});