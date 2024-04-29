let dictionary: Set<string>

export const setup = (words: string[]) => {
  dictionary = new Set(words)
}

export const isInDict = (search: string) => {
  const pattern = search.replaceAll('*', '.+')
  const regex = new RegExp(`^${pattern}$`, 'g')

  for (const value of dictionary) {
    if (regex.test(value)) return true
  }

  return false
}
