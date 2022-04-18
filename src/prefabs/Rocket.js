// Rocket prefab
class Rocket extends Phaser.GameObjects.Sprite {
   constructor(scene, x, y, texture, keyL, keyR, keyFire) {
      super(scene,x,y,texture,0);
      
      //add object ot existing scene
      scene.add.existing(this);
      this.isFiring = false;
      this.moveSpeed = 2;
      this.sfxRocket = scene.sound.add('sfx_rocket'); // add rocket sfx
      this.keyFire = keyFire;
      this.keyL = keyL;
      this.keyR = keyR;
   }

   update() {
      //left/Right
      if(!this.isFiring) {
         if(this.keyL.isDown && this.x >= borderUISize + this.width) {
            this.x -= this.moveSpeed;
         } else if (this.keyR.isDown && this.x <= game.config.width - borderUISize - this.width) {
            this.x += this.moveSpeed;
         }
      }
      //fire
      if(Phaser.Input.Keyboard.JustDown(this.keyFire)) {
         this.isFiring = true;
         this.sfxRocket.play();
      }
      //if fired move up
      if(this.isFiring && this.y >= borderUISize*3 + borderPadding) {
         this.y -= this.moveSpeed;
      }
      //reset on miss
      if(this.y <= borderUISize * 3 + borderPadding) {
         this.reset();
      }
   }
   
   reset(){
      this.isFiring = false;
      this.y = game.config.height - borderUISize - borderPadding;
   }
}