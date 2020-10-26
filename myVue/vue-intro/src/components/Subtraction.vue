<template>
    <div>
        <h3>当前最新的count值为：{{count}}</h3>
        <h4>使用getters获取{{showNum}}</h4>
        <button @click="handleSub">-1</button>
        <button @click="handleSubN">-N</button>
        <button @click="handleSubAsync">-1 async</button>
        <button @click="subAsyncN(5)">-N async</button>
    </div>
</template>

<script>
import {mapState, mapMutations, mapActions, mapGetters} from 'vuex'

export default {
    data(){
        return{
            
        }
    },
    computed:{
        ...mapState(['count']),
        ...mapGetters(['showNum'])
    },
    methods:{
        ...mapMutations(['sub', 'subN']),
        ...mapActions(['subAsync','subAsyncN']),
        handleSub(){
            this.sub()
        },
        handleSubN(){
            this.subN(4)
        },
        handleSubAsync(){
            this.subAsync()
        },
        // handleSubNAsync(){
        //     this.subAsyncN(5)
        // }
    }
}
</script>

<style scoped>

</style>