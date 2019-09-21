import timeparser from './index';

test('it detects AM correctly', () => {
    expect(timeparser('1159 AM')).toBe('11:59 AM')
})

test('it detects PM correctly', () => {
    expect(timeparser('1200')).toBe('12:00 PM')
})

test('it strips non alphanumerics', () => {
    expect(timeparser('@#$%10@#$:::44')).toBe('10:44 AM')
})

test('handles variable length times', () => {
    expect(timeparser('640')).toBe('6:40 AM')
})

test('handles military time', () => {
    expect(timeparser('2215')).toBe('10:15 PM')
})

test('converts minutes over 60 to hours', () => {
    expect(timeparser('2299')).toBe('11:39 PM')
})

test('accepts zero padded times', () => {
    expect(timeparser('0146')).toBe('1:46 AM');
})

test('accepts zero padded time with am/pm', () => {
    expect(timeparser('0933 pm')).toBe('9:33 PM');
})

test('allows pm or p to designate PM', () => {
    expect(timeparser('316p')).toBe('3:16 PM');
    expect(timeparser('316pm')).toBe('3:16 PM');
})

test('allows am or a to designate AM', () => {
    expect(timeparser('107a')).toBe('1:07 AM');
    expect(timeparser('107 a')).toBe('1:07 AM');
    expect(timeparser('10 7am')).toBe('1:07 AM');
})

test('it handles only entering hours', () => {
    expect(timeparser('11')).toBe('11:00 AM');
    expect(timeparser('11p')).toBe('11:00 PM');
})

test('it handles single digit hours', () => {
    expect(timeparser('7')).toBe('7:00 AM');
    expect(timeparser('7p')).toBe('7:00 PM');
})

test('the default display format is h:mm aa', () => {
    expect(timeparser('351pm')).toBe('3:51 PM');
})

test('supports custom format hh:mm aa', () => {
    expect(timeparser('640', 'hh:mm aa')).toBe('06:40 AM');
})

test('supports custom format hh:mm', () => {
    expect(timeparser('640p', 'hh:mm')).toBe('06:40');
})

test('supports wildly custom formats such as aa hh:mm', () => {
    expect(timeparser('102p', 'aa hh:mm')).toBe('PM 01:02')
})