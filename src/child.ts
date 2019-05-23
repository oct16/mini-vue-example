const template = `
    <div>
        <hr/>
        <p>I am child</p>
        <p><span>childCount: </span>{{ childCount }}</p>
        <button @@="click">child click</button>
    </div>
`
import { VmConfig } from './lib/model'

export default {
    template,
    data: { childCount: 0 },
    components: {},
    computed: {},
    methods: {
        click() {
            this.data.childCount++
        }
    }
} as VmConfig
