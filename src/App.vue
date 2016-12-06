<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import api from './api/api'
//import store from './store/index'
//console.log(TopHeader)
export default {
  name: 'app',
  //store,
  components: {
    
  }
}
</script>

<style>
body {
  padding: 0;
  margin: 0;
  background-color: #eff2f7;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.page-content {
  margin: 0 auto;
}
</style>
