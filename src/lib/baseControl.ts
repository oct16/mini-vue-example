import { VmConfig } from './model'

export class BaseControl {
    $vm: VmConfig
    $el: HTMLElement
    $template: string
    $data: any
    $components?: object
    $computed?: { [key: string]: (...args) => any }
    $methods?: { [key: string]: (...args) => any }

    constructor(vm: VmConfig) {
        this.$vm = vm
        this.$el = vm.el as HTMLElement
        this.$data = vm.data
        this.$computed = vm.computed
        this.$methods = vm.methods
        this.$template = vm.template
    }
}
