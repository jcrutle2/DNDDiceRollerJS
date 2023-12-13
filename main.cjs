/*
 *
 *  MAIN - Controls calling functions of the program. Interacts directly with the user.
 * Created by Caleb Rutledge, 12/13/2023
 * 
 */

/* 
 *  IMPORT SECTION
 */ 
const parser = require('./parser.cjs');
const prompt = require('prompt-sync')();
const interpreter = require('./interpreter.cjs')
  
/*
 *  TERMINAL INPUT
 */ 
while (true) {
  const txt = prompt("Enter Command: ");
  const cmd = txt.toLowerCase();
  if (cmd === "q") break;
  const parsed = parser.parse(cmd);
  const interpreted = interpreter.interpret(parsed);
  console.log(interpreted);
}