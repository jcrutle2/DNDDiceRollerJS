/*
 *
 *  INTERPRETER: Takes object from parser and interprets it into a string
 *  Created by Caleb Rutledge, 12/13/2023
 * 
 */

function interpret (parsed) {
    if (parsed.prompt === "roll") {
        let sum = parsed.sum;
        let i = 1;
        while (true) {
            if(parsed["add" + i]) {
                sum += parsed["add" + i];
            }
            else break;

            i++;
        }
        let str = "You rolled " + sum + ". ";

        if(parsed.add1) {
            str += parsed.sum + " + " + parsed.add1;
        }
        i = 2;
        while (true) {
            if(parsed["add" + i]) {
                str += " + " + parsed["add" + i];
            }
            else break;

            i++;
        }


        return str;
    }
    else return "not yet implemented";
}

module.exports = {
    interpret: interpret,
}