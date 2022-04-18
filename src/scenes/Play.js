class Play extends Phaser.Scene {
   constructor() {
      super('playScene');
   }
   preload() {
      //load images/tile sprites
      this.load.image('rocket', './assets/rocket.png');
      this.load.image('spaceship', './assets/spaceship.png');
      this.load.image('smallship', './assets/smallship.png');
      this.load.image('starfield', './assets/starfield.png');
      this.load.image('meteors', './assets/meteors.png');
      this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
   }
   create() {
      this.add.text(20,20, "Rocket Patrol Play");
      //place tile sprite
      this.starfield = this.add.tileSprite(0,0,640,480,'starfield').setOrigin(0,0);
      this.meteors = this.add.tileSprite(0,0,640,480,'meteors').setOrigin(0,0);
      //green UI background
      this.add.rectangle(0,borderUISize + borderPadding, game.config.width, borderUISize *2, 0x00FF00).setOrigin(0,0);
      //white borders
      this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0,0);
      this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0,0);
      this.add.rectangle(0,0,borderUISize, game.config.height, 0xFFFFFF).setOrigin(0,0);
      this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0,0);
      //define keys
      keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
      keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
      let keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
      let keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
      let keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
      keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
      keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
      //add the rockets
      this.p1Rocket = new Rocket(this, game.config.width/2+20, game.config.height - borderUISize - borderPadding, 'rocket', keyA, keyD, keyW).setOrigin(0.5, 0);
      this.p2Rocket = new Rocket(this, game.config.width/2-20, game.config.height - borderUISize - borderPadding, 'rocket', keyLEFT, keyRIGHT, keyF).setOrigin(0.5, 0);
      // add spaceships (x3)
      this.ship03 = new Spaceship(this, game.config.width, borderUISize*8 + borderPadding*6, 'spaceship', 0, 10).setOrigin(0, 0);
      this.ship01 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'spaceship', 0, 30).setOrigin(0,0);
      this.ship02 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*4, 'spaceship', 0, 20).setOrigin(0,0);
      this.smallship = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4, 'smallship', 0, 10).setOrigin(0,0);
      this.smallship.moveSpeed += 2;
      this.smallship.points = 60;
      //flip if going the opposite dir
      if(!this.ship01.dirLeft){
         this.ship01.flipX = true;
      }
      if(!this.ship02.dirLeft){
         this.ship02.flipX = true;
      }
      if(!this.ship03.dirLeft){
         this.ship03.flipX = true;
      }
      if(!this.smallship.dirLeft){
         this.smallship.flipX = true;
      }
      //CREATE anim
      this.anims.create({
         key: 'explode',
         frames: this.anims.generateFrameNumbers('explosion', { start:0, end:9, first:0}), 
         frameRate: 30
      });
      // initialize score
      this.p1Score = 0;
      //display score
      this.scoreConfig = {
         fontFamily: 'Courier',
         fontSize: '28px',
         backgroundColor: '#F3B141',
         color: '#843605',
         align: 'right',
         padding: {
            top: 5,
            bottom: 5,
         },
         fixedWidth:100
      }
      this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, this.scoreConfig);
      //game over flag
      this.gameOver = false;
      
      // 60 sec times
      this.scoreConfig.fixedWidth = 0;
      //display score
      let timerConfig = {
         fontFamily: 'Courier',
         fontSize: '28px',
         backgroundColor: '#F3B141',
         color: '#843605',
         align: 'right',
         padding: {
            top: 5,
            bottom: 5,
         },
         fixedWidth:100
      }

      this.startTime = game.settings.gameTimer;
      this.callTimer = this.time.addEvent({delay:1000, callback: this.timerTick, callbackScope: this, loop:true});
      this.timerRight = this.add.text(game.config.width - borderPadding*13, borderUISize + borderPadding*2, this.startTime/1000, timerConfig);
      //speed up after 30secs
      this.speedUp = this.time.addEvent({delay:30000, callback: this.speedUpShips, callbackScope: this, loop:true});
   }

   update() {
      //check key input for restart
      if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)){
         this.scene.restart();
      }
      if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)){
         this.scene.start("menuScene");
      }
      this.meteors.tilePositionX -=4;
      this.starfield.tilePositionX -=20;
      if(!this.gameOver) {
         this.p1Rocket.update();
         this.p2Rocket.update();
         this.ship01.update();               // update spaceships (x3)
         this.ship02.update();
         this.ship03.update();
         this.smallship.update();
      }
      //check collision
      if(this.checkCollision(this.p1Rocket, this.smallship)) {
         this.p1Rocket.reset();
         this.shipExplode(this.smallship);
      }
      if(this.checkCollision(this.p1Rocket, this.ship03)) {
         this.p1Rocket.reset();
         this.shipExplode(this.ship03);
      }
      if(this.checkCollision(this.p1Rocket, this.ship02)) {
         this.p1Rocket.reset();
         this.shipExplode(this.ship02);
      }
      if(this.checkCollision(this.p1Rocket, this.ship01)) {
         this.p1Rocket.reset();
         this.shipExplode(this.ship01);
      }
      //check collision
      if(this.checkCollision(this.p2Rocket, this.smallship)) {
         this.p2Rocket.reset();
         this.shipExplode(this.smallship);
      }
      if(this.checkCollision(this.p2Rocket, this.ship03)) {
         this.p2Rocket.reset();
         this.shipExplode(this.ship03);
      }
      if(this.checkCollision(this.p2Rocket, this.ship02)) {
         this.p2Rocket.reset();
         this.shipExplode(this.ship02);
      }
      if(this.checkCollision(this.p2Rocket, this.ship01)) {
         this.p2Rocket.reset();
         this.shipExplode(this.ship01);
      }
      if(this.startTime == 0) {
         this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', this.scoreConfig).setOrigin(0.5);
         this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ← for Menu',this.scoreConfig).setOrigin(0.5);
         this.gameOver = true;
      }
   }

   timerTick(){
      if(this.startTime > 0){
         this.startTime -= 1000;
      }
      
      //update time
      this.timerRight.text = this.startTime/1000;
   }

   speedUpShips(){
      this.ship01.moveSpeed += 4;
      this.ship02.moveSpeed += 4;
      this.ship03.moveSpeed += 4;
      this.smallship.moveSpeed += 4;
   }
   checkCollision(rocket, ship) {
      //simple AABB checking
      if (rocket.x < ship.x + ship.width && rocket.x +rocket.width > ship.x &&
          rocket.y < ship.y + ship.height && rocket.y + rocket.height > ship.y) {
             return true;
      } else {
         return false;
      }
   }

   shipExplode(ship){
      //hide ship
      ship.alpha = 0;
      //create explosion
      let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0,0);
      boom.anims.play('explode');
      boom.on('animationcomplete', ()=> {
         ship.reset();
         ship.alpha = 1;
         boom.destroy();
      });
      //score add and reprint
      this.p1Score+=ship.points;
      this.startTime += ship.points*100;
      this.timerRight.text = Math.ceil(this.startTime/1000);
      this.scoreLeft.text = this.p1Score;
      this.sound.play('sfx_explosion');
   }
}

