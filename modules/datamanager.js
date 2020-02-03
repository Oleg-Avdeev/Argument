// [DESK] : IN-GAME USER INTERACTIONS:
// 1. Create Desk — create a new desk for two characters to fight on
// 2. Use Argument — place argument into one of the slots on the desk
// 3. Remove Argument — remove argument from the slot
// 'notes' — additional information fot the argument, i.e. why the argument was used or removed

exports.createDesk = function(moduleID, character1ID, character2ID) {

}

exports.getDeskState = function(moduleID, deskID) {

}

exports.useArgument = function(moduleID, deskID, argumentID, slot, notes) {

}

exports.removeArgument = function(moduleID, deskID, slot, notes) {

}

// [ARGUMENT] : CHARACTERS'S ARGUMENTS MANAGEMENT
// 1. Get Character Arguments - get list of character's arguments
// 2. Create Argument — creates a new argument for the character
// 3. Update Argument — change argument
// 4. Get Argument — get argument full data

exports.createArgument = function(moduleID, characterID, argument) {

}

exports.updateArgument = function(moduleID, argumentID, argument) {

}

exports.getCharacterArguments = function(moduleID, characterID) {

}

exports.getArgument = function(moduleID, argumentID) {

}

// [CHARACTER] : PLAYER'S CHARACTERS MANAGEMENT
// 1. Create Character — create new character and tie it to the player
// 2. Get Character — get character full data
// 3. List Characters — get characters tied to the player