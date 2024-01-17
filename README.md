# DNDDiceRollerJS
A simple terminal application for automating dice rolls for tabletop role-playing-games.


HOW TO USE:
Navigate to the downloaded directory in the terminal and type "node main". *Requires Node.js to be installed*

Program can be operated using commands listed in comments. Simple commands include
- "roll": Roll a specified number of a specified size of dice, adding the specified modifiers. Ex:
        roll d20              (rolls a 20 sided die)
        roll 3d6              (rolls 3 6 sided dies, showing both the sum and individual rolls)
        roll d4 + 1           (rolls a 4 sided die and adds one to the result, showing the roll both before and after)

- "char": edit and create a custom character
        char new (name)        (creates a character with the name (name))
        char edit custom       (allows you to assign attributes to your character which can be referenced as bonuses in later roll commands)
