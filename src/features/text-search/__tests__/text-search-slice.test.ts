import reducer, {
  initialState,
  searchInText,
  search,
  clearSearch,
  goToNextMatch,
  goToPreviousMatch
} from '../text-search-slice'


describe('searchInText action', () => {
  it('should set the text to search in', () => {
    const text = 'Hello!';
    const nextState = reducer(initialState, searchInText(text));
    expect(nextState).toEqual({
      ...initialState,
      text,
    })
  })
});

describe('clearSearch action', () => {
  it('should reset search props', () => {
    const text = 'Hello!';
    const previousState = {
      text,
      search: 'l',
      matchIndices: [2, 3],
      activeMatchIndex: 1,
    }
    const expectedNextState = {
      text,
      search: null,
      matchIndices: [],
      activeMatchIndex: 0,
    }

    const nextState = reducer(previousState, clearSearch());
    expect(nextState).toEqual(expectedNextState)
  });
});

describe('search action', () => {
  it('should find matches', () => {
    const text = 'Hello!';
    const searchString = 'l';
    const previousState = {
      ...initialState,
      text,
    }
    const expectedNextState = {
      text,
      search: searchString,
      matchIndices: [2, 3],
      activeMatchIndex: 0,
    }

    const nextState = reducer(previousState, search(searchString));
    expect(nextState).toEqual(expectedNextState)
  });

  it('should find no matches', () => {
    const text = 'Hello!';
    const searchString = 'a';
    const previousState = {
      ...initialState,
      text,
    }
    const expectedNextState = {
      text,
      search: searchString,
      matchIndices: [],
      activeMatchIndex: 0,
    }

    const nextState = reducer(previousState, search(searchString));
    expect(nextState).toEqual(expectedNextState)
  });
});

describe('goToNextMatch action', () => {
  it('should point to next match', () => {
    const text = 'Hello!';
    const searchString = 'l';
    const previousState = {
      text,
      search: searchString,
      matchIndices: [2, 3],
      activeMatchIndex: 0,
    };
    const expectedNextState = {
      text,
      search: searchString,
      matchIndices: [2, 3],
      activeMatchIndex: 1,
    }

    const nextState = reducer(previousState, goToNextMatch());
    expect(nextState).toEqual(expectedNextState)
  })

  it('should point to first match – when last match is active', () => {
    const text = 'Hello!';
    const searchString = 'l';
    const previousState = {
      text,
      search: searchString,
      matchIndices: [2, 3],
      activeMatchIndex: 1,
    };
    const expectedNextState = {
      text,
      search: searchString,
      matchIndices: [2, 3],
      activeMatchIndex: 0,
    }

    const nextState = reducer(previousState, goToNextMatch());
    expect(nextState).toEqual(expectedNextState)
  });
});

describe('goToPrevMatch action', () => {
  it('should point to prev match', () => {
    const text = 'Hello!';
    const searchString = 'l';
    const previousState = {
      text,
      search: searchString,
      matchIndices: [2, 3],
      activeMatchIndex: 1,
    };
    const expectedNextState = {
      text,
      search: searchString,
      matchIndices: [2, 3],
      activeMatchIndex: 0,
    }

    const nextState = reducer(previousState, goToPreviousMatch());
    expect(nextState).toEqual(expectedNextState);
  })

  it('should point to last match – when first match is active', () => {
    const text = 'Hello!';
    const searchString = 'l';
    const previousState = {
      text,
      search: searchString,
      matchIndices: [2, 3],
      activeMatchIndex: 0,
    };
    const expectedNextState = {
      text,
      search: searchString,
      matchIndices: [2, 3],
      activeMatchIndex: 1,
    }

    const nextState = reducer(previousState, goToPreviousMatch());
    expect(nextState).toEqual(expectedNextState)
  });
});