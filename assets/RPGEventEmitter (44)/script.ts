/*
  Global Variable
*/

//const event:EventEmitter;
var RPGee:any = new EventEmitter();

RPGee.on('event',()=>{
  Sup.log('event test!');
});

function Display(){
  RPGee.emit('event');
  Sup.setTimeout(1000,Display);
}

//Display();






