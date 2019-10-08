import { VmConfig } from './model'
import { mustacheExpressReg } from './utils'
import { VM } from './vm'
import { Watcher } from './watcher'

export class Directive {
    public $data: object
    public $vm: VmConfig
    constructor(vm: VmConfig) {
        this.$data = vm.data
        this.$vm = vm
    }

    public getVal(exp: string): any {
        let val = this.$data
        const keys = exp.split('.')
        keys.forEach(key => (val = val[key]))
        return val
    }

    public textParser(node: HTMLElement, exp: string): void {
        const val = this.getVal(exp)
        node.textContent = (node.textContent as string).replace(mustacheExpressReg(), val)

        new Watcher(
            {
                exp,
                vm: this.$vm
            },
            val => {
                node.textContent = val
            }
        )
    }

    public childComponentParser(node: HTMLElement): void {
        const tagName = node.tagName.toLowerCase().replace('-', '')
        const components = this.$vm.components
        if (components) {
            const _components = Object.keys(components).reduce((pre, cur) => {
                const lowerKey = cur.toLowerCase().replace('-', '')
                pre[lowerKey] = components[cur]
                return pre
            }, {})
            const childComponentConfig = _components[tagName]
            if (childComponentConfig) {
                new VM({
                    ...childComponentConfig,
                    el: node
                })
            }
        }
    }
}
