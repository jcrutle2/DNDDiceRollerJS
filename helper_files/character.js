/*
 *
 *  CHARACTER: Creates, manages, and interprets user data
 *  Created by Caleb Rutledge, 12/13/2023
 * 
 */

const fs = require('fs');                                               //filesystem access
const prompt = require('prompt-sync')();                                //gets user input
const charDataFile = './user_data/char_data.json';                      //where char data is stored



// creates new character
function newChar (name) {
    let charFile = getCharDataFile();

    // ensure charDataFile Exists
    if(!fs.existsSync(charDataFile) ) {
        charObj = {
            currentChar: 0,
            totalChar: 0,
        }
        writeToCharDataFile(charObj);
    }

    // ensure name does starts with letter
    let firstChar = name.charAt(0);
    if (!firstChar.match(/[a-z]/i)) {
        return "ERROR: First character of name must be letter.";
    }

    // ensure character with this name doesn't currently exist
    let charMax = charFile.totalChar;
    let loopNumber = 1;
    while (loopNumber <= charMax) {
        let thisChar = charFile["char" + loopNumber];
        if (thisChar.name === name) {
            return "ERROR: Character " + name + "already exists. ";
        }
        loopNumber++;
    }

    // create character
    console.log("Creating Character...");
    let charNumber = charMax + 1;
    charFile["char" + charNumber] = {
        name: name,
    }

    // select character
    console.log("Selecting Character as Current Character...");
    charFile.currentChar = charNumber;
    charFile.totalChar = charNumber;

    // write to memory
    writeToCharDataFile(charFile);
    return "Success!";
}

// edits current character attributes freely
function editCharCustom () {
    console.log("Character Editing:");

    let char = currentChar();
    let charFile = getCharDataFile();

    while (true) {
        let attribute = prompt("Enter Attribute: ");
        if (attribute === 'q') break;
        let value = prompt("Enter Value: ");
        console.log(Number(value));

        if (isNaN(value)) {
            console.log("Error: Attribute value must be a number!");
            continue;
        }
        char[attribute] = value;

        charFile["char" + charFile.currentChar] = char;
        writeToCharDataFile(charFile);
    }

    return "Character Edited!";
}

// list current characters attributes
function infoChar () {
    let char = currentChar();
    let str = JSON.stringify(char);
    str = str.replaceAll("\"","");
    str = str.replaceAll(",","\n");
    str = str.replaceAll("{","");
    str = str.replaceAll("}","");
    str = str.replaceAll(":",": ");
    return "\n" + str + "\n";
}

// lists all characters
function listChar (parsed) {
    if (!fs.existsSync(charDataFile)) 
        return "No characters created.";

    let charFile = getCharDataFile();
    if (charFile == null) 
        return "Error reading character file.";

    console.log("\nCHARACTER LIST:\n")
    let i;
    for (i = 1; i < charFile.totalChar; i++) {
        let currentChar = charFile["char" + i];
        console.log(currentChar.name);
    }

    let currentChar = charFile["char" + i];
    return currentChar.name + "\n";
}

// returns value of a specified attribute of the current character
function returnAttribute (str) {
    let char = currentChar();
    try {
        return char[str];
    }
    catch {
        return null;
    }
}

// selects a character
function changeChar (char) {

    let charFile = getCharDataFile();

    if (Number(char) != NaN) {
        if (Number(char) <= charFile.totalChar) {
            charFile.currentChar = Number(char);
            thisChar = charFile["char" + charFile.currentChar];
            writeToCharDataFile(charFile);
            return "Success! Current Character is " + thisChar.name + ".";
        }
    }

    if (typeof char === "string") {
        let i;
        const max = charFile.totalChar;
    
        for (i = 1; i <= max; i++) {
            const thisChar = charFile["char" + i];
            if (thisChar.name === char) {
                charFile.currentChar = i;
                writeToCharDataFile(charFile);
                return "Success! Current Character is " + char + ".";
            }
        }
    
        return "Error: Character " + char + " not found.";
    }

    return "Error: Character not found."

}


/*
 *  PRIVATE METHODS
 */

function currentChar () {
    let charFile = getCharDataFile();
    let charNumber = charFile.currentChar;
    return charFile["char" + charNumber];
}

function getChar (num) {
    let charFile = getCharDataFile();

    if (charFile.totalChar < num) {
        console.log("Error: Character does not exist.");
        return null;
    }
    
    return charFile["char" + num];
}

function getCharDataFile () {
    return JSON.parse(fs.readFileSync('./user_data/char_data.json', 'utf8'));
}

function writeToCharDataFile (obj) {
    fs.writeFileSync(charDataFile, JSON.stringify(obj), (err) => {  
        // Catch this!
        if (err) throw err;
    });
    return;
}

module.exports = {
    newChar: newChar,
    editCharCustom: editCharCustom,
    listChar: listChar,
    infoChar: infoChar,
    returnAttribute: returnAttribute,
    changeChar: changeChar,
}