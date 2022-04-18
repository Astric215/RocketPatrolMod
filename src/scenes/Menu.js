class Menu extends Phaser.Scene {
   constructor() {
      super('menuScene');
   }
   
   preload() {
      this.load.audio('sfx_select', './assets/blip_select12.wav');
      this.load.audio('sfx_explosion', './assets/explosion38.wav');
      this.load.audio('sfx_rocket', './assets/rocket_shot.wav');
   }
   create() {
      let menuConfig = {
         fontFamily: 'Courier',
         fontSize: '28px',
         backgroundColor: '#F3B141',
         color: '#843605',
         align: 'right',
         paddig: {
            top: 5,
            bottom: 5,
         },
         fixedWidth: 0
      }
      this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'ROCKET PATROL', menuConfig).setOrigin(0.5);
      this.add.text(game.config.width/2, game.config.height/2, 'P1 Use A and D to move & (W) to fire', menuConfig).setOrigin(0.5);
      this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 'P2 Use ← → arrows to move & ↑ to fire', menuConfig).setOrigin(0.5);
      menuConfig.backgroundColor = '#00FF00';
      menuConfig.color = '#000';
      this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding*5, '1 player:', menuConfig).setOrigin(0.5);
      this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding*9, 'Press ← for Novice or → for Expert', menuConfig).setOrigin(0.5);
      this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding*13, 'Co-op 2 player:', menuConfig).setOrigin(0.5);
      this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding*17, 'Press ↑ for Novice or ↓ for Expert', menuConfig).setOrigin(0.5);
      keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
      keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
      keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
      keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
      //this.add.text(20,20, "Rocket Patrol Menu");
      //this.scene.start("playScene");
   }
   update() {
      if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
         //easy mode
         game.settings = {
            spaceshipSpeed: 3,
            gameTimer: 60000,
            coop: false
         }
         this.sound.play('sfx_select');
         this.scene.start('playScene');
      }
      if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
         //hard mode
         game.settings = {
            spaceshipSpeed: 4,
            gameTimer: 45000,
            coop: false
         }
         this.sound.play('sfx_select');
         this.scene.start('playScene');
      }
      if (Phaser.Input.Keyboard.JustDown(keyUP)) {
         //easy mode
         game.settings = {
            spaceshipSpeed: 3,
            gameTimer: 60000,
            coop: true
         }
         this.sound.play('sfx_select');
         this.scene.start('playScene');
      }
      if (Phaser.Input.Keyboard.JustDown(keyDOWN)) {
         //hard mode
         game.settings = {
            spaceshipSpeed: 4,
            gameTimer: 45000,
            coop: true
         }
         this.sound.play('sfx_select');
         this.scene.start('playScene');
      }
   }
}