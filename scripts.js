document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.container');
    const generateButton = document.getElementById('generate-brick');

    // Array of hardcoded brick image paths
    const brickImages = [
        // Black bricks
        'bricks/Black/brickBlack01.png',
        'bricks/Black/brickBlack02.png',
        'bricks/Black/brickBlack03.png',
        'bricks/Black/brickBlack04.png',
        'bricks/Black/brickBlack05.png',
        'bricks/Black/brickBlack06.png',
        'bricks/Black/brickBlack07.png',
        'bricks/Black/brickBlack08.png',
        'bricks/Black/brickBlack09.png',
        'bricks/Black/brickBlack10.png',
        'bricks/Black/brickBlack11.png',
        'bricks/Black/brickBlack12.png',
        'bricks/Black/brickBlack13.png',
        'bricks/Black/brickBlack14.png',
        'bricks/Black/brickBlack15.png',
        'bricks/Black/brickBlack16.png',

        // Blue bricks
        'bricks/Blue/brickBlue01.png',
        'bricks/Blue/brickBlue02.png',
        'bricks/Blue/brickBlue03.png',
        'bricks/Blue/brickBlue04.png',
        'bricks/Blue/brickBlue05.png',
        'bricks/Blue/brickBlue06.png',
        'bricks/Blue/brickBlue07.png',
        'bricks/Blue/brickBlue08.png',
        'bricks/Blue/brickBlue09.png',
        'bricks/Blue/brickBlue10.png',
        'bricks/Blue/brickBlue11.png',
        'bricks/Blue/brickBlue12.png',
        'bricks/Blue/brickBlue13.png',
        'bricks/Blue/brickBlue14.png',
        'bricks/Blue/brickBlue15.png',
        'bricks/Blue/brickBlue16.png',

        // Green bricks
        'bricks/Green/brickGreen01.png',
        'bricks/Green/brickGreen02.png',
        'bricks/Green/brickGreen03.png',
        'bricks/Green/brickGreen04.png',
        'bricks/Green/brickGreen05.png',
        'bricks/Green/brickGreen06.png',
        'bricks/Green/brickGreen07.png',
        'bricks/Green/brickGreen08.png',
        'bricks/Green/brickGreen09.png',
        'bricks/Green/brickGreen10.png',
        'bricks/Green/brickGreen11.png',
        'bricks/Green/brickGreen12.png',
        'bricks/Green/brickGreen13.png',
        'bricks/Green/brickGreen14.png',
        'bricks/Green/brickGreen15.png',
        'bricks/Green/brickGreen16.png',

        // Red bricks
        'bricks/Red/brickRed01.png',
        'bricks/Red/brickRed02.png',
        'bricks/Red/brickRed03.png',
        'bricks/Red/brickRed04.png',
        'bricks/Red/brickRed05.png',
        'bricks/Red/brickRed06.png',
        'bricks/Red/brickRed07.png',
        'bricks/Red/brickRed08.png',
        'bricks/Red/brickRed09.png',
        'bricks/Red/brickRed10.png',
        'bricks/Red/brickRed11.png',
        'bricks/Red/brickRed12.png',
        'bricks/Red/brickRed13.png',
        'bricks/Red/brickRed14.png',
        'bricks/Red/brickRed15.png',
        'bricks/Red/brickRed16.png',

        // Special bricks
        'bricks/Special/brickSpecial01.png',
        'bricks/Special/brickSpecial02.png',
        'bricks/Special/brickSpecial03.png',
        'bricks/Special/brickSpecial04.png',
        'bricks/Special/brickSpecial05.png',
        'bricks/Special/brickSpecial06.png',
        'bricks/Special/brickSpecial07.png',
        'bricks/Special/brickSpecial08.png',
        'bricks/Special/brickSpecial09.png',
        'bricks/Special/brickSpecial10.png',

        // Yellow bricks
        'bricks/Yellow/brickYellow01.png',
        'bricks/Yellow/brickYellow02.png',
        'bricks/Yellow/brickYellow03.png',
        'bricks/Yellow/brickYellow04.png',
        'bricks/Yellow/brickYellow05.png',
        'bricks/Yellow/brickYellow06.png',
        'bricks/Yellow/brickYellow07.png',
        'bricks/Yellow/brickYellow08.png',
        'bricks/Yellow/brickYellow09.png',
        'bricks/Yellow/brickYellow10.png',
        'bricks/Yellow/brickYellow11.png',
        'bricks/Yellow/brickYellow12.png',
        'bricks/Yellow/brickYellow13.png',
        'bricks/Yellow/brickYellow14.png',
        'bricks/Yellow/brickYellow15.png',
        'bricks/Yellow/brickYellow16.png',
    ];

    // Matter.js module aliases
    const Engine = Matter.Engine,
        Render = Matter.Render,
        World = Matter.World,
        Bodies = Matter.Bodies,
        Constraint = Matter.Constraint,
        Mouse = Matter.Mouse,
        MouseConstraint = Matter.MouseConstraint,
        Events = Matter.Events,
        Composite = Matter.Composite;

    // Create a Matter.js engine with increased iterations
    const engine = Engine.create();
    engine.positionIterations = 10;
    engine.velocityIterations = 10;
    engine.constraintIterations = 4;
    engine.world.gravity.y = 0.8;

    // Create a renderer
    const render = Render.create({
        element: container,
        engine: engine,
        options: {
            width: container.clientWidth,
            height: container.clientHeight,
            wireframes: false,
            background: 'transparent'
        }
    });

    // Function to get a random brick image URL from the hardcoded list
    function getRandomBrick() {
        const randomIndex = Math.floor(Math.random() * brickImages.length);
        return brickImages[randomIndex];
    }

    // Function to create a new brick
    function createBrick() {
        const brickImage = new Image();
        brickImage.src = getRandomBrick();
        brickImage.onload = () => {
            const naturalWidth = brickImage.width;
            const naturalHeight = brickImage.height;
            const scale = 1; // Natural scale
            const width = naturalWidth * scale;
            const height = naturalHeight * scale;
            const x = Math.random() * (container.clientWidth - width);
            const y = 0; // Start at the top of the container

            const brick = Bodies.rectangle(x + width / 2, y + height / 2, width, height, {
                render: {
                    sprite: {
                        texture: brickImage.src,
                        xScale: scale,
                        yScale: scale
                    }
                },
                friction: 0.9,
                restitution: 0.1,
                frictionAir: 0.02,
                density: 0.001,
                chamfer: { radius: 5 }
            });

            World.add(engine.world, brick);
        };
    }

    // Add 5 initial bricks
    for (let i = 0; i < 5; i++) {
        createBrick();
    }

    // Add new brick on button click
    generateButton.addEventListener('click', createBrick);

    // Add mouse control
    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
            stiffness: 0.2,
            render: {
                visible: false
            }
        }
    });

    World.add(engine.world, mouseConstraint);

    // Keep the bricks inside the container bounds
    const bounds = [
        Bodies.rectangle(container.clientWidth / 2, -20, container.clientWidth, 40, { isStatic: true }), // Top
        Bodies.rectangle(container.clientWidth / 2, container.clientHeight + 20, container.clientWidth, 40, { isStatic: true }), // Bottom
        Bodies.rectangle(-20, container.clientHeight / 2, 40, container.clientHeight, { isStatic: true }), // Left
        Bodies.rectangle(container.clientWidth + 20, container.clientHeight / 2, 40, container.clientHeight, { isStatic: true }) // Right
    ];

    World.add(engine.world, bounds);

    // Run the engine with a fixed time step for better stability
    function update() {
        Engine.update(engine, 1000 / 60); // Update with a fixed time step (60 FPS)
        Render.world(render);
        requestAnimationFrame(update);
    }

    update();

    // Store constraints for sticking bricks together
    const constraints = [];

    // Handle mouse drag events to create sticking effect
    Events.on(mouseConstraint, 'enddrag', event => {
        const body = event.body;
        if (body) {
            const allBodies = Composite.allBodies(engine.world);
            allBodies.forEach(otherBody => {
                if (otherBody !== body && otherBody.label === 'Rectangle Body') {
                    const dx = Math.abs(body.position.x - otherBody.position.x);
                    const dy = Math.abs(body.position.y - otherBody.position.y);

                    // Adjust threshold for sticking bricks on top of each other
                    if (dx < (body.bounds.max.x - body.bounds.min.x) / 2 && 
                        dy < (body.bounds.max.y - body.bounds.min.y) / 2 + (otherBody.bounds.max.y - otherBody.bounds.min.y) / 2) {
                        // Create a constraint to keep the bricks together
                        const constraint = Constraint.create({
                            bodyA: body,
                            bodyB: otherBody,
                            pointA: { x: 0, y: body.bounds.max.y - body.bounds.min.y },
                            pointB: { x: 0, y: -(otherBody.bounds.max.y - otherBody.bounds.min.y) },
                            stiffness: 0.8,
                            length: 0,
                            render: {
                                visible: false
                            }
                        });
                        World.add(engine.world, constraint);
                        constraints.push(constraint);
                    }
                }
            });
        }
    });

    // Handle right-click to break apart bricks
    document.addEventListener('contextmenu', event => {
        event.preventDefault();
        constraints.forEach(constraint => {
            World.remove(engine.world, constraint);
        });
        constraints.length = 0;
    });
});
