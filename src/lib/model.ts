export interface VmConfig {
    el?: HTMLElement
    template: string
    data: any
    components?: object
    computed?: { [key: string]: (...args) => any }
    methods?: any
}

export interface WatcherConfig {
    vm: VmConfig
    exp: string
}
