import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        count: 0,
    },
    mutations: {
        // 只有mutations中的方法才有权限修改state中的数据
        add(state) {
            // 不能在mutations中执行异步操作，如setTimeout
            state.count++
        },
        addN(state, step) {
            state.count += step
        },
        sub(state) {
            state.count--
        },
        subN(state, step) {
            state.count -= step
        }


    },
    actions: {
        // 异步操作，点击2s后加1
        addAsync(context) {
            setTimeout(() => {
                context.commit('add')
            }, 2000)
        },
        // 异步传值
        addAsyncN(context, step) {
            setTimeout(() => {
                context.commit('addN', step)
            }, 2000)
        },
        // 异步操作，点击2s后加1
        subAsync(context) {
            setTimeout(() => {
                context.commit('sub')
            }, 2000)
        },
        // 异步传值
        subAsyncN(context, step) {
            setTimeout(() => {
                context.commit('subN', step)
            }, 2000)
        },
    },
    getters: {
        showNum(state) {
            return '当前最新的数值是：' + state.count
        }
    },
    modules: {}
})