import Player from "./Player.js";
import Resource from "./Resource.js";

export default class MainScene extends Phaser.Scene {
    constructor() 
    {
        super("MainScene");
    }

    preload()
    {
        // this.load.atlas('female','assets/images/female.png','assets/images/female_atlas.json');
        // this.load.animation('female_anim','assets/images/female_anim.json');
        // moved in a statid method in Player
        Player.preload(this);
        Resource.preload(this);
        this.load.image('tiles','assets/images/RPG Nature Tileset.png');
        this.load.tilemapTiledJSON('map','assets/images/map.json');
        //load our resources
        // this.load.atlas('resources','../assets/images/resources.png', '../assets/images/resources_atlas.json');
    }

    create()
    { 
        const map = this.make.tilemap({key: 'map'});
        this.map = map;
        const tileset = map.addTilesetImage('RPG Nature Tileset','tiles',32,32,0,0);
        //now we draw our layers
        const layer1 = map.createLayer('Tile Layer 1', tileset,0,0);// grass only
        const layer2 = map.createLayer('Tile Layer 2', tileset,0,0);// water n gravel
        // now we add collide property to the water edges
        layer1.setCollisionByProperty({collides:true});
        this.matter.world.convertTilemapLayer(layer1);

        // let tree = new Phaser.Physics.Matter.Sprite(this.matter.world, 50, 50, 'resources', 'tree');
        // let rock = new Phaser.Physics.Matter.Sprite(this.matter.world, 150, 150, 'resources', 'rock');
        // this.add.existing(tree);
        // this.add.existing(rock);
        // tree.setStatic(true);
        // rock.setStatic(true);//can't knock them flying

        // this.addResources();
        this.map.getObjectLayer('Resources').objects.forEach(resource =>new Resource({scene:this,resource}));

        //   this.player = new Phaser.Physics.Matter.Sprite(this.matter.world, 100, 100, 'female', 'townsfolk_f_idle_1');
        this.player = new Player({scene:this, x: 200, y: 200, texture:'female', frame:'townsfolk_f_idle_1'});
        this.add.existing(this.player);// now it's added to the scene
        this.matter.world.setBounds(0,0, 512, 512);
        this.player.inputKeys = this.input.keyboard.addKeys(
            {
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D
        });
    }


    update()
    {
        this.player.update();// calls the update () from Player
    }
}