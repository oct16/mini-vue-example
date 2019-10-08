import { nextTick } from './nextTick'
import { Watcher } from './watcher'

const queue: Watcher[] = []
let has: { [key: number]: boolean | null } = {}
let waiting = false
let flushing = false
let index = 0

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState() {
    index = queue.length = 0
    has = {}
    waiting = flushing = false
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue() {
    flushing = true
    let watcher, id
    queue.sort((a, b) => a.id - b.id)
    for (index = 0; index < queue.length; index++) {
        watcher = queue[index]
        id = watcher.id
        has[id] = null
        watcher.run()
    }

    resetSchedulerState()
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
export function queueWatcher(watcher: Watcher) {
    const id = watcher.id
    if (has[id] == null) {
        has[id] = true
        if (!flushing) {
            queue.push(watcher)
        }
        if (!waiting) {
            waiting = true
            nextTick(flushSchedulerQueue)
        }
    }
}
