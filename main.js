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
const parser = require('./helper_files/parser.js');                     //parses user input
const interpreter = require('./helper_files/interpreter.js');           //interprets user input
const character = require('./helper_files/character.js');               //deals with character data
const prompt = require('prompt-sync')();                                //gets user input
const fs = require('fs');                                               //filesystem access
  

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