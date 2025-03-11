export const getXPathForElement = (
  element: HTMLElement | null,
  options: { isFullPath?: boolean } = {},
): string => {
  if (!element) return ''
  const { isFullPath = true } = options

  if (!isFullPath && element.id !== '') return 'id("' + element.id + '")'

  if (element === document.body)
    return `/html/${element.nodeName.toLowerCase()}`

  let ix = 0
  const siblings = element.parentNode?.childNodes ?? []

  for (let i = 0; i < siblings.length; i++) {
    const sibling = siblings[i]

    if (sibling === element) {
      const indexPath = siblings.length > 1 ? `[${ix + 1}]` : ''
      const parentPath = getXPathForElement(element.parentNode as HTMLElement)

      return `${parentPath}/${element.nodeName.toLowerCase()}${indexPath}`
    }
    if (sibling.nodeType === 1 && sibling.nodeName === element.nodeName) ix++
  }

  return ''
}

export const getElementByXPath = (xpath: string) => {
  const evaluator = new XPathEvaluator()
  const result = evaluator.evaluate(
    xpath,
    document.documentElement,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null,
  )
  if (result.singleNodeValue) {
    return result.singleNodeValue as HTMLElement
  }
  return result.singleNodeValue
}
