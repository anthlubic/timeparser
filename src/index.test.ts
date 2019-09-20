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
    expect(timeparser('107p')).toBe('1:07 PM');
    expect(timeparser('107pm')).toBe('1:07 PM');
})