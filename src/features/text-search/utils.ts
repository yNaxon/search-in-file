/**
 * Returns a list of all positions of substring occurrences in a given string
 * @param search - The substring to search for
 * @param text - The string to search in
 */
export function indexOfAll(search: string, text: string) {
  const positionList = [];
  const lowerCaseText = text.toLowerCase();
  const lowerCaseSearch = search.toLowerCase();
  let lastMatchPosition = lowerCaseText.indexOf(lowerCaseSearch, 0);

  while (lastMatchPosition >= 0) {
    positionList.push(lastMatchPosition);
    lastMatchPosition = lowerCaseText.indexOf(search, lastMatchPosition + lowerCaseSearch.length);
  }
  return positionList;
}

/**
 * Splits the given text into chunks. Each chunk either contains the search string,
 * or all characters between the last occurence of the search string to the next one.
 * @param search The search string
 * @param text The text to split 
 * @param positions Array of starting position of search string occurences in text
 */
export function splitText(search: string, text: string, positions: number[]) {

  if (text.length === 0 || positions.length === 0) {
    return [text];
  }

  const chunks: string[] = [];
  const step = search.length;
  let position = 0,
    lastChunkedPosition = 0;

  for (let i = 0; i < positions.length; i++) {
    position = positions[i];
    if (position !== lastChunkedPosition) {
      chunks.push(text.substring(lastChunkedPosition, position));
    }
    chunks.push(text.substring(position, position + step));
    lastChunkedPosition = position + step;
  }

  if (lastChunkedPosition < text.length) {
    chunks.push(text.substring(lastChunkedPosition, text.length))
  }

  return chunks;
}
