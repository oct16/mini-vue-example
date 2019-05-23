import { BaseControl } from './baseControl'
import { Directive } from './directives'
import { VmConfig } from './model'
import { getClickMethod, isChildComponent, isElementNode, isMustacheExpressText, isTextNode } from './utils'

export class Compiler extends BaseControl {
    $data: any
    $vm: VmConfig

    directive: Directive
    constructor(vm: VmConfig) {
        super(vm)
        this.$vm = vm

        this.directive = new Directive(vm)
        const rootEl = this.createRootElement()
        this.compileEl(rootEl)
    }

    private createRootElement(): HTMLElement {
        const elString = this.$template
        const html = document.createElement('div')
        html.innerHTML = elString
        return html.firstElementChild as HTMLElement
    }

    private compileEl(el: HTMLElement): void {
        const frag = this.node2frag(el)
        this.compileNodes(frag)
        this.$el.appendChild(frag)
    }

    private node2frag(el: HTMLElement): DocumentFragment {
        const frag = document.createDocumentFragment()
        while (el.firstChild) {
            frag.appendChild(el.firstChild)
        }
        return frag
    }

    private compileNodes(frag: DocumentFragment | HTMLElement): void {
        const nodes = Array.prototype.slice.call(frag.childNodes)
        nodes.forEach((node: HTMLElement) => {
            this.compileNode(node)
        })
    }

    private compileNode(node: HTMLElement) {
        if (node.childNodes.length) {
            this.compileNodes(node)
        }

        if (isTextNode(node) && isMustacheExpressText(node.textContent as string)) {
            this.directive.textParser(node, RegExp.$1)
        } else if (isElementNode(node)) {
            const clickMethod = getClickMethod(node)

            if (isChildComponent(node)) {
                this.directive.childComponentParser(node)
            }

            if (clickMethod) {
                const { methods } = this.$vm
                const method = clickMethod
                node.addEventListener('click', e => {
                    methods[method].call(this.$vm)
                })
            }
        }
    }
}
