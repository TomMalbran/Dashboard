let dialogLevel = 0;



/**
 * Returns true if the current dialog level is at the given one
 * @param {Number} level
 * @returns {Boolean}
 */
function isDialogAt(level) {
    return dialogLevel === level;
}

/**
 * Increases the Dialog Level and returns it
 * @returns {Number}
 */
function openDialog() {
    dialogLevel += 1;
    return dialogLevel;
}

/**
 * Decreases the Dialog Level and returns 0
 * @returns {Number}
 */
function closeDialog() {
    dialogLevel -= 1;
    return 0;
}



// The public API
export default {
    isDialogAt,
    openDialog,
    closeDialog,
};
