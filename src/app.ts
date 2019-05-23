import { MockService } from './service/mock.service'
const template = `
    <div>
        <div>
            <p>{{ title }}</p>
            <p>{{ app.name }}</p>
        </div>
        <div>
            <p class="count">{{ count }}</p>
            <button @@="updateCount">click++</button>
        </div>
        <app-child></app-child>
    </div>
`

import { VM } from './lib/vm'
const mockService = new MockService()
const data = mockService.getData()
import appChild from './child'
const vm = new VM({
    el: document.querySelector('#app') as HTMLElement,
    template,
    data,
    components: {
        appChild
    },
    computed: {},
    methods: {
        updateCount() {
            this.data.count++
            setTimeout(() => {
                console.log((document.querySelector('.count') as HTMLElement).innerText)
            })
        }
    }
})
;(window as any).vm = vm
