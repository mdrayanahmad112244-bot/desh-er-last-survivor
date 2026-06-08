const config = {
    type: Phaser.AUTO,
    parent: 'game-container',
    width: window.innerWidth,
    height: window.innerHeight,
    physics: { default: 'arcade', arcade: { gravity: { y: 0 } } },
    scene: { create, update }
};

const game = new Phaser.Game(config);
let player, bullets, enemies;

function create() {
    // ব্যাকগ্রাউন্ড গ্রিড ডিজাইন
    this.add.grid(window.innerWidth/2, window.innerHeight/2, window.innerWidth, window.innerHeight, 40, 40, 0x000000, 1, 0x112233, 0.5);

    // প্লেয়ার ক্যারেক্টার (সবুজ বক্স)
    player = this.add.rectangle(150, 150, 40, 40, 0x00ffaa);
    this.physics.add.existing(player);
    player.body.setCollideWorldBounds(true);

    // গুলির গ্রুপ
    bullets = this.physics.add.group();

    // ৩টি এনিমি বট (লাল বক্স)
    enemies = this.physics.add.group();
    for (let i = 0; i < 3; i++) {
        let ex = Phaser.Math.Between(100, window.innerWidth - 100);
        let ey = Phaser.Math.Between(100, window.innerHeight - 100);
        let enemy = this.add.rectangle(ex, ey, 35, 35, 0xff3333);
        enemies.add(enemy);
        this.physics.add.existing(enemy);
    }

    // গুলি এনিমিকে আঘাত করলে এনিমি ধ্বংস হবে
    this.physics.add.overlap(bullets, enemies, (bullet, enemy) => {
        bullet.destroy();
        enemy.destroy();
        alert("💥 TARGET ELIMINATED! শত্রু খতম!");
    });

    // স্ক্রিনে সিঙ্গেল ট্যাপ/ক্লিক করলে গুলি বের হবে
    this.input.on('pointerdown', (pointer) => {
        let bullet = bullets.create(player.x, player.y, null);
        bullet.setDisplaySize(12, 12);
        bullet.setTint(0xffcc00); // হলুদ ট্রেসার বুলেট
        this.physics.moveTo(bullet, pointer.x, pointer.y, 500);
        
        this.time.delayedCall(800, () => bullet.destroy());
    });
}

function update() {
    // আঙুল বা পয়েন্টার স্ক্রিনে চেপে ধরে রাখলে প্লেয়ার নড়বে
    if (this.input.activePointer.isDown) {
        let pointer = this.input.activePointer;
        
        // প্লেয়ার থেকে আঙুলের দূরত্ব কতটুকু তা মাপার লজিক
        let distance = Phaser.Math.Distance.Between(player.x, player.y, pointer.x, pointer.y);
        
        // দূরত্ব যদি ৩৫ পিক্সেলের বেশি হয়, কেবল তখনই প্লেয়ার আঙুলের দিকে দৌড়াবে
        if (distance > 35) {
            this.physics.moveToObject(player, pointer, 240);
        } else {
            // আঙুলের একদম কাছাকাছি চলে আসলে প্লেয়ার লাফালাফি না করে থেমে যাবে
            player.body.setVelocity(0, 0);
        }
    } else {
        // স্ক্রিন থেকে আঙুল তুলে নিলে প্লেয়ার থেমে যাবে
        player.body.setVelocity(0, 0);
    }
}
