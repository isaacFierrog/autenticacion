import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  const autenticado = ref(false);
  const refFuncionRefresh = ref();
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  const verificarAutenticacion = () => {
    const ls = localStorage;

    if(ls.getItem('access') && ls.getItem('refresh')){
      autenticado.value = true;
    }else{
      autenticado.value = false;
    }
  };

  return { 
    count, 
    doubleCount, 
    increment, 
    autenticado,
    refFuncionRefresh,
    verificarAutenticacion
  }
})
