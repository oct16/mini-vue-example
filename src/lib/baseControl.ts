import { VmConfig } from './model'

export class BaseControl {
    public $vm: VmConfig
    public $el: HTMLElement
    public $template: string
    public $data: any
    public $components?: object
    public $computed?: { [key: string]: (...args) => any }
    public $methods?: { [key: string]: (...args) => any }

    constructor(vm: VmConfig) {
        this.$vm = vm
        this.$el = vm.el as HTMLElement
        this.$data = vm.data
        this.$computed = vm.computed
        this.$methods = vm.methods
        this.$template = vm.template
    }
}
