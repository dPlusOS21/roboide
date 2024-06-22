Blockly.Blocks['fn_debounce'] = {
  init: function() {
    this.appendValueInput("func")
        .setCheck("Function")
        .appendField("debounce");
    this.appendValueInput("wait")
        .setCheck("Number")
        .appendField("wait");
    this.setInputsInline(true);
    this.setOutput(true, "Function");
    this.setColour('#F7E100');
    this.setTooltip("Debounce a function.");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['fn_cloneDeep'] = {
  init: function() {
    this.appendValueInput("value")
        .setCheck(null)
        .appendField("cloneDeep");
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour('#F7E100');
    this.setTooltip("Clone a value deeply.");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['fn_toFixed'] = {
  init: function() {
    this.appendValueInput("number")
        .setCheck("Number")
        .appendField("toFixed number");
    this.appendValueInput("digits")
        .setCheck("Number")
        .appendField("digits");
    this.setInputsInline(true);
    this.setOutput(true, "Number");
    this.setColour('#F7E100');
    this.setTooltip("Format a number to a fixed number of digits.");
    this.setHelpUrl("");
  }
};

// Definisci i blocchi per tutte le altre funzioni Fn
Blockly.Blocks['fn_map'] = {
  init: function() {
    this.appendValueInput("value")
        .setCheck("Number")
        .appendField("map value");
    this.appendValueInput("fromLow")
        .setCheck("Number")
        .appendField("from low");
    this.appendValueInput("fromHigh")
        .setCheck("Number")
        .appendField("from high");
    this.appendValueInput("toLow")
        .setCheck("Number")
        .appendField("to low");
    this.appendValueInput("toHigh")
        .setCheck("Number")
        .appendField("to high");
    this.setInputsInline(true);
    this.setOutput(true, "Number");
    this.setColour('#F7E100');
    this.setTooltip("Map a value from one range to another.");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['fn_constrain'] = {
  init: function() {
    this.appendValueInput("value")
        .setCheck("Number")
        .appendField("constrain value");
    this.appendValueInput("lower")
        .setCheck("Number")
        .appendField("lower");
    this.appendValueInput("upper")
        .setCheck("Number")
        .appendField("upper");
    this.setInputsInline(true);
    this.setOutput(true, "Number");
    this.setColour('#F7E100');
    this.setTooltip("Constrain a value to be within a range.");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['fn_inRange'] = {
  init: function() {
    this.appendValueInput("value")
        .setCheck("Number")
        .appendField("is in range value");
    this.appendValueInput("lower")
        .setCheck("Number")
        .appendField("lower");
    this.appendValueInput("upper")
        .setCheck("Number")
        .appendField("upper");
    this.setInputsInline(true);
    this.setOutput(true, "Boolean");
    this.setColour('#F7E100');
    this.setTooltip("Check if a value is in range.");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['fn_range'] = {
  init: function() {
    this.appendValueInput("lower")
        .setCheck("Number")
        .appendField("range lower");
    this.appendValueInput("upper")
        .setCheck("Number")
        .appendField("upper");
    this.appendValueInput("tick")
        .setCheck("Number")
        .appendField("tick");
    this.setInputsInline(true);
    this.setOutput(true, "Array");
    this.setColour('#F7E100');
    this.setTooltip("Generate an array of numbers in a range.");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['fn_uid'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("uid");
    this.setOutput(true, "String");
    this.setColour('#F7E100');
    this.setTooltip("Generate a unique ID.");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['fn_square'] = {
  init: function() {
    this.appendValueInput("x")
        .setCheck("Number")
        .appendField("square x");
    this.setOutput(true, "Number");
    this.setColour('#F7E100');
    this.setTooltip("Square a number.");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['fn_sum'] = {
  init: function() {
    this.appendValueInput("values")
        .setCheck("Array")
        .appendField("sum values");
    this.setOutput(true, "Number");
    this.setColour('#F7E100');
    this.setTooltip("Sum an array of values.");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['fn_fma'] = {
  init: function() {
    this.appendValueInput("a")
        .setCheck("Number")
        .appendField("fma a");
    this.appendValueInput("b")
        .setCheck("Number")
        .appendField("b");
    this.appendValueInput("c")
        .setCheck("Number")
        .appendField("c");
    this.setOutput(true, "Number");
    this.setColour('#F7E100');
    this.setTooltip("Fused multiply-add.");
    this.setHelpUrl("");
  }
};

