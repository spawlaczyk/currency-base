import { convertPLNToUSD } from "../convertPLNToUSD";

describe('ConvertPLNtoUSD', () => {
  it('should return proper value when good input', () => {
    expect(convertPLNToUSD(1)).toBe('$0.29');
    expect(convertPLNToUSD(2)).toBe('$0.57');
    expect(convertPLNToUSD(20)).toBe('$5.71');
    expect(convertPLNToUSD(12)).toBe('$3.43');
  });

  it('should return NaN when input is text', () => {
    expect(convertPLNToUSD('1')).toBeNaN();
    expect(convertPLNToUSD('abc')).toBeNaN();
    expect(convertPLNToUSD('16')).toBeNaN();
    expect(convertPLNToUSD('zxc')).toBeNaN();
  });

  it('should return Nan when input is empty', () => {
    expect(convertPLNToUSD()).toBeNaN();
  });

  it('should return error when input is neither string nor a number', () => {
    expect(convertPLNToUSD({})).toBe('Error');
    expect(convertPLNToUSD([])).toBe('Error');
    expect(convertPLNToUSD(null)).toBe('Error');
    expect(convertPLNToUSD(function() {})).toBe('Error');
  });

  it('should return 0 when input is a negative number', () => {
    expect(convertPLNToUSD(-5)).toBe('0');
    expect(convertPLNToUSD(-25)).toBe('0');
    expect(convertPLNToUSD(-900)).toBe('0');
  })
});