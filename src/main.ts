import { createApp,toRaw } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia, PiniaPluginContext } from 'pinia'

const setStorage = (key: string, value: any) => {
    localStorage.setItem(key, JSON.stringify(value))
}
const getStorage = (key: string) => {
    return localStorage.getItem(key)? JSON.parse(localStorage.getItem(key) as string) :{}
}
type PiniaPluginOptions = {
    key?: string
}
const piniaPlugin = (options:PiniaPluginOptions) => {

    return (context: PiniaPluginContext) => {
        const { store } = context;
        const data = getStorage(options.key || 'pinia')
        store.$subscribe(() => {
            setStorage(options.key || 'pinia', toRaw(store.$state));
        });
        console.log(store);
        return{
            ...data
        }        
    }
}
const store = createPinia()
store.use(piniaPlugin({
    key:'pinia'
}))

createApp(App).use(store).use(router).mount('#app')
