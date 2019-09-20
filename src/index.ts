
function num(s: string):number {
    return parseInt(s, 10);
}

function zeroPad(i: any):string {
    return i.toString().padStart(2, '0');
}

export function timeparser(input: string): string | undefined {

    const lowerInput = input.toLocaleLowerCase();
    const numeric = input.replace(/[^[0-9]/g, '');

    let hour = 1;
    let minute = 0;

    if (numeric.length > 3) {
        hour = num(numeric.substring(0, 2));
        minute = num(numeric.substring(2))
    } else if (numeric.length === 3) {
        hour = num(numeric[0]);
        minute = num(numeric.substring(1))
    } else if (numeric.length < 3) {
        hour = num(numeric);
        minute = 0;
    }

    let amOrPm = 'AM';
    if (lowerInput.includes('pm') || lowerInput.includes('p')) {
        amOrPm = 'PM';
    } else if (hour > 11) {
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

    let returnStr = hour + ':' + zeroPad(minute) + ' ' + amOrPm;
    return returnStr;
}

export default timeparser;