import { Watcher } from './watcher'

let uid = 0
export class Dep {
    static target: Watcher | null
    subQueue: Watcher[]
    id: number
    constructor() {
        this.subQueue = []
        this.id = ++uid
    }

    addSub(sub: Watcher): void {
        this.subQueue.push(sub)
    }

    notify(): void {
        this.subQueue.forEach(sub => sub.update())
    }

    depend(): void {
        if (Dep.target) {
            this.addSub(Dep.target)
        }
    }

    removeSub(sub: Watcher): void {
        const index = this.subQueue.indexOf(sub)
        this.subQueue.splice(index, 1)
    }
}
