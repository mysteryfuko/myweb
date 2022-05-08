import { defineStore } from 'pinia'
import { StoreNamespace } from './store-namespace'


export const User = defineStore(StoreNamespace.User, {
    state: () => {
        return {
            user: '',
            admin: false
        }
    },
    getters: {
    },
    actions: {}
})