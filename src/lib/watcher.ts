import { BaseControl } from './baseControl'
import { Dep } from './dep'
import { WatcherConfig } from './model'
import { queueWatcher } from './schaduler'

let uid = 0
export class Watcher extends BaseControl {
    public id: number
    private value: any
    private exp: string
    private $cb: any
    constructor(opt: WatcherConfig, cb: (...args: any) => any) {
        super(opt.vm)
        this.id = ++uid
        this.exp = opt.exp
        this.$cb = cb
        Dep.target = this
        this.value = this.getVal(this.exp)
        Dep.target = null
    }

    public update(): void {
        queueWatcher(this)
    }

    public run(): void {
        const newVal = this.getVal(this.exp)
        this.$cb.call(this.$vm, newVal)
    }

    public getVal(exp: string): any {
        let val = this.$data
        const keys = exp.split('.')
        keys.forEach(key => (val = val[key]))
        return val
    }
}
