/*
 *
 *  INTERPRETER: Takes object from parser and interprets it into a string
 *  Created by Caleb Rutledge, 12/13/2023
 * 
 * 
 * COMMAND                          FORMAT                                          ARGS
 * roll                             roll (x)?d(x) + (z)*                            # dice, max roll, attributes / numbers to add
 * 
 * char                             char new (y)                                    create character named y
 *                                  char edit (y)?                                  edit character named y
 *                                  char select (y)                                 set character y as current
 *                                  char list                                       list all characters
 *                                  char info
 *                                  
 * 
 * KEY: 
 *      Regular expressions: ? = 0/1 times, * = 0 or more times, + = 1 or more times
 *      (x) = int, (y) = word, (z) = word or int
 */


const character = require('./character.js');               //deals with character data

// main function - interprets any valid input from parser
function interpret (parsed) {
    // Interprets roll commands
    if (parsed.prompt === "roll" && parsed.sum) 
        return cmdRoll(parsed);
    else if (parsed.prompt === "char") 
        return cmdChar(parsed);
    else return "not yet implemented";
}

// if user entered "roll"
function cmdRoll (parsed) {

    // determines final sum of roll
    let sum = parsed.sum;

    // add additive terms to roll
    let i = 1;
    while (true) {
        if(interpretAttribute(parsed["add" + i])) {
            sum += Number(interpretAttribute(parsed["add" + i]));
        }
        else break;
        i++;
    }

    // multiply roll
    i = 1;
    while (true) {
        if(interpretAttribute(parsed["mul" + i])) {
            sum *= Number(interpretAttribute(parsed["mul" + i]));
        }
        else break;
        i++;
    }

    // divide roll
    i = 1;
    while (true) {
        if(interpretAttribute(parsed["div" + i])) {
            sum /= Number(interpretAttribute(parsed["div" + i]));
            sum = Math.floor(sum);
        }
        else break;
        i++;
    }

    // creates return string
    let str = "You rolled " + sum + ". ";;

    // formats first elements of sum composition
    if (parsed.numRolls != 1) {
        str += "(" + parsed["roll" + 1];
        for (let i = 2; i <= parsed.numRolls; i++) {
            str += " + " + parsed["roll" + i];
        }
        str += ")";
        if (parsed.add1) {
            str += " + " + interpretAttribute(parsed.add1);
        }
    }
    else if(parsed.add1) {
        str += "(" + parsed.sum + ")" + " + " + interpretAttribute(parsed.add1);
    }
    else 

    // formats additional elements of sum composition
    i = 2;
    while (true) {
        if(parsed["add" + i]) {
            str += " + " + interpretAttribute(parsed["add" + i]);
        }
        else break;

        i++;
    }


    return str;
}

// if user entered "char"
function cmdChar (parsed) {
    if (parsed.arg1 === "new")
        return cmdCharTypes.cmdCharNew(parsed);
    else if (parsed.arg1 === "edit")
        return cmdCharTypes.cmdCharEdit(parsed);
    else if (parsed.arg1 === "info")
        return cmdCharTypes.cmdCharInfo(parsed);
    else if (parsed.arg1 === "list")
        return cmdCharTypes.cmdCharList(parsed);
    else if (parsed.arg1 === "select")
        return cmdCharTypes.cmdCharSelect(parsed);
    else
        return "Error: invalid arguments."
}

// functions for each type of cmdChar argument
let cmdCharTypes = {
    cmdCharNew (parsed) {
        console.log("Attempting to create character...");

        // invalid commands
        if(!parsed.arg2) return "Error: no name provided.";
        else if(parsed.arg3) return "Error: too many arguments.";

        else return character.newChar(parsed.arg2);
    },

    cmdCharEdit (parsed) {
        if (parsed.arg2 === "custom") {
            if (parsed.arg3) return "Error: too many arguments."
            return character.editCharCustom();
        }
        else {
            return "Not yet implemented!";
        }
    },

    cmdCharInfo (parsed) {
        if (parsed.arg2) return "Error: too many arguments.";
        return character.infoChar();
    },

    cmdCharList (parsed) {
        return character.listChar(parsed);
    },

    cmdCharSelect (parsed) {
        if (parsed.arg2) {
            return character.changeChar(parsed.arg2);
        }
        else {
            return "Error: Invalid Arguments";
        }
    },
}


/* 
 *  Private Helper Methods
 */

function interpretAttribute (att) {
    if (typeof att === "string") {
        let num = character.returnAttribute(att);
        if (num) return num;
    }
    if (typeof att === "number") {
        return att;
    }
    return null;
}

module.exports = {
    interpret: interpret,
}