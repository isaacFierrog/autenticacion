<template>
  <main>
    <form @submit.prevent="autenticarUsuario">
      <p>Usuario</p>
      <input type="text" v-model="usuario">
      <p>Password</p>
      <input type="password" v-model="password">
      <input type="submit" value="Ingresar">
    </form>
  </main>
</template>

<script>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useCounterStore } from '../stores/counter';

export default {
  setup() {
    const usuario = ref('');
    const password = ref(''); 
    const store = useCounterStore();
    const { autenticado } = storeToRefs(store);

    const guardarEnLocal = ({ access, refresh }) => {
      localStorage.setItem('access', access);
      localStorage.setItem('refresh', refresh);
    };
    const autenticarUsuario = async() => {
      try{
        console.log(usuario.value)
        console.log(password.value)

        const url = 'http://192.168.1.137:8000/api/usuarios/token/'
        const res = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json; charset=UTF-8'
          },
          body: JSON.stringify({
            username: usuario.value,
            password: password.value
          })
        })
        const data = await res.json();
        const { status, statusText } = res;

        if(!res.ok) throw { status, statusText };

        guardarEnLocal(data);
        autenticado.value = true;
      }catch(err){
        console.log(err)
      }
    }
    
    return {
      usuario,
      password,

      autenticarUsuario
    }
  }
}
</script>