//var workspace;

// Funzione per generare il codice
function generateCode() {
    try {
        var code = Blockly.JavaScript.workspaceToCode(window.workspace);
        console.log(code);
        return code;
    } catch (error) {
        console.error('Errore nella generazione del codice:', error);
    }
}

// Funzione per caricare il progetto
window.uploadProject = function(event) {
    try {
        const file = event.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = function(e) {
            const code = e.target.result;
            // Converti il testo caricato in XML
            const xml = Blockly.Xml.textToDom(code);
            // Cancella il workspace corrente
            window.workspace.clear();
            // Carica il progetto nel workspace di Blockly
            Blockly.Xml.domToWorkspace(xml, window.workspace);
            //console.log("Codice caricato:", code);
            //alert("Codice caricato:\n" + code);
        };
        reader.readAsText(file);
    } catch (error) {
        console.error('Errore nel caricamento del progetto:', error);
    }
}

window.downloadProject = function() {
    const xml = Blockly.Xml.workspaceToDom(window.workspace);
    const xmlText = Blockly.Xml.domToText(xml);
    const blob = new Blob([xmlText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'project.roboide';
    a.click();
    URL.revokeObjectURL(url);
};

    window.runRendering = function() {
        const code = generateCode();
        try {
            eval(code); // Esegui il codice generato
            alert("Rendering in esecuzione.");
        } catch (error) {
            console.error("Errore nell'esecuzione del codice:", error);
        }
    };

    window.stopRendering = function() {
        alert("Rendering fermato.");
    };


// Definizione blocchi personalizzati Johnny-Five
Blockly.Blocks['accelerometer'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Accelerometer")
            .appendField(new Blockly.FieldTextInput("A0"), "PIN");
        this.appendStatementInput("DO")
            .appendField("do");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#ff9900');
        this.setTooltip("Read data from an accelerometer");
        this.setHelpUrl("");
    }
};

Blockly.JavaScript['accelerometer'] = function(block) {
    const pin = block.getFieldValue('PIN');
    const branch = Blockly.JavaScript.statementToCode(block, 'DO');
    let code = `const accelerometer = new five.Accelerometer("${pin}");\naccelerometer.on("data", function() {\n${branch}});\n`;
    return code;
};

Blockly.Blocks['altimeter'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Altimeter")
            .appendField(new Blockly.FieldTextInput("A0"), "PIN");
        this.appendStatementInput("DO")
            .appendField("do");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#ff9900');
        this.setTooltip("Read data from an altimeter");
        this.setHelpUrl("");
    }
};

Blockly.JavaScript['altimeter'] = function(block) {
    const pin = block.getFieldValue('PIN');
    const branch = Blockly.JavaScript.statementToCode(block, 'DO');
    let code = `const altimeter = new five.Altimeter({ pin: "${pin}" });\naltimeter.on("data", function() {\n${branch}});\n`;
    return code;
};

Blockly.Blocks['barometer'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Barometer")
            .appendField(new Blockly.FieldTextInput("A0"), "PIN");
        this.appendStatementInput("DO")
            .appendField("do");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#ff9900');
        this.setTooltip("Read data from a barometer");
        this.setHelpUrl("");
    }
};

Blockly.JavaScript['barometer'] = function(block) {
    const pin = block.getFieldValue('PIN');
    const branch = Blockly.JavaScript.statementToCode(block, 'DO');
    let code = `const barometer = new five.Barometer({ pin: "${pin}" });\nbarometer.on("data", function() {\n${branch}});\n`;
    return code;
};


Blockly.Blocks['board'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Board")
            .appendField(new Blockly.FieldTextInput("default"), "PORT");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#ff9900');
        this.setTooltip("Initialize the board with a specific port");
        this.setHelpUrl("");
    }
};

Blockly.JavaScript['board'] = function(block) {
    const port = block.getFieldValue('PORT');
    let code;
    if (port === "default") {
        code = 'const board = new five.Board();\n';
    } else {
        code = `const board = new five.Board({ port: "${port}" });\n`;
    }
    return code;
};

Blockly.Blocks['boards'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Boards")
            .appendField(new Blockly.FieldTextInput("A,B"), "BOARDS");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#ff9900');
        this.setTooltip("Initialize multiple boards");
        this.setHelpUrl("");
    }
};

Blockly.JavaScript['boards'] = function(block) {
    const boards = block.getFieldValue('BOARDS').split(',').map(board => board.trim());
    const boardsStr = JSON.stringify(boards);
    let code = `const boards = new five.Boards(${boardsStr});\nboards.on("ready", function() {\n  // Add your multi-board code here\n});\n`;
    return code;
};

Blockly.Blocks['button'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Button")
            .appendField(new Blockly.FieldTextInput("2"), "PIN");
        this.appendStatementInput("ON_PRESS")
            .appendField("on press");
        this.appendStatementInput("ON_RELEASE")
            .appendField("on release");
        this.appendStatementInput("ON_HOLD")
            .appendField("on hold");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#ff9900');
        this.setTooltip("Detect button press, release, and hold events");
        this.setHelpUrl("");
    }
};

Blockly.JavaScript['button'] = function(block) {
    const pin = block.getFieldValue('PIN');
    const onPress = Blockly.JavaScript.statementToCode(block, 'ON_PRESS');
    const onRelease = Blockly.JavaScript.statementToCode(block, 'ON_RELEASE');
    const onHold = Blockly.JavaScript.statementToCode(block, 'ON_HOLD');
    
    let code = `const button = new five.Button(${pin});\n`;
    
    if (onPress) {
        code += `button.on("press", function() {\n${onPress}});\n`;
    }
    if (onRelease) {
        code += `button.on("release", function() {\n${onRelease}});\n`;
    }
    if (onHold) {
        code += `button.on("hold", function() {\n${onHold}});\n`;
    }
    
    return code;
};


    Blockly.Blocks['servo'] = {
        init: function() {
            this.appendDummyInput()
                .appendField("Servo")
                .appendField(new Blockly.FieldTextInput("10"), "PIN")
                .appendField("to")
                .appendField(new Blockly.FieldNumber(90, 0, 180), "ANGLE");
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour('#ff9900');
            this.setTooltip("Control Servo");
            this.setHelpUrl("");
        }
    };

    Blockly.JavaScript['servo'] = function(block) {
        const pin = block.getFieldValue('PIN');
        const angle = block.getFieldValue('ANGLE');
        let code = `const servo = new five.Servo(${pin});\nservo.to(${angle});\n`;
        return code;
    };

Blockly.Blocks['sensor'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Sensor")
            .appendField(new Blockly.FieldTextInput("A0"), "PIN");
        this.appendStatementInput("DO")
            .appendField("do");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#ff9900');
        this.setTooltip("Read data from a sensor");
        this.setHelpUrl("");
    }
};

Blockly.JavaScript['sensor'] = function(block) {
    const pin = block.getFieldValue('PIN');
    const branch = Blockly.JavaScript.statementToCode(block, 'DO');
    let code = `const sensor = new five.Sensor("${pin}");\nsensor.on("data", function() {\n${branch}});\n`;
    return code; 
};

Blockly.Blocks['relay'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Relay")
            .appendField(new Blockly.FieldTextInput("10"), "PIN")
            .appendField(new Blockly.FieldDropdown([["on", "on"], ["off", "off"], ["toggle", "toggle"]]), "STATE");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#ff9900');
        this.setTooltip("Control a relay");
        this.setHelpUrl("");
    }
};

Blockly.JavaScript['relay'] = function(block) {
    const pin = block.getFieldValue('PIN');
    const state = block.getFieldValue('STATE');
    let code = `const relay = new five.Relay(${pin});\nrelay.${state}();\n`;
    return code;
};


Blockly.Blocks['compass'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Compass")
            .appendField(new Blockly.FieldDropdown([
                ["BNO055", "BNO055"],
                ["HMC5883L", "HMC5883L"]
            ]), "CONTROLLER");
        this.appendStatementInput("DO")
            .appendField("do");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#ff9900');
        this.setTooltip("Read data from a compass");
        this.setHelpUrl("");
    }
};

Blockly.JavaScript['compass'] = function(block) {
    const controller = block.getFieldValue('CONTROLLER');
    const branch = Blockly.JavaScript.statementToCode(block, 'DO');
    let code = `const compass = new five.Compass({ controller: "${controller}" });\ncompass.on("data", function() {\n${branch}});\n`;
    return code;
};

Blockly.Blocks['esc'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("ESC")
            .appendField("Device")
            .appendField(new Blockly.FieldDropdown([
                ["FORWARD_REVERSE", "FORWARD_REVERSE"],
                ["FORWARD", "FORWARD"]
            ]), "DEVICE")
            .appendField("Controller")
            .appendField(new Blockly.FieldDropdown([
                ["PCA9685", "PCA9685"],
                ["DEFAULT", "DEFAULT"]
            ]), "CONTROLLER")
            .appendField("Pin")
            .appendField(new Blockly.FieldTextInput("1"), "PIN");
        this.appendStatementInput("DO")
            .appendField("do");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#ff9900');
        this.setTooltip("Control an Electronic Speed Controller (ESC)");
        this.setHelpUrl("");
    }
};

Blockly.JavaScript['esc'] = function(block) {
    const device = block.getFieldValue('DEVICE');
    const controller = block.getFieldValue('CONTROLLER');
    const pin = block.getFieldValue('PIN');
    const branch = Blockly.JavaScript.statementToCode(block, 'DO');
    
    let code = `const esc = new five.ESC({
  device: "${device}",
  controller: "${controller}",
  pin: ${pin}
});\nesc.on("ready", function() {\n${branch}});\n`;
    
    return code;
};

Blockly.Blocks['escs'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("ESCs")
            .appendField("Pins")
            .appendField(new Blockly.FieldTextInput("3,5"), "PINS");
        this.appendStatementInput("DO")
            .appendField("do");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#ff9900');
        this.setTooltip("Control multiple Electronic Speed Controllers (ESCs)");
        this.setHelpUrl("");
    }
};

Blockly.JavaScript['escs'] = function(block) {
    const pins = block.getFieldValue('PINS').split(',').map(pin => pin.trim());
    const branch = Blockly.JavaScript.statementToCode(block, 'DO');
    
    let code = `const escs = new five.ESCs(${JSON.stringify(pins)});\nescs.on("ready", function() {\n${branch}});\n`;
    
    return code;
};

Blockly.Blocks['expander'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Expander")
            .appendField("Controller")
            .appendField(new Blockly.FieldDropdown([
                ["MCP23017", "MCP23017"]
            ]), "CONTROLLER")
            .appendField("Address")
            .appendField(new Blockly.FieldTextInput("0x20"), "ADDRESS");
        this.appendStatementInput("DO")
            .appendField("do");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#ff9900');
        this.setTooltip("Create an MCP23017 Expander");
        this.setHelpUrl("");
    }
};

Blockly.JavaScript['expander'] = function(block) {
    const controller = block.getFieldValue('CONTROLLER');
    const address = block.getFieldValue('ADDRESS');
    const branch = Blockly.JavaScript.statementToCode(block, 'DO');
    
    let code = `const expander = new five.Expander({
  controller: "${controller}",
  address: "${address}"
});\nexpander.on("ready", function() {\n${branch}});\n`;
    
    return code;
};

// da inserire i comandi derivati dalla libreria aggiuntiva in .js denominata fn.js contenente tutta una serie di funzioni aggiuntive richiamabili in jhonny-five
//
//
// --------------------------------------------------------------------------------------------------------------------------------------------------------------

Blockly.Blocks['gps'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("GPS")
            .appendField("Port")
            .appendField(new Blockly.FieldDropdown([
                ["HW_SERIAL0", "HW_SERIAL0"],
                ["HW_SERIAL1", "HW_SERIAL1"],
                ["HW_SERIAL2", "HW_SERIAL2"],
                ["HW_SERIAL3", "HW_SERIAL3"]
            ]), "PORT")
            .appendField("Baud")
            .appendField(new Blockly.FieldTextInput("4800"), "BAUD");
        this.appendStatementInput("DO")
            .appendField("do");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#ff9900');
        this.setTooltip("Create a GPS Module");
        this.setHelpUrl("");
    }
};

Blockly.JavaScript['gps'] = function(block) {
    const port = block.getFieldValue('PORT');
    const baud = block.getFieldValue('BAUD');
    const branch = Blockly.JavaScript.statementToCode(block, 'DO');
    
    let code = `const gps = new five.GPS({
  port: this.io.SERIAL_PORT_IDs.${port},
  baud: ${baud}
});\ngps.on("change", function() {\n  console.log("position");\n  console.log("  latitude   : ", this.latitude);\n  console.log("  longitude  : ", this.longitude);\n  console.log("  altitude   : ", this.altitude);\n  console.log("--------------------------------------");\n});\ngps.on("navigation", function() {\n  console.log("navigation");\n  console.log("  speed   : ", this.speed);\n  console.log("  course  : ", this.course);\n  console.log("--------------------------------------");\n});\n${branch}`;
    
    return code;
};

Blockly.Blocks['gyroscope'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Gyroscope")
            .appendField(new Blockly.FieldTextInput("A0"), "PIN");
        this.appendStatementInput("DO")
            .appendField("do");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#ff9900');
        this.setTooltip("Read data from a gyroscope");
        this.setHelpUrl("");
    }
};

Blockly.JavaScript['gyroscope'] = function(block) {
    const pin = block.getFieldValue('PIN');
    const branch = Blockly.JavaScript.statementToCode(block, 'DO');
    let code = `const gyroscope = new five.Gyroscope("${pin}");\ngyroscope.on("data", function() {\n${branch}});\n`;
    return code;
};

Blockly.Blocks['hygrometer'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Hygrometer")
            .appendField("Controller")
            .appendField(new Blockly.FieldDropdown([
                ["HTU21D", "HTU21D"],
                ["DHT11_I2C_NANO_BACKPACK", "DHT11_I2C_NANO_BACKPACK"]
            ]), "CONTROLLER");
        this.appendStatementInput("DO")
            .appendField("do");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#ff9900');
        this.setTooltip("Create a Hygrometer");
        this.setHelpUrl("");
    }
};

Blockly.JavaScript['hygrometer'] = function(block) {
    const controller = block.getFieldValue('CONTROLLER');
    const branch = Blockly.JavaScript.statementToCode(block, 'DO');
    
    let code = `const hygrometer = new five.Hygrometer({
  controller: "${controller}"
});\nhygrometer.on("change", function() {\n  console.log(this.relativeHumidity + " %");\n});\n${branch}`;
    
    return code;
};

Blockly.Blocks['imu'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("IMU")
            .appendField("Controller")
            .appendField(new Blockly.FieldDropdown([
                ["MPU6050", "MPU6050"],
                ["MPU9150", "MPU9150"]
            ]), "CONTROLLER")
            .appendField("Address")
            .appendField(new Blockly.FieldTextInput("0x68"), "ADDRESS")
            .appendField("Frequency")
            .appendField(new Blockly.FieldNumber(100, 1), "FREQ");
        this.appendStatementInput("DO")
            .appendField("do");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#ff9900');
        this.setTooltip("Create an IMU");
        this.setHelpUrl("");
    }
};

Blockly.JavaScript['imu'] = function(block) {
    const controller = block.getFieldValue('CONTROLLER');
    const address = block.getFieldValue('ADDRESS');
    const freq = block.getFieldValue('FREQ');
    const branch = Blockly.JavaScript.statementToCode(block, 'DO');
    
    let code = `const imu = new five.IMU({
  controller: "${controller}",
  address: "${address}",
  freq: ${freq}
});\nimu.on("change", function() {\n  console.log("Acceleration: ", this.acceleration);\n  console.log("Gyro: ", this.gyro);\n  console.log("Temperature: ", this.temperature);\n});\n${branch}`;
    
    return code;
};

Blockly.Blocks['joystick'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Joystick")
            .appendField("Pins")
            .appendField(new Blockly.FieldTextInput("A0,A1"), "PINS")
            .appendField("Invert Y")
            .appendField(new Blockly.FieldCheckbox("TRUE"), "INVERTY");
        this.appendStatementInput("DO")
            .appendField("do");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#ff9900');
        this.setTooltip("Create a Joystick");
        this.setHelpUrl("");
    }
};

Blockly.JavaScript['joystick'] = function(block) {
    const pins = block.getFieldValue('PINS').split(',').map(pin => pin.trim());
    const invertY = block.getFieldValue('INVERTY') === 'TRUE';
    const branch = Blockly.JavaScript.statementToCode(block, 'DO');
    
    let code = `const joy = new five.Joystick({ 
  pins: ${JSON.stringify(pins)}, 
  invertY: ${invertY} 
});\njoy.on("change", function() {\n  console.log("Joystick");\n  console.log("  x: ", this.x);\n  console.log("  y: ", this.y);\n});\n${branch}`;
    
    return code;
};

Blockly.Blocks['keypad'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Keypad")
            .appendField("Controller")
            .appendField(new Blockly.FieldDropdown([
                ["MPR121QR2_SHIELD", "MPR121QR2_SHIELD"],
                ["MPR121QR2", "MPR121QR2"]
            ]), "CONTROLLER")
            .appendField("Pin")
            .appendField(new Blockly.FieldTextInput("A0"), "PIN")
            .appendField("Length")
            .appendField(new Blockly.FieldNumber(16, 1), "LENGTH");
        this.appendDummyInput()
            .appendField("Keys")
            .appendField(new Blockly.FieldTextInput("△,◁,☐,▷,▽"), "KEYS");
        this.appendStatementInput("DO")
            .appendField("do");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#ff9900');
        this.setTooltip("Create a Keypad");
        this.setHelpUrl("");
    }
};

Blockly.JavaScript['keypad'] = function(block) {
    const controller = block.getFieldValue('CONTROLLER');
    const pin = block.getFieldValue('PIN');
    const length = block.getFieldValue('LENGTH');
    const keys = block.getFieldValue('KEYS').split(',').map(key => key.trim());
    const branch = Blockly.JavaScript.statementToCode(block, 'DO');
    
    let code = `const keypad = new five.Keypad({
  controller: "${controller}",
  pin: "${pin}",
  length: ${length},
  keys: ${JSON.stringify(keys)}
});\nkeypad.on("press", function(key) {\n  console.log("Key pressed:", key);\n});\n${branch}`;
    
    return code;
};

Blockly.Blocks['lcd'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("LCD")
            .appendField("Controller")
            .appendField(new Blockly.FieldDropdown([
                ["PCF8574", "PCF8574"],
                ["PCF8574A", "PCF8574A"]
            ]), "CONTROLLER")
            .appendField("Pins")
            .appendField(new Blockly.FieldTextInput("7,8,9,10,11,12"), "PINS")
            .appendField("Backlight Pin")
            .appendField(new Blockly.FieldTextInput("13"), "BACKLIGHT")
            .appendField("Rows")
            .appendField(new Blockly.FieldNumber(2, 1), "ROWS")
            .appendField("Cols")
            .appendField(new Blockly.FieldNumber(16, 1), "COLS");
        this.appendStatementInput("DO")
            .appendField("do");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#ff9900');
        this.setTooltip("Create an LCD");
        this.setHelpUrl("");
    }
};

Blockly.JavaScript['lcd'] = function(block) {
    const controller = block.getFieldValue('CONTROLLER');
    const pins = block.getFieldValue('PINS').split(',').map(pin => parseInt(pin.trim()));
    const backlight = parseInt(block.getFieldValue('BACKLIGHT'));
    const rows = block.getFieldValue('ROWS');
    const cols = block.getFieldValue('COLS');
    const branch = Blockly.JavaScript.statementToCode(block, 'DO');
    
    let code = `const lcd = new five.LCD({
  controller: "${controller}",
  pins: ${JSON.stringify(pins)},
  backlight: ${backlight},
  rows: ${rows},
  cols: ${cols}
});\n${branch}`;
    
    return code;
};

    Blockly.Blocks['led'] = {
        init: function() {
            this.appendDummyInput()
                .appendField("LED")
                .appendField(new Blockly.FieldTextInput("13"), "PIN")
                .appendField(new Blockly.FieldDropdown([["on", "on"], ["off", "off"]]), "STATE");
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour('#ff9900');
            this.setTooltip("Control LED");
            this.setHelpUrl("");
        }
    };

    Blockly.JavaScript['led'] = function(block) {
        const pin = block.getFieldValue('PIN');
        const state = block.getFieldValue('STATE');
        let code = `const led = new five.Led(${pin});\nled.${state}();\n`;
        return code;
    };

Blockly.Blocks['led_controller'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("LED")
            .appendField("Controller")
            .appendField(new Blockly.FieldDropdown([
                ["PCA9685", "PCA9685"]
            ]), "CONTROLLER")
            .appendField("Pin")
            .appendField(new Blockly.FieldNumber(0, 0), "PIN");
        this.appendStatementInput("DO")
            .appendField("do");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#ff9900');
        this.setTooltip("Create an LED");
        this.setHelpUrl("");
    }
};

Blockly.JavaScript['led_controller'] = function(block) {
    const controller = block.getFieldValue('CONTROLLER');
    const pin = block.getFieldValue('PIN');
    const branch = Blockly.JavaScript.statementToCode(block, 'DO');
    
    let code = `const led = new five.Led({
  controller: "${controller}",
  pin: ${pin}
});\n${branch}`;
    
    return code;
};

Blockly.Blocks['led_digits'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("LED Digits")
            .appendField("Controller")
            .appendField(new Blockly.FieldDropdown([
                ["HT16K33", "HT16K33"]
            ]), "CONTROLLER");
        this.appendDummyInput()
            .appendField("Data Pin")
            .appendField(new Blockly.FieldNumber(2, 0), "DATA_PIN")
            .appendField("Clock Pin")
            .appendField(new Blockly.FieldNumber(3, 0), "CLOCK_PIN")
            .appendField("CS Pin")
            .appendField(new Blockly.FieldNumber(4, 0), "CS_PIN");
        this.appendStatementInput("DO")
            .appendField("do");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#ff9900');
        this.setTooltip("Create an LED Digits display");
        this.setHelpUrl("");
    }
};

Blockly.JavaScript['led_digits'] = function(block) {
    const controller = block.getFieldValue('CONTROLLER');
    const dataPin = block.getFieldValue('DATA_PIN');
    const clockPin = block.getFieldValue('CLOCK_PIN');
    const csPin = block.getFieldValue('CS_PIN');
    const branch = Blockly.JavaScript.statementToCode(block, 'DO');
    
    let code = `const digits = new five.Led.Digits({
  controller: "${controller}",
  pins: {
    data: ${dataPin},
    clock: ${clockPin},
    cs: ${csPin}
  }
});\n${branch}`;
    
    return code;
};

Blockly.Blocks['led_matrix'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("LED Matrix")
            .appendField("Controller")
            .appendField(new Blockly.FieldDropdown([
                ["HT16K33", "HT16K33"]
            ]), "CONTROLLER");
        this.appendDummyInput()
            .appendField("Data Pin")
            .appendField(new Blockly.FieldNumber(2, 0), "DATA_PIN")
            .appendField("Clock Pin")
            .appendField(new Blockly.FieldNumber(3, 0), "CLOCK_PIN")
            .appendField("CS Pin")
            .appendField(new Blockly.FieldNumber(4, 0), "CS_PIN");
        this.appendStatementInput("DO")
            .appendField("do");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#ff9900');
        this.setTooltip("Create an LED Matrix display");
        this.setHelpUrl("");
    }
};

Blockly.JavaScript['led_matrix'] = function(block) {
    const controller = block.getFieldValue('CONTROLLER');
    const dataPin = block.getFieldValue('DATA_PIN');
    const clockPin = block.getFieldValue('CLOCK_PIN');
    const csPin = block.getFieldValue('CS_PIN');
    const branch = Blockly.JavaScript.statementToCode(block, 'DO');
    
    let code = `const matrix = new five.Led.Matrix({
  controller: "${controller}",
  pins: {
    data: ${dataPin},
    clock: ${clockPin},
    cs: ${csPin}
  }
});\n${branch}`;
    
    return code;
};

Blockly.Blocks['led_rgb'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("LED RGB")
            .appendField("Controller")
            .appendField(new Blockly.FieldDropdown([
                ["PCA9685", "PCA9685"]
            ]), "CONTROLLER");
        this.appendDummyInput()
            .appendField("Red Pin")
            .appendField(new Blockly.FieldNumber(2, 0), "RED_PIN")
            .appendField("Green Pin")
            .appendField(new Blockly.FieldNumber(1, 0), "GREEN_PIN")
            .appendField("Blue Pin")
            .appendField(new Blockly.FieldNumber(0, 0), "BLUE_PIN");
        this.appendStatementInput("DO")
            .appendField("do");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#ff9900');
        this.setTooltip("Create an LED RGB");
        this.setHelpUrl("");
    }
};

Blockly.JavaScript['led_rgb'] = function(block) {
    const controller = block.getFieldValue('CONTROLLER');
    const redPin = block.getFieldValue('RED_PIN');
    const greenPin = block.getFieldValue('GREEN_PIN');
    const bluePin = block.getFieldValue('BLUE_PIN');
    const branch = Blockly.JavaScript.statementToCode(block, 'DO');
    
    let code = `const rgb = new five.Led.RGB({
  controller: "${controller}",
  pins: {
    red: ${redPin},
    green: ${greenPin},
    blue: ${bluePin}
  }
});\n${branch}`;
    
    return code;
};

Blockly.Blocks['leds'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("LEDs")
            .appendField("Pins")
            .appendField(new Blockly.FieldTextInput("9, 10, 11"), "PINS");
        this.appendStatementInput("DO")
            .appendField("do");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#ff9900');
        this.setTooltip("Create multiple LEDs");
        this.setHelpUrl("");
    }
};

Blockly.JavaScript['leds'] = function(block) {
    const pins = block.getFieldValue('PINS').split(',').map(pin => parseInt(pin.trim()));
    const branch = Blockly.JavaScript.statementToCode(block, 'DO');
    
    let code = `const leds = new five.Leds([${pins.join(', ')}]);\n${branch}`;
    
    return code;
};

Blockly.Blocks['light'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Light Sensor")
            .appendField("Pin")
            .appendField(new Blockly.FieldTextInput("A0"), "PIN");
        this.appendStatementInput("DO")
            .appendField("do");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#ff9900');
        this.setTooltip("Create a Light Sensor");
        this.setHelpUrl("");
    }
};

Blockly.JavaScript['light'] = function(block) {
    const pin = block.getFieldValue('PIN');
    const branch = Blockly.JavaScript.statementToCode(block, 'DO');
    
    let code = `const light = new five.Light("${pin}");\n${branch}`;
    
    return code;
};

Blockly.Blocks['motion'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Motion Sensor")
            .appendField("Controller")
            .appendField(new Blockly.FieldDropdown([
                ["GP2Y0D810Z0F", "GP2Y0D810Z0F"]
            ]), "CONTROLLER");
        this.appendDummyInput()
            .appendField("Pin")
            .appendField(new Blockly.FieldTextInput("A0"), "PIN");
        this.appendStatementInput("DO")
            .appendField("do");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#ff9900');
        this.setTooltip("Create a Motion Sensor");
        this.setHelpUrl("");
    }
};

Blockly.JavaScript['motion'] = function(block) {
    const controller = block.getFieldValue('CONTROLLER');
    const pin = block.getFieldValue('PIN');
    const branch = Blockly.JavaScript.statementToCode(block, 'DO');
    
    let code = `const motion = new five.Motion({
  controller: "${controller}",
  pin: "${pin}"
});\n${branch}`;
    
    return code;
};

Blockly.Blocks['motor'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Motor")
            .appendField("Controller")
            .appendField(new Blockly.FieldDropdown([
                ["PCA9685", "PCA9685"]
            ]), "CONTROLLER");
        this.appendDummyInput()
            .appendField("Frequency")
            .appendField(new Blockly.FieldNumber(200, 1), "FREQUENCY");
        this.appendDummyInput()
            .appendField("PWM Pin")
            .appendField(new Blockly.FieldNumber(0, 0), "PWM_PIN");
        this.appendDummyInput()
            .appendField("DIR Pin")
            .appendField(new Blockly.FieldNumber(0, 0), "DIR_PIN");
        this.appendDummyInput()
            .appendField("CDIR Pin")
            .appendField(new Blockly.FieldNumber(0, 0), "CDIR_PIN");
        this.appendDummyInput()
            .appendField("Brake Pin")
            .appendField(new Blockly.FieldNumber(0, 0), "BRAKE_PIN");
        this.appendDummyInput()
            .appendField("Current Pin")
            .appendField(new Blockly.FieldTextInput("A0"), "CURRENT_PIN");
        this.appendDummyInput()
            .appendField("Current Frequency")
            .appendField(new Blockly.FieldNumber(250, 1), "CURRENT_FREQ");
        this.appendDummyInput()
            .appendField("Current Threshold")
            .appendField(new Blockly.FieldNumber(10, 1), "CURRENT_THRESHOLD");
        this.appendStatementInput("DO")
            .appendField("do");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#ff9900');
        this.setTooltip("Create a Motor with advanced settings");
        this.setHelpUrl("");
    }
};

Blockly.JavaScript['motor'] = function(block) {
    const controller = block.getFieldValue('CONTROLLER');
    const frequency = block.getFieldValue('FREQUENCY');
    const pwmPin = block.getFieldValue('PWM_PIN');
    const dirPin = block.getFieldValue('DIR_PIN');
    const cdirPin = block.getFieldValue('CDIR_PIN');
    const brakePin = block.getFieldValue('BRAKE_PIN');
    const currentPin = block.getFieldValue('CURRENT_PIN');
    const currentFreq = block.getFieldValue('CURRENT_FREQ');
    const currentThreshold = block.getFieldValue('CURRENT_THRESHOLD');
    const branch = Blockly.JavaScript.statementToCode(block, 'DO');
    
    let code = `const motor = new five.Motor({
  controller: "${controller}",
  frequency: ${frequency},
  pins: {
    pwm: ${pwmPin},
    dir: ${dirPin},
    cdir: ${cdirPin},
    brake: ${brakePin},
    current: {
      pin: "${currentPin}",
      freq: ${currentFreq},
      threshold: ${currentThreshold}
    }
  }
});\n${branch}`;
    
    return code;
};

Blockly.Blocks['motors'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Motors");
        this.appendStatementInput("MOTORS")
            .setCheck("Array")
            .appendField("Motors");
        this.appendStatementInput("DO")
            .appendField("do");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#ff9900');
        this.setTooltip("Create multiple Motors with advanced settings");
        this.setHelpUrl("");
    }
};

Blockly.JavaScript['motors'] = function(block) {
    var motors = Blockly.JavaScript.statementToCode(block, 'MOTORS');
    var statements = Blockly.JavaScript.statementToCode(block, 'DO');

    let code = `var motors = new five.Motors([\n${motors}\n]);\n${statements}`;
    return code;
};

Blockly.Blocks['motor_forward'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Motor forward")
            .appendField(new Blockly.FieldNumber(128, 0, 255), "SPEED");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#ff9900');
        this.setTooltip("Set motor forward with speed");
        this.setHelpUrl("");
    }
};

Blockly.JavaScript['motor_forward'] = function(block) {
    const speed = block.getFieldValue('SPEED');
    let code = `motor.forward(${speed});\n`;
    return code;
};

Blockly.Blocks['motor_reverse'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Motor reverse")
            .appendField(new Blockly.FieldNumber(128, 0, 255), "SPEED");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#ff9900');
        this.setTooltip("Set motor reverse with speed");
        this.setHelpUrl("");
    }
};

Blockly.JavaScript['motor_reverse'] = function(block) {
    const speed = block.getFieldValue('SPEED');
    let code = `motor.reverse(${speed});\n`;
    return code;
};

Blockly.Blocks['motor_start'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Motor start")
            .appendField(new Blockly.FieldNumber(128, 0, 255), "SPEED");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#ff9900');
        this.setTooltip("Start motor with speed");
        this.setHelpUrl("");
    }
};

Blockly.JavaScript['motor_start'] = function(block) {
    const speed = block.getFieldValue('SPEED');
    let code = `motor.start(${speed});\n`;
    return code;
};

Blockly.Blocks['motor_stop'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Motor stop");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#ff9900');
        this.setTooltip("Stop motor");
        this.setHelpUrl("");
    }
};

Blockly.JavaScript['motor_stop'] = function(block) {
    let code = `motor.stop();\n`;
    return code;
};

Blockly.Blocks['motor_brake'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Motor brake");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#ff9900');
        this.setTooltip("Brake motor");
        this.setHelpUrl("");
    }
};

Blockly.JavaScript['motor_brake'] = function(block) {
    let code = `motor.brake();\n`;
    return code;
};

Blockly.Blocks['motor_release'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Motor release brake");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#ff9900');
        this.setTooltip("Release brake and resume motor");
        this.setHelpUrl("");
    }
};

Blockly.JavaScript['motor_release'] = function(block) {
    let code = `motor.release();\n`;
    return code;
};

Blockly.Blocks['multi'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Multi")
            .appendField("Controller")
            .appendField(new Blockly.FieldDropdown([
                ["BMP180", "BMP180"]
            ]), "CONTROLLER");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#ff9900');
        this.setTooltip("Create a Multi sensor with specified controller");
        this.setHelpUrl("");
    }
};

Blockly.JavaScript['multi'] = function(block) {
    const controller = block.getFieldValue('CONTROLLER');
    let code = `new five.Multi({ controller: "${controller}" });\n`;
    return code;
};

Blockly.Blocks['multi_get_temperature'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Get Multi Temperature");
        this.setOutput(true, "Number");
        this.setColour('#ff9900');
        this.setTooltip("Get temperature from Multi sensor");
        this.setHelpUrl("");
    }
};

Blockly.JavaScript['multi_get_temperature'] = function(block) {
    let code = `multi.temperature\n`;
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.Blocks['multi_get_pressure'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Get Multi Pressure");
        this.setOutput(true, "Number");
        this.setColour('#ff9900');
        this.setTooltip("Get pressure from Multi sensor");
        this.setHelpUrl("");
    }
};

Blockly.JavaScript['multi_get_pressure'] = function(block) {
    let code = `multi.pressure\n`;
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.Blocks['multi_get_altitude'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Get Multi Altitude");
        this.setOutput(true, "Number");
        this.setColour('#ff9900');
        this.setTooltip("Get altitude from Multi sensor");
        this.setHelpUrl("");
    }
};

Blockly.JavaScript['multi_get_altitude'] = function(block) {
    let code = `multi.altitude\n`;
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.Blocks['piezo'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Piezo")
            .appendField(new Blockly.FieldTextInput("9"), "PIN")
            .appendField(new Blockly.FieldDropdown([["play", "play"], ["stop", "stop"]]), "ACTION");
        this.appendValueInput("TUNE")
            .setCheck("String")
            .appendField("tune");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#ff9900');
        this.setTooltip("Control a piezo");
        this.setHelpUrl("");
    }
};

Blockly.JavaScript['piezo'] = function(block) {
    const pin = block.getFieldValue('PIN');
    const action = block.getFieldValue('ACTION');
    const tune = Blockly.JavaScript.valueToCode(block, 'TUNE', Blockly.JavaScript.ORDER_ATOMIC) || 'null';
    if (action === 'play') {
       let code = `const piezo = new five.Piezo(${pin});\npiezo.${action}(${tune});\n`;
       return code;
    } else {
        let code = `const piezo = new five.Piezo(${pin});\npiezo.${action}();\n`;
        return code;
    }
};

Blockly.Blocks['pin_digital'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Digital Pin")
            .appendField(new Blockly.FieldNumber(13), "PIN");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#ff9900');
        this.setTooltip("Create a Digital Pin");
        this.setHelpUrl("");
    }
};

Blockly.JavaScript['pin_digital'] = function(block) {
    const pin = block.getFieldValue('PIN');
    let code = `new five.Pin(${pin});\n`;
    return code;
};

Blockly.Blocks['pin_analog'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Analog Pin")
            .appendField(new Blockly.FieldTextInput("A0"), "PIN");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#ff9900');
        this.setTooltip("Create an Analog Pin");
        this.setHelpUrl("");
    }
};

Blockly.JavaScript['pin_analog'] = function(block) {
    const pin = block.getFieldValue('PIN');
    let code = `new five.Pin("${pin}");\n`;
    return code;
};

Blockly.Blocks['pin_digital_config'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Digital Pin Config")
            .appendField(new Blockly.FieldNumber(13), "PIN");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#ff9900');
        this.setTooltip("Create a Digital Pin with configuration");
        this.setHelpUrl("");
    }
};

Blockly.JavaScript['pin_digital_config'] = function(block) {
    const pin = block.getFieldValue('PIN');
    let code = `new five.Pin({ pin: ${pin} });\n`;
    return code;
};

Blockly.Blocks['pin_analog_config'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Analog Pin Config")
            .appendField(new Blockly.FieldTextInput("A0"), "PIN");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#ff9900');
        this.setTooltip("Create an Analog Pin with configuration");
        this.setHelpUrl("");
    }
};

Blockly.JavaScript['pin_analog_config'] = function(block) {
    const pin = block.getFieldValue('PIN');
    let code = `new five.Pin({ pin: "${pin}" });\n`;
    return code;
};

Blockly.Blocks['pin_analog_as_digital'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Analog As Digital Pin")
            .appendField(new Blockly.FieldNumber(14), "PIN");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#ff9900');
        this.setTooltip("Create an Analog Pin used as Digital Pin");
        this.setHelpUrl("");
    }
};

Blockly.JavaScript['pin_analog_as_digital'] = function(block) {
    const pin = block.getFieldValue('PIN');
    let code = `new five.Pin({ pin: ${pin}, type: "digital" });\n`;
    return code;
};

Blockly.Blocks['sonar'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Sonar")
            .appendField(new Blockly.FieldTextInput("A0"), "PIN");
        this.appendStatementInput("DO")
            .appendField("do");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#ff9900');
        this.setTooltip("Read data from a sonar sensor");
        this.setHelpUrl("");
    }
};

Blockly.JavaScript['sonar'] = function(block) {
    const pin = block.getFieldValue('PIN');
    const branch = Blockly.JavaScript.statementToCode(block, 'DO');
    let code = `const sonar = new five.Sonar("${pin}");\nsonar.on("data", function() {\n${branch}});\n`;
    return code;
};

Blockly.Blocks['thermometer'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Thermometer")
            .appendField(new Blockly.FieldTextInput("A0"), "PIN");
        this.appendStatementInput("DO")
            .appendField("do");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#ff9900');
        this.setTooltip("Read data from a thermometer");
        this.setHelpUrl("");
    }
};

Blockly.JavaScript['thermometer'] = function(block) {
    const pin = block.getFieldValue('PIN');
    const branch = Blockly.JavaScript.statementToCode(block, 'DO');
    let code = `const thermometer = new five.Thermometer({ controller: "LM35", pin: "${pin}" });\nthermometer.on("data", function() {\n${branch}});\n`;
    return code;
};

Blockly.Blocks['potentiometer'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Potentiometer")
            .appendField(new Blockly.FieldTextInput("A0"), "PIN");
        this.appendStatementInput("DO")
            .appendField("do");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#ff9900');
        this.setTooltip("Read data from a potentiometer");
        this.setHelpUrl("");
    }
};

Blockly.JavaScript['potentiometer'] = function(block) {
    const pin = block.getFieldValue('PIN');
    const branch = Blockly.JavaScript.statementToCode(block, 'DO');
    let code = `const potentiometer = new five.Sensor({ pin: "${pin}", type: "analog" });\npotentiometer.on("data", function() {\n${branch}});\n`;
    return code;
};

Blockly.Blocks['magnetometer'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Magnetometer")
            .appendField(new Blockly.FieldTextInput("A0"), "PIN");
        this.appendStatementInput("DO")
            .appendField("do");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#ff9900');
        this.setTooltip("Read data from a magnetometer");
        this.setHelpUrl("");
    }
};

Blockly.JavaScript['magnetometer'] = function(block) {
    const pin = block.getFieldValue('PIN');
    const branch = Blockly.JavaScript.statementToCode(block, 'DO');
    let code = `const magnetometer = new five.Magnetometer({ pin: "${pin}" });\nmagnetometer.on("data", function() {\n${branch}});\n`;
    return code;
};

Blockly.Blocks['gas_sensor'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Gas Sensor")
            .appendField(new Blockly.FieldTextInput("A0"), "PIN");
        this.appendStatementInput("DO")
            .appendField("do");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#ff9900');
        this.setTooltip("Read data from a gas sensor");
        this.setHelpUrl("");
    }
};

Blockly.JavaScript['gas_sensor'] = function(block) {
    const pin = block.getFieldValue('PIN');
    const branch = Blockly.JavaScript.statementToCode(block, 'DO');
    let code = `const gasSensor = new five.Sensor({ pin: "${pin}", type: "analog" });\ngasSensor.on("data", function() {\n${branch}});\n`;
    return code;
};

Blockly.Blocks['humidity_sensor'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Humidity Sensor")
            .appendField(new Blockly.FieldTextInput("A0"), "PIN");
        this.appendStatementInput("DO")
            .appendField("do");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#ff9900');
        this.setTooltip("Read data from a humidity sensor");
        this.setHelpUrl("");
    }
};

Blockly.JavaScript['humidity_sensor'] = function(block) {
    const pin = block.getFieldValue('PIN');
    const branch = Blockly.JavaScript.statementToCode(block, 'DO');
    let code = `const humiditySensor = new five.Hygrometer({ controller: "DHT11", pin: "${pin}" });\nhumiditySensor.on("data", function() {\n${branch}});\n`;
    return code;
};

Blockly.Blocks['light_sensor'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Light Sensor")
            .appendField(new Blockly.FieldTextInput("A0"), "PIN");
        this.appendStatementInput("DO")
            .appendField("do");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#ff9900');
        this.setTooltip("Read data from a light sensor");
        this.setHelpUrl("");
    }
};

Blockly.JavaScript['light_sensor'] = function(block) {
    const pin = block.getFieldValue('PIN');
    const branch = Blockly.JavaScript.statementToCode(block, 'DO');
    let code = `const lightSensor = new five.Sensor({ pin: "${pin}", type: "analog" });\nlightSensor.on("data", function() {\n${branch}});\n`;
    return code;
};

Blockly.Blocks['touch_sensor'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Touch Sensor")
            .appendField(new Blockly.FieldTextInput("A0"), "PIN");
        this.appendStatementInput("DO")
            .appendField("do");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#ff9900');
        this.setTooltip("Read data from a touch sensor");
        this.setHelpUrl("");
    }
};

Blockly.JavaScript['touch_sensor'] = function(block) {
    const pin = block.getFieldValue('PIN');
    const branch = Blockly.JavaScript.statementToCode(block, 'DO');
    let code = `const touchSensor = new five.Sensor({ pin: "${pin}", type: "digital" });\ntouchSensor.on("data", function() {\n${branch}});\n`;
    return code;
};

Blockly.Blocks['tilt_sensor'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Tilt Sensor")
            .appendField(new Blockly.FieldTextInput("A0"), "PIN");
        this.appendStatementInput("DO")
            .appendField("do");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#ff9900');
        this.setTooltip("Read data from a tilt sensor");
        this.setHelpUrl("");
    }
};

Blockly.JavaScript['tilt_sensor'] = function(block) {
    const pin = block.getFieldValue('PIN');
    const branch = Blockly.JavaScript.statementToCode(block, 'DO');
    let code = `const tiltSensor = new five.Sensor({ pin: "${pin}", type: "digital" });\ntiltSensor.on("data", function() {\n${branch}});\n`;
    return code;
};

Blockly.Blocks['shift_register'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Shift Register")
            .appendField("isAnode")
            .appendField(new Blockly.FieldCheckbox("TRUE"), "IS_ANODE");
        this.appendDummyInput()
            .appendField("data")
            .appendField(new Blockly.FieldNumber(2), "DATA_PIN");
        this.appendDummyInput()
            .appendField("clock")
            .appendField(new Blockly.FieldNumber(3), "CLOCK_PIN");
        this.appendDummyInput()
            .appendField("latch")
            .appendField(new Blockly.FieldNumber(4), "LATCH_PIN");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#ff9900');
        this.setTooltip("Create a Shift Register");
        this.setHelpUrl("");
    }
};

Blockly.JavaScript['shift_register'] = function(block) {
    const isAnode = block.getFieldValue('IS_ANODE') === 'TRUE';
    const dataPin = block.getFieldValue('DATA_PIN');
    const clockPin = block.getFieldValue('CLOCK_PIN');
    const latchPin = block.getFieldValue('LATCH_PIN');
    let code = `new five.ShiftRegister({\n  isAnode: ${isAnode},\n  pins: {\n    data: ${dataPin},\n    clock: ${clockPin},\n    latch: ${latchPin}\n  }\n});\n`;
    return code;
};

Blockly.Blocks['sip'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("SIP")
            .appendField(new Blockly.FieldDropdown([
                ["DHT21_I2C_NANO_BACKPACK", "DHT21_I2C_NANO_BACKPACK"],
                ["DHT11_I2C_NANO_BACKPACK", "DHT11_I2C_NANO_BACKPACK"],
                ["DHT22_I2C_NANO_BACKPACK", "DHT22_I2C_NANO_BACKPACK"],
                ["BMP180", "BMP180"],
                ["BMP280", "BMP280"],
                ["BME280", "BME280"],
                ["HTU21D", "HTU21D"],
                ["HIH6130", "HIH6130"],
                ["MPL115A2", "MPL115A2"],
                ["MPL3115A2", "MPL3115A2"],
                ["SI7020", "SI7020"],
                ["SI7021", "SI7021"],
                ["MS5611", "MS5611"],
                ["TH02", "TH02"]
            ]), "CONTROLLER");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#ff9900');
        this.setTooltip("Create a SIP sensor");
        this.setHelpUrl("");
    }
};

Blockly.JavaScript['sip'] = function(block) {
    const controller = block.getFieldValue('CONTROLLER');
    let code = `new five.SIP({\n  controller: "${controller}"\n});\n`;
    return code;
};

Blockly.Blocks['stepper'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Stepper")
            .appendField("type")
            .appendField(new Blockly.FieldDropdown([
                ["DRIVER", "DRIVER"],
                ["TWO_WIRE", "TWO_WIRE"],
                ["FOUR_WIRE", "FOUR_WIRE"]
            ]), "TYPE");
        this.appendDummyInput()
            .appendField("stepsPerRev")
            .appendField(new Blockly.FieldNumber(200), "STEPS_PER_REV");
        this.appendDummyInput()
            .appendField("pins")
            .appendField(new Blockly.FieldTextInput("[11, 12]"), "PINS");
        this.appendDummyInput()
            .appendField("rpm")
            .appendField(new Blockly.FieldNumber(180), "RPM");
        this.appendDummyInput()
            .appendField("direction")
            .appendField(new Blockly.FieldDropdown([
                ["ccw", "ccw"],
                ["cw", "cw"]
            ]), "DIRECTION");
        this.appendDummyInput()
            .appendField("steps")
            .appendField(new Blockly.FieldNumber(2000), "STEPS");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#ff9900');
        this.setTooltip("Create a Stepper motor");
        this.setHelpUrl("");
    }
};

Blockly.JavaScript['stepper'] = function(block) {
    const type = block.getFieldValue('TYPE');
    const stepsPerRev = block.getFieldValue('STEPS_PER_REV');
    const pins = block.getFieldValue('PINS');
    const rpm = block.getFieldValue('RPM');
    const direction = block.getFieldValue('DIRECTION');
    const steps = block.getFieldValue('STEPS');
    let code = `
var stepper = new five.Stepper({
    type: five.Stepper.TYPE.${type},
    stepsPerRev: ${stepsPerRev},
    pins: ${pins}
});

stepper.rpm(${rpm}).${direction}().step(${steps}, function() {
    console.log("done");
});
`;
    return code;
};

Blockly.Blocks['switch'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Switch")
            .appendField("pin")
            .appendField(new Blockly.FieldNumber(8), "PIN");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#ff9900');
        this.setTooltip("Create a Switch");
        this.setHelpUrl("");
    }
};

Blockly.JavaScript['switch'] = function(block) {
    const pin = block.getFieldValue('PIN');
    let code = `new five.Switch(${pin});\n`;
    return code;
};

Blockly.Blocks['thermometer'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Thermometer")
            .appendField("controller")
            .appendField(new Blockly.FieldDropdown([
                ["LM35", "LM35"],
                ["TMP36", "TMP36"],
                ["TMP102", "TMP102"],
                ["DS18B20", "DS18B20"],
                ["MPU6050", "MPU6050"],
                ["MPL115A2", "MPL115A2"],
                ["MPL3115A2", "MPL3115A2"],
                ["BMP180", "BMP180"],
                ["HTU21D", "HTU21D"],
                ["HIH6130", "HIH6130"],
                ["MCP9808", "MCP9808"],
                ["MS5611", "MS5611"],
                ["TH02", "TH02"],
                ["DHT11_I2C_NANO_BACKPACK", "DHT11_I2C_NANO_BACKPACK"],
                ["DHT21_I2C_NANO_BACKPACK", "DHT21_I2C_NANO_BACKPACK"],
                ["DHT22_I2C_NANO_BACKPACK", "DHT22_I2C_NANO_BACKPACK"],
                ["SI7020", "SI7020"],
                ["SI7021", "SI7021"],
                ["LSM303C", "LSM303C"]
            ]), "CONTROLLER");
        this.appendDummyInput()
            .appendField("pin")
            .appendField(new Blockly.FieldTextInput("A0"), "PIN");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#ff9900');
        this.setTooltip("Create a Thermometer");
        this.setHelpUrl("");
    }
};

Blockly.JavaScript['thermometer'] = function(block) {
    const controller = block.getFieldValue('CONTROLLER');
    const pin = block.getFieldValue('PIN');
    let code = `new five.Thermometer({ controller: "${controller}", pin: "${pin}" });\n`;
    return code;
};

    // Funzione per aggiungere altre logiche e comandi di matematica
    Blockly.Blocks['math_number'] = {
        init: function() {
            this.appendDummyInput()
                .appendField(new Blockly.FieldNumber(0), "NUM");
            this.setOutput(true, "Number");
            this.setColour(230);
            this.setTooltip("Number");
            this.setHelpUrl("");
        }
    };

    Blockly.JavaScript['math_number'] = function(block) {
        const number = block.getFieldValue('NUM');
        let code = [number, Blockly.JavaScript.ORDER_ATOMIC];
        return code;
    };

    Blockly.Blocks['math_arithmetic'] = {
        init: function() {
            this.appendValueInput("A")
                .setCheck("Number");
            this.appendValueInput("B")
                .setCheck("Number")
                .appendField(new Blockly.FieldDropdown([["+", "ADD"], ["-", "MINUS"], ["*", "MULTIPLY"], ["/", "DIVIDE"]]), "OP");
            this.setOutput(true, "Number");
            this.setColour(230);
            this.setTooltip("Arithmetic Operations");
            this.setHelpUrl("");
        }
    };

    Blockly.JavaScript['math_arithmetic'] = function(block) {
        const A = Blockly.JavaScript.valueToCode(block, 'A', Blockly.JavaScript.ORDER_ATOMIC);
        const B = Blockly.JavaScript.valueToCode(block, 'B', Blockly.JavaScript.ORDER_ATOMIC);
        const operator = block.getFieldValue('OP');
        let code;
        switch (operator) {
            case 'ADD':
                code = `${A} + ${B}`;
                break;
            case 'MINUS':
                code = `${A} - ${B}`;
                break;
            case 'MULTIPLY':
                code = `${A} * ${B}`;
                break;
            case 'DIVIDE':
                code = `${A} / ${B}`;
                break;
        }
        return [code, Blockly.JavaScript.ORDER_ATOMIC];
    };


Blockly.Blocks['controls_repeat_ext'] = {
  init: function() {
    this.appendValueInput("TIMES")
        .setCheck("Number")
        .appendField("repeat");
    this.appendStatementInput("DO")
        .appendField("do");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#ff1a1a");
    this.setTooltip("Do some statements several times.");
    this.setHelpUrl("http://www.example.com/");
  }
};

Blockly.JavaScript['controls_repeat_ext'] = function(block) {
  // Repeat n times.
  var repeats = Blockly.JavaScript.valueToCode(block, 'TIMES', Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';
  var branch = Blockly.JavaScript.statementToCode(block, 'DO');
  branch = Blockly.JavaScript.addLoopTrap(branch, block.id);
  var code = '';
  var loopVar = Blockly.JavaScript.variableDB_.getDistinctName('count', Blockly.VARIABLE_CATEGORY_NAME);
  var endVar = repeats;
  // Custom code to handle repeat loop
  var code = 'for (var ' + loopVar + ' = 0; ' + loopVar + ' < ' + endVar + '; ' + loopVar + '++) {\n' +
              branch + '}\n';
  return code;
};

Blockly.Blocks['controls_if'] = {
    init: function() {
        this.appendValueInput("IF0")
            .setCheck("Boolean")
            .appendField("if");
        this.appendStatementInput("DO0")
            .appendField("do");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour("#ff1a1a");
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.JavaScript['controls_if'] = function(block) {
    var code = '';
    for (var n = 0; n <= block.elseifCount_; n++) {
        var argument = Blockly.JavaScript.valueToCode(block, 'IF' + n, Blockly.JavaScript.ORDER_NONE) || 'false';
        var branch = Blockly.JavaScript.statementToCode(block, 'DO' + n);
        code += (n === 0 ? 'if (' : ' else if (') + argument + ') {\n' + branch + '}';
    }
    if (block.elseCount_) {
        var branch = Blockly.JavaScript.statementToCode(block, 'ELSE');
        code += ' else {\n' + branch + '}';
    }
    return code + '\n';
};

Blockly.Blocks['controls_whileUntil'] = {
    init: function() {
        this.appendValueInput("BOOL")
            .setCheck("Boolean")
            .appendField(new Blockly.FieldDropdown([["while", "WHILE"], ["until", "UNTIL"]]), "MODE");
        this.appendStatementInput("DO")
            .appendField("do");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour("#ff1a1a");
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.JavaScript['controls_whileUntil'] = function(block) {
    var until = block.getFieldValue('MODE') === 'UNTIL';
    var argument0 = Blockly.JavaScript.valueToCode(block, 'BOOL', until ? Blockly.JavaScript.ORDER_LOGICAL_NOT : Blockly.JavaScript.ORDER_NONE) || 'false';
    var branch = Blockly.JavaScript.statementToCode(block, 'DO');
    if (until) {
        argument0 = '!' + argument0;
    }
    let code = 'while (' + argument0 + ') {\n' + branch + '}\n';
    return code;
};

Blockly.Blocks['controls_for'] = {
    init: function() {
        this.appendValueInput("FROM")
            .setCheck("Number")
            .appendField("for")
            .appendField(new Blockly.FieldVariable("i"), "VAR")
            .appendField("from");
        this.appendValueInput("TO")
            .setCheck("Number")
            .appendField("to");
        this.appendValueInput("BY")
            .setCheck("Number")
            .appendField("by");
        this.appendStatementInput("DO")
            .appendField("do");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour("#ff1a1a");
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.JavaScript['controls_for'] = function(block) {
    var variable0 = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
    var argument0 = Blockly.JavaScript.valueToCode(block, 'FROM', Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';
    var argument1 = Blockly.JavaScript.valueToCode(block, 'TO', Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';
    var increment = Blockly.JavaScript.valueToCode(block, 'BY', Blockly.JavaScript.ORDER_ASSIGNMENT) || '1';
    var branch = Blockly.JavaScript.statementToCode(block, 'DO');
    var code;
    if (Blockly.isNumber(argument0) && Blockly.isNumber(argument1) && Blockly.isNumber(increment)) {
        code = 'for (' + variable0 + ' = ' + argument0 + '; ' + variable0 + ' <= ' + argument1 + '; ' + variable0 + ' += ' + increment + ') {\n' + branch + '}\n';
    } else {
        code = 'for (' + variable0 + ' = ' + argument0 + '; ' + variable0 + ' <= ' + argument1 + '; ' + variable0 + ' += ' + increment + ') {\n' + branch + '}\n';
    }
    return code;
};

Blockly.Blocks['controls_forEach'] = {
    init: function() {
        this.appendValueInput("LIST")
            .setCheck("Array")
            .appendField("for each item")
            .appendField(new Blockly.FieldVariable("item"), "VAR")
            .appendField("in list");
        this.appendStatementInput("DO")
            .appendField("do");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour("#ff1a1a");
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.JavaScript['controls_forEach'] = function(block) {
    var variable0 = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
    var argument0 = Blockly.JavaScript.valueToCode(block, 'LIST', Blockly.JavaScript.ORDER_ASSIGNMENT) || '[]';
    var branch = Blockly.JavaScript.statementToCode(block, 'DO');
    var code = 'for (var ' + variable0 + ' of ' + argument0 + ') {\n' + branch + '}\n';
    return code;
};

Blockly.Blocks['controls_flow_statements'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([["break", "BREAK"], ["continue", "CONTINUE"]]), "FLOW");
        this.setPreviousStatement(true, null);
        this.setColour("#ff1a1a");
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.JavaScript['controls_flow_statements'] = function(block) {
    var flow = block.getFieldValue('FLOW');
    return (flow === 'BREAK' ? 'break' : 'continue') + ';\n';
};

