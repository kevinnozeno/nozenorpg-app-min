import { createStore } from 'vuex'

export const store = createStore({
    state () {
        return {
            user: localStorage.getItem('user'),
            character: localStorage.getItem('character')
        }
    },
    getters: {
        getUser (state: {user: string | null; character: string | null}) {
            return state.user ? JSON.parse(state.user) : state.user
        },
        getCharacter (state: {user: string | null; character: string | null}) {
            return state.character ? JSON.parse(state.character) : state.character
        }
    },
    mutations: {
        setUser (state: {user: string | null; character: string | null}, user: string) {
            localStorage.setItem('user', JSON.stringify(user))
            state.user = localStorage.getItem('user')
        },
        setCharacter (state: {user: string | null; character: string | null}, character: string) {
            localStorage.setItem('character', JSON.stringify(character))
            state.character = localStorage.getItem('character')
        }
    }
})
