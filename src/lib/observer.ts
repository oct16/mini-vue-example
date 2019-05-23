import { isObject } from 'util'
import { Dep } from './dep'

const arrayPrototype = Array.prototype as any
const arrayMethods = Object.create(arrayPrototype)
;['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'].forEach((method: string) => {
    const original = arrayPrototype[method] as any
    def(arrayMethods, method, function mutator(this: Observer) {
        const args = [...arguments]
        const result = original.apply(this, args)
        const ob = this.__ob__
        let inserted
        switch (method) {
            case 'push':
            case 'unshift':
                inserted = args
                break
            case 'splice':
                inserted = args.slice(2)
                break
        }
        if (inserted) {
            ob.observeArray(inserted)
        }
        ob.dep.notify()
        return result
    })
})

function def(obj: Object, key: string, val: any, enumerable?: boolean) {
    Object.defineProperty(obj, key, {
        value: val,
        enumerable: !!enumerable,
        writable: true,
        configurable: true
    })
}

export class Observer {
    public __ob__: Observer
    public dep: Dep

    constructor(obj: any) {
        this.dep = new Dep()
        if (isObject(obj)) {
            this.walk(obj)
        }
    }

    walk(obj: object) {
        const keys = Object.keys(obj)
        keys.forEach(key => this.defineReactive(obj, key))
    }

    observeArray(array: object[]): void {
        def(array, '__ob__', this, false)
        array.forEach(obj => {
            if (isObject(obj)) {
                this.walk(obj)
            }
        })
    }

    defineReactive(obj: object, key: string): void {
        let val = obj[key]
        const dep = new Dep()
        if (Array.isArray(val)) {
            this.observeArray(val)
        } else if (isObject(val)) {
            new Observer(val)
        }

        Object.defineProperty(obj, key, {
            enumerable: true,
            configurable: true,
            get() {
                dep.depend()
                return val
            },
            set(newVal) {
                if (val !== newVal) {
                    val = newVal
                    dep.notify()
                }
            }
        })
    }
}
