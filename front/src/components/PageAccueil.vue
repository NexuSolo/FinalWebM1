<template>
  <div class="content">
    <div v-if="isUserLoggedIn">
      <router-link to="/conversations">
        <img class="logo" src="../assets/mesage.png" alt="">
      </router-link>
    </div>
    <div v-else>
      <img class="logo" src="../assets/mesage.png" alt="">
    </div>
    <div v-if="!isUserLoggedIn" class="button-connection" @click="goToConnection">
      Se connecter
    </div>
    <div v-else>
      Bonjour {{ userName }}
    </div>
  </div>

  <BouttonDeco />
</template>

<script>
import BouttonDeco from './BoutonDeco.vue';

export default {
  components: {
    BouttonDeco
  },
  mounted() {
  },
  name: 'PageAccueil',
  data() {
    return {
      name: ''
    }
  },
  computed: {
    isUserLoggedIn() {
      return localStorage.getItem('userId') !== null;
    },
    userName() {
      return localStorage.getItem('username');
    }
  },
  methods: {
    goToConnection() {
      this.$router.push('/connection');
    },
    logout() {
      localStorage.clear();
      this.$router.push('/').then(() => {
          location.reload();
      });
    }
  }
}
</script>

<style scoped>

.button-connection{
  background-color: #e3e3e3;
  border: none;
  color: rgb(54, 54, 54);
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  padding: 10px 24px;
  border-radius: 12px;
  transition-duration: 0.4s;
}

.button-connection:hover{
  background-color: #d3d3d3;
}

.content {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  margin: 0;
  padding: 0;
}

.logo{
  width: 10vh;
  margin-bottom: 20px;
  opacity: 0.3;
}

</style>