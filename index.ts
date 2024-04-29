type WordNode = Map<string, WordNode>

const rootNode = new Map<string, WordNode>()

/**
 * setup builds our map from a list of words. E.g. `cat` would be: { c: { a: { t: {} } } }
 */
export const setup = (words: string[]) => {
  for (const word of words) {
    let currentNode = rootNode

    for (const letter of word) {
      if (!currentNode.has(letter)) {
        currentNode.set(letter, new Map())
      }
      currentNode = currentNode.get(letter)! // We know it exists because we just set it if it didn't
    }
  }
}

export const isInDict = (
  search: string,
  index = 0,
  startNode = rootNode
): boolean => {
  let currentNode = startNode

  if (index === search.length) {
    // We reached the end of the search string, so return whether we're at the end of a word
    return !currentNode.size
  }

  const currentChar = search[index]

  if (currentChar === '*') {
    // Loop through all possibilities
    for (const child of currentNode.values()) {
      // Recursively search each possibility for the rest of the word
      if (isInDict(search, index + 1, child)) {
        return true
      }
    }
    return false
  }

  // If we find the current character, go deeper 1 level into that node
  if (currentNode.has(currentChar)) {
    // Continue recursively searching for the rest of the word
    return isInDict(search, index + 1, currentNode.get(currentChar))
  }

  // It's not a wildcard and we didn't find the character, so it's not in the dictionary
  return false
}
