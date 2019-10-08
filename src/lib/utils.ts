export const CLICK_TAG = '@@'
export const CUSTOM_TAG = 'app-'
export const mustacheExpressReg = () => /\{\{\s*?(\S+)\s*?\}\}/
export const isObject = (obj: any): boolean => obj !== null && typeof obj === 'object' && !(obj instanceof Array)
export const isElementNode = (node: HTMLElement) => node.nodeType === 1
export const isTextNode = (node: HTMLElement) => node.nodeType === 3
export const isChildComponent = (node: HTMLElement) => isElementNode(node) && node.tagName.startsWith(CUSTOM_TAG.toUpperCase())
export const isMustacheExpressText = (text: string) => mustacheExpressReg().test(text)
export const getClickMethod = (node: HTMLElement): string | null => node.getAttribute(CLICK_TAG)
