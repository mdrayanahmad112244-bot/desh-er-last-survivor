const config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    physics: { default: 'arcade', arcade: { gravity: { y: 0 } } },
    scene: { preload, create, update }
};

const game = new Phaser.Game(config);
let player, cursors, bullets;

function preload() {
    // Ekhane player ar background image load hobe
}

function create() {
    // Player Character (Green Square for now)
    player = this.add.rectangle(400, 300, 40, 40, 0x00ff00);
    this.physics.add.existing(player);
    player.body.setCollideWorldBounds(true);

    cursors = this.input.keyboard.createCursorKeys();

    // Shooting setup
    bullets = this.physics.add.group();

    this.input.on('pointerdown', (pointer) => {
        let bullet = bullets.create(player.x, player.y, null);
        bullet.setDisplaySize(10, 10);
        bullet.setTint(0xff0000);
        this.physics.moveTo(bullet, pointer.x, pointer.y, 300);
    });
}

function update() {
    // Movement Logic
    if (cursors.left.isDown) player.x -= 5;
    if (cursors.right.isDown) player.x += 5;
    if (cursors.up.isDown) player.y -= 5;
    if (cursors.down.isDown) player.y += 5;
}
