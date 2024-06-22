// apertura popup sito Jhonny-Five
document.getElementById('infoButton').addEventListener('click', function() {
    // Calcola le dimensioni della finestra popup
    var width = 800;
    var height = 600;

    // Calcola la posizione centrale
    var left = (window.screen.width / 2) - (width / 2);
    var top = (window.screen.height / 2) - (height / 2);

    // Apre una finestra popup centrata sullo schermo
    window.open(
        'https://johnny-five.io/',
        '_blank',
        `toolbar=0,location=0,menubar=0,width=${width},height=${height},top=${top},left=${left}`
    );
});
// -------------------------------

// Inizializza il workspace di Blockly quando il DOM è pronto
document.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM completamente caricato e analizzato');
    window.workspace = Blockly.inject('blocklyDiv', {
        toolbox: document.getElementById('toolbox')
    });
    initThreeJS();
});

blocklyDiv.style.height=''+eval(window.innerHeight - 50)+'px';
threeDiv.style.height=''+eval(window.innerHeight - 50)+'px';


function initThreeJS() {
/*    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(570, 800);
    document.getElementById('threeDiv').appendChild(renderer.domElement);

    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 5;

    function animate() {
        requestAnimationFrame(animate);
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        renderer.render(scene, camera);
    }
    animate(); */
}


// inizio caricamento simulazione braccio robotico Tree.JS //
// Impostazione di base
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
    renderer.setSize(575, 885);
    document.getElementById('threeDiv').appendChild(renderer.domElement);

// Luce
const ambientLight = new THREE.AmbientLight(0x404040); // luce soffusa
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 10, 7.5).normalize();
scene.add(directionalLight);

// Funzione per creare i segmenti del braccio
const createSegment = (radius, length, color) => {
    const geometry = new THREE.CylinderGeometry(radius, radius, length, 32);
    const material = new THREE.MeshStandardMaterial({ color: color });
    const segment = new THREE.Mesh(geometry, material);
    segment.rotation.z = Math.PI / 2; // Ruota il cilindro di 90 gradi
    return segment;
};

// Creazione base del braccio
const base = createSegment(1, 2, 0x888888);
scene.add(base);

// Creazione dell'articolazione sferica
const createJoint = (radius) => {
    const geometry = new THREE.SphereGeometry(radius, 32, 32);
    const material = new THREE.MeshStandardMaterial({ color: 0xffff00 });
    const joint = new THREE.Mesh(geometry, material);
    return joint;
};

// Creazione segmenti
const upperArm = createSegment(0.5, 4, 0x00ff00);
upperArm.position.y = 2;
const upperJoint = createJoint(0.6);
upperJoint.position.y = 4;

const forearm = createSegment(0.4, 3, 0x0000ff);
forearm.position.y = 1.5;
const lowerJoint = createJoint(0.5);
lowerJoint.position.y = 3;

// Assemblaggio del braccio
base.add(upperArm);
upperArm.add(upperJoint);
upperJoint.add(forearm);
forearm.add(lowerJoint);

camera.position.z = 10;

// Controlli
const controls = new function() {
    this.baseRotation = 0;
    this.upperArmRotation = 0;
    this.forearmRotation = 0;
};

const gui = new dat.GUI();
gui.add(controls, 'baseRotation', -180, 180).onChange(value => {
    base.rotation.y = THREE.MathUtils.degToRad(value);
});
gui.add(controls, 'upperArmRotation', -90, 90).onChange(value => {
    upperArm.rotation.z = THREE.MathUtils.degToRad(value);
});
gui.add(controls, 'forearmRotation', -90, 90).onChange(value => {
    forearm.rotation.z = THREE.MathUtils.degToRad(value);
});

// Animazione
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();
// fine caricamento simulazione braccio robotico Tree.JS //


  Blockly.Blocks['console_log'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("log to console")
          .appendField(new Blockly.FieldTextInput("default"), "TEXT");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(160);
      this.setTooltip("");
      this.setHelpUrl("");
    }
  };

  Blockly.JavaScript['console_log'] = function(block) {
    var text = block.getFieldValue('TEXT');
    var code = 'console.log(' + JSON.stringify(text) + ');\n';
    return code;
  };

Blockly.JavaScript['move_joint'] = function(block) {
    const joint = block.getFieldValue('JOINT');
    const angle = block.getFieldValue('ANGLE');
    return `moveJoint('${joint}', ${angle});\n`;
};

// Implementazione della funzione per muovere i giunti
function moveJoint(joint, angle) {
    // Codice per muovere i giunti del braccio robotico
    // In questo esempio, modificheremo solo la rotazione di un cubo per dimostrare il concetto
    console.log(`Muovere giunto ${joint} all'angolo ${angle}`);
    // Aggiornamento del rendering 3D per mostrare il movimento
}

Blockly.defineBlocksWithJsonArray([
    // Blocco per muovere il motore
    {
        "type": "move_motor",
        "message0": "muovi motore %1 velocità %2",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "DIRECTION",
                "options": [
                    ["avanti", "FORWARD"],
                    ["indietro", "BACKWARD"]
                ]
            },
            {
                "type": "field_number",
                "name": "SPEED",
                "value": 50,
                "min": 0,
                "max": 255
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": "#A65C81",
        "tooltip": "Muove il motore nella direzione specificata alla velocità indicata.",
        "helpUrl": ""
    },
    // Blocco per accendere il LED
    {
        "type": "led_on",
        "message0": "accendi LED su pin %1",
        "args0": [
            {
                "type": "field_number",
                "name": "PIN",
                "value": 13,
                "min": 0,
                "max": 13
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": "#A65C81",
        "tooltip": "Accende il LED sul pin specificato.",
        "helpUrl": ""
    },
    // Blocco per spegnere il LED
    {
        "type": "led_off",
        "message0": "spegni LED su pin %1",
        "args0": [
            {
                "type": "field_number",
                "name": "PIN",
                "value": 13,
                "min": 0,
                "max": 13
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": "#A65C81",
        "tooltip": "Spegne il LED sul pin specificato.",
        "helpUrl": ""
    },
    // Blocco per leggere un sensore
    {
        "type": "read_sensor",
        "message0": "leggi sensore su pin %1",
        "args0": [
            {
                "type": "field_number",
                "name": "PIN",
                "value": 0,
                "min": 0,
                "max": 13
            }
        ],
        "output": "Number",
        "colour": "#A65C81",
        "tooltip": "Legge il valore dal sensore sul pin specificato.",
        "helpUrl": ""
    },
    // Blocco per controllare un servo
    {
        "type": "control_servo",
        "message0": "muovi servo su pin %1 angolo %2",
        "args0": [
            {
                "type": "field_number",
                "name": "PIN",
                "value": 10,
                "min": 0,
                "max": 13
            },
            {
                "type": "field_number",
                "name": "ANGLE",
                "value": 90,
                "min": 0,
                "max": 180
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": "#A65C81",
        "tooltip": "Muove il servo sul pin specificato all'angolo indicato.",
        "helpUrl": ""
    },
    // Blocco per attivare/disattivare un relay
    {
        "type": "toggle_relay",
        "message0": "attiva/disattiva relay su pin %1 stato %2",
        "args0": [
            {
                "type": "field_number",
                "name": "PIN",
                "value": 8,
                "min": 0,
                "max": 13
            },
            {
                "type": "field_dropdown",
                "name": "STATE",
                "options": [
                    ["attiva", "ON"],
                    ["disattiva", "OFF"]
                ]
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": "#A65C81",
        "tooltip": "Attiva o disattiva il relay sul pin specificato.",
        "helpUrl": ""
    },
    // Blocco per selezionare il tipo di scheda elettronica
    {
        "type": "select_board",
        "message0": "seleziona scheda %1",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "BOARD",
                "options": [
                    ["Arduino", "ARDUINO"],
                    ["Raspberry Pi", "RASPBERRY_PI"],
                    ["BeagleBone", "BEAGLEBONE"],
                    ["Intel Galileo", "INTEL_GALILEO"],
                    ["Tessel 2", "TESSEL_2"],
                    ["Particle Photon", "PARTICLE_PHOTON"],
                    ["Particle Electron", "PARTICLE_ELECTRON"],
                    ["Pinoccio", "PINOCCIO"],
                    ["Electric Imp", "ELECTRIC_IMP"],
                    ["SparkFun ESP8266", "SPARKFUN_ESP8266"],
                    ["SparkFun ESP32", "SPARKFUN_ESP32"]
                ]
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": "#A65C81",
        "tooltip": "Seleziona il tipo di scheda utilizzata.",
        "helpUrl": ""
    },
    {
        "type": "move_joint",
        "message0": "muovi giunto %1 angolo %2",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "JOINT",
                "options": [
                    ["base", "BASE"],
                    ["spalla", "SHOULDER"],
                    ["gomito", "ELBOW"],
                    ["polso", "WRIST"]
                ]
            },
            {
                "type": "field_number",
                "name": "ANGLE",
                "value": 90,
                "min": 0,
                "max": 180
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": "#A65C81",
        "tooltip": "Muove il giunto specificato all'angolo indicato.",
        "helpUrl": ""
    }
]);

// Definizione della logica JavaScript per i blocchi personalizzati
Blockly.JavaScript['move_motor'] = function(block) {
    const direction = block.getFieldValue('DIRECTION');
    const speed = block.getFieldValue('SPEED');
    return `moveMotor('${direction}', ${speed});\n`;
};

Blockly.JavaScript['led_on'] = function(block) {
    const pin = block.getFieldValue('PIN');
    return `ledOn(${pin});\n`;
};

Blockly.JavaScript['led_off'] = function(block) {
    const pin = block.getFieldValue('PIN');
    return `ledOff(${pin});\n`;
};

Blockly.JavaScript['read_sensor'] = function(block) {
    const pin = block.getFieldValue('PIN');
    return [`readSensor(${pin})`, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['control_servo'] = function(block) {
    const pin = block.getFieldValue('PIN');
    const angle = block.getFieldValue('ANGLE');
    return `moveServo(${pin}, ${angle});\n`;
};

Blockly.JavaScript['toggle_relay'] = function(block) {
    const pin = block.getFieldValue('PIN');
    const state = block.getFieldValue('STATE');
    return `toggleRelay(${pin}, '${state}');\n`;
};

// Funzioni di implementazione per Johnny-Five
function moveMotor(direction, speed) {
    const five = require("johnny-five");
    const board = new five.Board();

    board.on("ready", function() {
        const motor = new five.Motor({
            pin: 9
        });

        if (direction === 'FORWARD') {
            motor.forward(speed);
        } else if (direction === 'BACKWARD') {
            motor.reverse(speed);
        }
    });
}

function ledOn(pin) {
    const five = require("johnny-five");
    const board = new five.Board();

    board.on("ready", function() {
        const led = new five.Led(pin);
        led.on();
    });
}

function ledOff(pin) {
    const five = require("johnny-five");
    const board = new five.Board();

    board.on("ready", function() {
        const led = new five.Led(pin);
        led.off();
    });
}

function readSensor(pin) {
    const five = require("johnny-five");
    const board = new five.Board();

    board.on("ready", function() {
        const sensor = new five.Sensor({
            pin: pin,
            freq: 250
        });

        sensor.on("data", function() {
            console.log(this.value);
        });
    });
}

function moveServo(pin, angle) {
    const five = require("johnny-five");
    const board = new five.Board();

    board.on("ready", function() {
        const servo = new five.Servo(pin);
        servo.to(angle);
    });
}

function toggleRelay(pin, state) {
    const five = require("johnny-five");
    const board = new five.Board();

    board.on("ready", function() {
        const relay = new five.Relay(pin);
        if (state === 'ON') {
            relay.on();
        } else {
            relay.off();
        }
    });
}

Blockly.JavaScript['select_board'] = function(block) {
    const board = block.getFieldValue('BOARD');
    return `selectBoard('${board}');\n`;
};

// Implementazione della funzione per selezionare la scheda
function selectBoard(boardType) {
    const five = require("johnny-five");
    let board;

    switch (boardType) {
        case 'ARDUINO':
            board = new five.Board();
            break;
        case 'RASPBERRY_PI':
            board = new five.Board({
                io: new (require("raspi-io"))()
            });
            break;
        case 'BEAGLEBONE':
            board = new five.Board({
                io: new (require("beaglebone-io"))()
            });
            break;
        case 'INTEL_GALILEO':
            board = new five.Board({
                io: new (require("galileo-io"))()
            });
            break;
        case 'TESSEL_2':
            board = new five.Board({
                io: new (require("tessel-io"))()
            });
            break;
        case 'PARTICLE_PHOTON':
            board = new five.Board({
                io: new (require("particle-io"))()
            });
            break;
        case 'PARTICLE_ELECTRON':
            board = new five.Board({
                io: new (require("particle-io"))()
            });
            break;
        case 'PINOCCIO':
            board = new five.Board({
                io: new (require("pinoccio-io"))()
            });
            break;
        case 'ELECTRIC_IMP':
            board = new five.Board({
                io: new (require("imp-io"))()
            });
            break;
        case 'SPARKFUN_ESP8266':
            board = new five.Board({
                io: new (require("firmata"))()
            });
            break;
        case 'SPARKFUN_ESP32':
            board = new five.Board({
                io: new (require("firmata"))()
            });
            break;
        default:
            console.log('Scheda non supportata');
            return;
    }

    board.on("ready", function() {
        console.log(`${boardType} è pronto`);
    });
}

function moveJoint(joint, angle) {
    // Codice per muovere i giunti del braccio robotico
    // In questo esempio, modificheremo solo la rotazione di un cubo per dimostrare il concetto
    console.log(`Muovere giunto ${joint} all'angolo ${angle}`);
    // Aggiornamento del rendering 3D per mostrare il movimento
}

