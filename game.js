const config = {
    type: Phaser.AUTO,
    parent: 'game-container',
    width: window.innerWidth,
    height: window.innerHeight,
    physics: { default: 'arcade', arcade: { gravity: { y: 0 } } },
    scene: { create, update }
};

const game = new Phaser.Game(config);
let player, bullets;

function create() {
    // Player Character
    player = this.add.rectangle(100, 100, 50, 50, 0x00ff00);
    this.physics.add.existing(player);
    player.body.setCollideWorldBounds(true);

    // Bullet Group
    bullets = this.physics.add.group();

    // Shooting: Screen e jekhane touch korba, oikhane guli jabe
    this.input.on('pointerdown', (pointer) => {
        let bullet = bullets.create(player.x, player.y, null);
        bullet.setDisplaySize(15, 15);
        bullet.setTint(0xff0000);
        this.physics.moveTo(bullet, pointer.x, pointer.y, 400);
        
        // Bullet auto destroy
        this.time.delayedCall(1000, () => bullet.destroy());
    });
}

function update() {
    // Touch to move: Player character touch-er dike jabe
    if (this.input.activePointer.isDown) {
        let pointer = this.input.activePointer;
        this.physics.moveToObject(player, pointer, 200);
    } else {
        player.body.setVelocity(0, 0);
    }
}
