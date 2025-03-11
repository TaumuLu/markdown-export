import { type Dict, type StyleObject } from '../types'

export const hasParentDom = (
  dom: HTMLElement,
  expression: (dom: HTMLElement) => boolean,
) => {
  let curDom: HTMLElement | null | undefined = dom
  while (curDom) {
    if (expression(curDom)) {
      return true
    }
    curDom = curDom?.parentElement
  }
  return false
}

export const parseStyle = (style: StyleObject) => {
  return Object.keys(style).reduce<Dict<string>>((p, k) => {
    const value = style[k]
    if (value === undefined || value === null) return p

    let newValue = `${value}`
    if (typeof value === 'number') {
      newValue = `${value}px`
    }
    return {
      ...p,
      [k]: newValue,
    }
  }, {})
}
