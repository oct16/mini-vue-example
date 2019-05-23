import { Compiler } from './compiler'
import { VmConfig } from './model'
import { Observer } from './observer'

export class VM {
    constructor(vm: VmConfig) {
        new Observer(vm.data)
        new Compiler(vm)
        return vm
    }
}
