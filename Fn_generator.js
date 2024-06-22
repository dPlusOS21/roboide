Blockly.JavaScript['fn_debounce'] = function(block) {
  var func = Blockly.JavaScript.valueToCode(block, 'func', Blockly.JavaScript.ORDER_ATOMIC);
  var wait = Blockly.JavaScript.valueToCode(block, 'wait', Blockly.JavaScript.ORDER_ATOMIC);
  var code = 'Fn.debounce(' + func + ', ' + wait + ')';
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['fn_cloneDeep'] = function(block) {
  var value = Blockly.JavaScript.valueToCode(block, 'value', Blockly.JavaScript.ORDER_ATOMIC);
  var code = 'Fn.cloneDeep(' + value + ')';
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['fn_toFixed'] = function(block) {
  var number = Blockly.JavaScript.valueToCode(block, 'number', Blockly.JavaScript.ORDER_ATOMIC);
  var digits = Blockly.JavaScript.valueToCode(block, 'digits', Blockly.JavaScript.ORDER_ATOMIC);
  var code = 'Fn.toFixed(' + number + ', ' + digits + ')';
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['fn_map'] = function(block) {
  var value = Blockly.JavaScript.valueToCode(block, 'value', Blockly.JavaScript.ORDER_ATOMIC);
  var fromLow = Blockly.JavaScript.valueToCode(block, 'fromLow', Blockly.JavaScript.ORDER_ATOMIC);
  var fromHigh = Blockly.JavaScript.valueToCode(block, 'fromHigh', Blockly.JavaScript.ORDER_ATOMIC);
  var toLow = Blockly.JavaScript.valueToCode(block, 'toLow', Blockly.JavaScript.ORDER_ATOMIC);
  var toHigh = Blockly.JavaScript.valueToCode(block, 'toHigh', Blockly.JavaScript.ORDER_ATOMIC);
  var code = 'Fn.map(' + value + ', ' + fromLow + ', ' + fromHigh + ', ' + toLow + ', ' + toHigh + ')';
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['fn_constrain'] = function(block) {
  var value = Blockly.JavaScript.valueToCode(block, 'value', Blockly.JavaScript.ORDER_ATOMIC);
  var lower = Blockly.JavaScript.valueToCode(block, 'lower', Blockly.JavaScript.ORDER_ATOMIC);
  var upper = Blockly.JavaScript.valueToCode(block, 'upper', Blockly.JavaScript.ORDER_ATOMIC);
  var code = 'Fn.constrain(' + value + ', ' + lower + ', ' + upper + ')';
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['fn_inRange'] = function(block) {
  var value = Blockly.JavaScript.valueToCode(block, 'value', Blockly.JavaScript.ORDER_ATOMIC);
  var lower = Blockly.JavaScript.valueToCode(block, 'lower', Blockly.JavaScript.ORDER_ATOMIC);
  var upper = Blockly.JavaScript.valueToCode(block, 'upper', Blockly.JavaScript.ORDER_ATOMIC);
  var code = 'Fn.inRange(' + value + ', ' + lower + ', ' + upper + ')';
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['fn_range'] = function(block) {
  var lower = Blockly.JavaScript.valueToCode(block, 'lower', Blockly.JavaScript.ORDER_ATOMIC);
  var upper = Blockly.JavaScript.valueToCode(block, 'upper', Blockly.JavaScript.ORDER_ATOMIC);
  var tick = Blockly.JavaScript.valueToCode(block, 'tick', Blockly.JavaScript.ORDER_ATOMIC);
  var code = 'Fn.range(' + lower + ', ' + upper + ', ' + tick + ')';
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['fn_uid'] = function(block) {
  var code = 'Fn.uid()';
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['fn_square'] = function(block) {
  var x = Blockly.JavaScript.valueToCode(block, 'x', Blockly.JavaScript.ORDER_ATOMIC);
  var code = 'Fn.square(' + x + ')';
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['fn_sum'] = function(block) {
  var values = Blockly.JavaScript.valueToCode(block, 'values', Blockly.JavaScript.ORDER_ATOMIC);
  var code = 'Fn.sum(' + values + ')';
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['fn_fma'] = function(block) {
  var a = Blockly.JavaScript.valueToCode(block, 'a', Blockly.JavaScript.ORDER_ATOMIC);
  var b = Blockly.JavaScript.valueToCode(block, 'b', Blockly.JavaScript.ORDER_ATOMIC);
  var c = Blockly.JavaScript.valueToCode(block, 'c', Blockly.JavaScript.ORDER_ATOMIC);
  var code = 'Fn.fma(' + a + ', ' + b + ', ' + c + ')';
  return [code, Blockly.JavaScript.ORDER_NONE];
};

