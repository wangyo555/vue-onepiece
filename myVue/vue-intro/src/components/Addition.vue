<template>
    <div>
        <h3>当前最新的count值为：{{$store.state.count}}</h3>
        <h4>使用getters获取{{$store.getters.showNum}}</h4>
        <button @click="handleAdd">+1</button>
        <button @click="handleAddN">+N</button>
        <button @click="handleAddAsync">+1 async 2s</button>
        <button @click="handleAddAsyncN">+N async 2s</button>
    </div>
</template>

<script>
export default {
    data(){
        return{

        }
    },
    methods:{
        handleAdd(){
            this.$store.commit('add')
        },
        handleAddN(){
            this.$store.commit('addN', 3)
        },
        // 异步操作
        handleAddAsync(){
            this.$store.dispatch('addAsync')
        },
        handleAddAsyncN(){
            this.$store.dispatch('addAsyncN', 4)
        }
    }
}
</script>

<style scoped>

</style>