import { render } from '../../../test-utils';
import { Highlighter } from "../highlighter/highlighter";

it('renders without crashing', () => {
  render(<Highlighter />)
});

it('highlights matching text', () => {
  const { getAllByText } = render(<Highlighter />, {
    preloadedState: {
      textSearch: {
        text: 'Lorem ipsum sit dolor des amet.',
        textChunks: ['Lo', 'rem ipsum sit do', 'lo', 'r des amet'],
        search: 'lo',
        matchingChunksIndices: [0, 2],
        activeChunkIndex: 0,
      }
    }
  });

  expect(getAllByText(/lo/i)).toHaveLength(2);
});