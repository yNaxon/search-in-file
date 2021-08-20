/**
 * Returns a list of all positions of substring occurrences in a given string
 * @param search - The substring to search for
 * @param text - The string to search in
 */
export function indexOfAll(search:string, text: string) {
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