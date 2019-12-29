var Engine = Matter.Engine;
var World = Matter.World;
var Bodies = Matter.Bodies;

var engine;
var world;
var boxes = [];

var bottom_ground;
var graphicalSlider;

var col;

function setup() {
    createCanvas(400, 400);
    engine = Engine.create();
    world = engine.world;
    Engine.run(engine);

    graphicalSlider = createSlider(0, 100, 50);
    graphicalSlider.position(40, 365);
    graphicalSlider.input = map(engine.world.gravity, graphicalSlider.min, graphicalSlider.max, 0, 1);

    var options = {
        isStatic: true
    }
    col = random(0, 255);
    bottom_ground = Bodies.rectangle(200, height - 50, width, 10, options);
    World.add(world, bottom_ground);
}

function mousePressed() {
    if (mouseY < 350) {
        boxes.push(new Box(mouseX, mouseY, random(10, 40), random(10, 40)));
    }
}

function draw() {
    background(col);
    var Value = graphicalSlider.value();

    for (var i = 0; i < boxes.length; i++) {
        boxes[i].show();
    }
    rectMode(CENTER);
    rect(bottom_ground.position.x, bottom_ground.position.y, width, 10);
}

function Box(x, y, w, h, options) {
    var options = {
        friction: random(0,1),
        restitution: random(0,1,1),
    }

    this.body = Bodies.rectangle(x, y, w, h, options);
    this.w = w;
    this.h = h;
    World.add(world, this.body);

    this.show = function () {
        var pos = this.body.position;
        var angle = this.body.angle;

        push();
        translate(pos.x, pos.y);
        rotate(angle);
        rectMode(CENTER);
        strokeWeight(1);
        stroke(255);
        fill(127);
        rect(0, 0, this.w, this.h);
        pop();
    }
}