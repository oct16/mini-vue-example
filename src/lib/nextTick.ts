const callbacks: any = []
let pending = false

function flushCallbacks() {
    pending = false
    const copies = callbacks.slice(0)
    callbacks.length = 0
    for (let i = 0; i < copies.length; i++) {
        copies[i]()
    }
}

const p = Promise.resolve()
const microTimerFunc = () => {
    p.then(flushCallbacks)
}

export function nextTick(cb?: Function, ctx?: Object) {
    callbacks.push(() => {
        if (cb) {
            try {
                cb.call(ctx)
            } catch (e) {
                console.log(e, ctx, 'nextTick')
            }
        }
    })
    if (!pending) {
        pending = true
        microTimerFunc()
    }
}
