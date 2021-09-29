import { indexOfAll, splitText } from "../utils";

describe('test indexOfAll', () => {
  it('should return a list of all occurences positions', () => {
    const text = 'Lorem ipsum dolor sit amet';
    const search = 'l';

    const expectedPositions = [0, 14];
    const positions = indexOfAll(search, text);

    expect(positions).toEqual(expectedPositions);
  });

  it('should return a list of all occurences positions with uppercase search string', () => {
    const text = 'Lorem ipsum dolor sit amet';
    const search = 'L';

    const expectedPositions = [0, 14];
    const positions = indexOfAll(search, text);

    expect(positions).toEqual(expectedPositions);
  });

  it('should return an empty list when there is no occurence', () => {
    const text = 'Lorem ipsum dolor sit amet';
    const search = 'z';

    const expectedPositions: number[] = [];
    const positions = indexOfAll(search, text);

    expect(positions).toEqual(expectedPositions);
  });

  it('should skip characters that are part of a previous occurence', () => {
    const text = 'abcabc';
    const search = 'abc';

    const expectedPositions = [0,3];
    const positions = indexOfAll(search, text);

    expect(positions).toEqual(expectedPositions);
  });
});

describe('test splitText', () => {
  it('should successfuly split text', () => {
    const text = 'Lorem Ipsum Sit Dolor Des Amet';
    const search = 'lo';
    const positions = [0,18];

    const expectedTextChunks = ['Lo', 'rem Ipsum Sit Do', 'lo', 'r Des Amet'];
    const textChunks = splitText(search, text, positions);

    expect(textChunks).toEqual(expectedTextChunks);
  });

  it('should successfuly split text with that contains only matches', () => {
    const text = 'aaaaaa';
    const search = 'aa';
    const positions = [0,2,4];
    
    const expectedTextChunks = ['aa', 'aa', 'aa'];
    const textChunks = splitText(search, text, positions);

    expect(textChunks).toEqual(expectedTextChunks);
  });
})