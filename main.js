/*
 *
 *  MAIN - Controls calling functions of the program. Interacts directly with the user.
 * Created by Caleb Rutledge, 12/13/2023
 * 
 */

/* 
 *
 *  IMPORT SECTION
 *
 */ 
const parser = require('./helper_files/parser.js');
const prompt = require('prompt-sync')();
const interpreter = require('./helper_files/interpreter.js')
  

/*
 *
 * PROGRAM BOOTUP
 *
 */

console.log("\nDND Dice Roller JS, v0.1");
console.log("Enter \"roll dX\" to roll a die, where X is the size of the die. Type \"help\" for help\n");


/*
 *
 *  TERMINAL INPUT
 * 
 */ 
while (true) {
  const txt = prompt("Enter Command: ");
  const cmd = txt.toLowerCase();
  if (cmd === "q") break;
  const parsed = parser.parse(cmd);
  const interpreted = interpreter.interpret(parsed);
  console.log(interpreted);
}