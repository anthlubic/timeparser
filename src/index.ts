
function num(s: string):number {
    return parseInt(s, 10);
}

function zeroPad(i: string | number, amt: number = 2):string {
    return i.toString().padStart(Math.min(amt, 2), '0');
}

function formatTime(hour: number, minute: number, amOrPm: string, format: string) {
    let hourPadAmt = format.replace(/[^h]+/g, '').length;
    let displayAmPm = format.toLocaleLowerCase().includes('aa');

    let hourDisplay = zeroPad(hour, hourPadAmt);
    let minuteDisplay = zeroPad(minute);
    let amPmDisplay = displayAmPm ? amOrPm : '';

    let formattedTime = format
        .replace(/h+/g, hourDisplay)
        .replace(/m+/g, minuteDisplay)
        .replace(/a+/g, amPmDisplay);
    return formattedTime;
}

export function timeparser(input: string, format: string = 'h:mm aa'): string | undefined {

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
    } else {
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

    return formatTime(hour, minute, amOrPm, format);
}

export default timeparser;