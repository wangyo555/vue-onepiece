<template>
  <div id="app">
    <my-addition></my-addition>
    <hr>
    <my-subtraction></my-subtraction>

    <!-- <router-view></router-view> -->
  </div>
</template>

<script>
import Addition from '@/components/Addition'
import Subtraction from '@/components/Subtraction'

export default {
  data(){
    return{

    }
  },
  components:{
    "my-addition": Addition,
    "my-subtraction": Subtraction
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}


</style>
