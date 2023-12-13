/* 
 *  IMPORT SECTION
 */ 
const parser = require("./parser.cjs");
const prompt = require('prompt-sync')();
  
/*
 *  TERMINAL INPUT
 */ 
while (true) {
  const txt = prompt("Enter Command: ");
  const cmd = txt.toLowerCase();
  if (cmd === "q") break;
  const obj = parser.parse(cmd);
  console.log(obj);
}