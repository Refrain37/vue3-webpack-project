<template>
  <div>
    this is home page
    <div>{{value}}</div>
    <button @click="increment">increment</button>
    <button @click="navigato">跳转about页面</button>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

export default defineComponent({
  setup () {
    const navigato = useNavigate()
    const {value,increment} = useGetValue()
   

    return {
      navigato,
      value,
      increment
    }
  }
})

function useNavigate() {
  const router = useRouter()
  return () => router.push('/about')
}

const useGetValue = () => {
  const store = useStore()
  const value = computed(() =>  store.state.value)
  const increment = () => {
    store.dispatch('increment')
  }
  return {
    value,
    increment    
  } 
}

</script>

<style scoped>

</style>