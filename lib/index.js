"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function num(s) {
    return parseInt(s, 10);
}
function zeroPad(i) {
    return i.toString().padStart(2, '0');
}
function timeparser(input) {
    var lowerInput = input.toLocaleLowerCase();
    var numeric = input.replace(/[^[0-9]/g, '');
    var hour = 1;
    var minute = 0;
    if (numeric.length > 3) {
        hour = num(numeric.substring(0, 2));
        minute = num(numeric.substring(2));
    }
    else if (numeric.length === 3) {
        hour = num(numeric[0]);
        minute = num(numeric.substring(1));
    }
    else if (numeric.length < 3) {
        hour = num(numeric);
        minute = 0;
    }
    var amOrPm = 'AM';
    if (lowerInput.includes('pm') || lowerInput.includes('p')) {
        amOrPm = 'PM';
    }
    else if (hour > 11) {
        amOrPm = 'PM';
    }
    //fix bad minutes
    if (minute > 59) {
        minute = minute % 60;
        hour += 1;
    }
    //fix military times
    if (hour > 12) {
        hour -= 12;
        amOrPm = 'PM';
    }
    var returnStr = hour + ':' + zeroPad(minute) + ' ' + amOrPm;
    return returnStr;
}
exports.timeparser = timeparser;
exports.default = timeparser;
//# sourceMappingURL=index.js.map