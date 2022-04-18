class Spaceship extends Phaser.GameObjects.Sprite {
   constructor(scene, x, y, texture, frame, pointValue) {
      super(scene,x,y,texture,frame);

      //add object ot existing scene
      scene.add.existing(this);
      this.points = pointValue;
      this.moveSpeed = game.settings.spaceshipSpeed;
      this.dirLeft = Math.random() > 0.5 ? true : false;
   }

   update() {
      //left/Right
      if(this.dirLeft) {
         this.x -= this.moveSpeed;
      } else {
         this.x += this.moveSpeed;
      }
      
      //wrap around from left to right
      if(this.x <= 0 - this.width) {
         this.x = game.config.width;
      }
      //wrap around from right to left
      if(this.x >= 700 + this.width) {
         this.x = 0;
      }
   }

   reset() {
      this.x = game.config.width;
   }
}