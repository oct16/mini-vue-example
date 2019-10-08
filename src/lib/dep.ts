import { Watcher } from './watcher'

let uid = 0
export class Dep {
    public static target: Watcher | null
    public subQueue: Watcher[]
    public id: number
    constructor() {
        this.subQueue = []
        this.id = ++uid
    }

    public addSub(sub: Watcher): void {
        this.subQueue.push(sub)
    }

    public notify(): void {
        this.subQueue.forEach(sub => sub.update())
    }

    public depend(): void {
        if (Dep.target) {
            this.addSub(Dep.target)
        }
    }

    public removeSub(sub: Watcher): void {
        const index = this.subQueue.indexOf(sub)
        this.subQueue.splice(index, 1)
    }
}
