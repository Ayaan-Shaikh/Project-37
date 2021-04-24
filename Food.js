class Food{
    constructor(){
        this.foodStock= 14;
        this.lastFed;
        this.image=loadImage("Images/Milk.png");          
    }

    updateFoodStock(foodStock){
        this.foodStock=foodStock;
    } 
    getFoodStock(lastFed){
         this.lastFed=lastFed;
         return this.foodStock;
    } 

    deductFood(){
        if(this.foodStock>0){
            this.foodStock=this.foodStock-1;
        }
        return this.foodStock;
       }

         bedroom(){
      background(bedroom,550,610)
           } 

       garden(){
        background(garden,550,610)
       } 

       washroom(){
        background(washroom,550,610)
      
       }    

display(){
  

   var x=80,y=100;

      imageMode(CENTER);
      image(this.image,580,340,120,120);
      
      if(this.foodStock!= 0){
          for(var i=0; i<this.foodStock; i++){
              if(i%10 == 0){
                 x=80;
                 y=y+50;
              }
            image(this.image,x,y,50,50);
            x = x + 30;  
          }
        }
      }
     
 

}