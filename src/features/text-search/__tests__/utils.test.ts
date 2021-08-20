import { indexOfAll } from "../utils";

describe('test indexOfAll', () => {
  it('should return a list of all occurences positions', () => {
    const text = 'Lorem ipsum dolor sit amet';
    const search = 'l';
    const expectedPositions = [0, 14];

    const positions = indexOfAll(search, text);

    expect(positions).toEqual(expectedPositions);
  });

  it('should return an empty list when there is no occurence', () => {
    const text = 'Lorem ipsum dolor sit amet';
    const search = 'z';
    const positions = indexOfAll(search, text);

    expect(positions).toEqual([]);
  });

  it('should skip characters that are part of a previous occurence', () => {
    const text = 'abcabc';
    const search = 'abc';
    const expectedPositions = [0,3];
    const positions = indexOfAll(search, text);

    expect(positions).toEqual(expectedPositions);
  });
});