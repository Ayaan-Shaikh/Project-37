var  dog,dogImg,happyDog;
var  bedroom;
var  garden;
var  washroom;


var  database,foodS,foodStock;
var feed,addFood;
var fedTime,lastFed,currentTime;
var foodObj;
var gameState,readState;




function preload()
{
    dogImg=loadImage("Images/dogImg.png")
  happyDog=loadImage("Images/dogImg1.png");
bedroom=loadImage("Images/Bed Room.png")
 garden=loadImage("Images/Garden.png")
 washroom=loadImage("Images/Wash Room.png")

}


function setup() {
  createCanvas(550,610);
  database=firebase.database();
	
  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);

  fedTime=database.ref('FeedTime');
 fedTime.on("value",function(data){
    lastFed=data.val();
  });  

  readState=database.ref('gameState');
  readState.on("value",function(data){
    gameState=data.val();
  });

    dog=createSprite(250,480,20,20);
    dog.addImage(dogImg);
    dog.scale=0.3
  
    feed=createButton("FEED THE DOG ");
    feed.position(510,65);
    feed.mousePressed(feedDog);
  

    addFood=createButton("ADD THE DOG");
    addFood.position(700,65);  
    addFood.mousePressed(addFoods);

}


function draw() {  
 background(46, 139, 87);

 
  
 fill(255,255,254);
 textSize(15);

  if(lastFed>=12){
    text("Last Feed : "+lastFed % 12 + " PM",20,30);
  }else if(lastFed == 0){
    text("Last Feed : 12 AM",20,30);
  }else{
    text("Last Feed : "+lastFed + " AM",20,30);

  }

  currentTime=hour();
  if(currentTime==(lastFed+1)){
      update("Playing");
         foodObj.garden();
         }
   else if(currentTime==(lastFed+2)){
    update("Sleeping");
        foodObj.bedroom();
   }
   else if(currentTime>(lastFed+2) && currentTime<=(lastFed+4)){
    update("Bathing");
         foodObj.washroom();
   }
   else{
    update("Hungry")
        foodObj.display();
   }
   
   if(gameState!="Hungry"){
     feed.hide();
     addFood.hide();
     dogImg.remove();
   }else{
    feed.show();
    addFood.show();
     dog.addImage(dogImg);
    
   }
  drawSprites();
  foodObj.display();
 }

 function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
dog.addImage(happyDog);
foodObj.updateFoodStock(foodObj.getFoodStock()-1);
database.ref('/').update({
Food:foodObj.getFoodStock(),
FeedTime:hour(),
gameState:"Hungry"
})
}





function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
  }

  function update(state){
    database.ref('/').update({
      gameState:state
    })
  }
