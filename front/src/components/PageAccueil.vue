<template>
  <div class="content">
    <!-- Rendre le logo cliquable et le lier à l'URL '/conversations' -->

    <div v-if="isUserLoggedIn">
      <router-link to="/conversations">
        <img class="logo" src="../assets/mesage.png" alt="">
      </router-link>
    </div>
    <div v-else>
      <img class="logo" src="../assets/mesage.png" alt="">
    </div>

    <!-- Afficher le bouton de connexion si l'utilisateur n'est pas connecté -->
    <div v-if="!isUserLoggedIn" class="button-connection" @click="goToConnection">
      Se connecter
    </div>
    <!-- Afficher le message de bienvenue si l'utilisateur est connecté -->
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
    console.log(localStorage);
  },
  name: 'PageAccueil',
  data() {
    return {
      name: ''
    }
  },
  computed: {
    isUserLoggedIn() {
      // Vérifie si 'userToken' existe dans le localStorage pour déterminer si l'utilisateur est connecté
      return localStorage.getItem('userId') !== null;
    },
    userName() {
      // Récupère le nom de l'utilisateur du localStorage
      return localStorage.getItem('username');
    }
  },
  methods: {
    goToConnection() {
      this.$router.push('/connection');
    },
    logout() {
      // Supprimer les données de l'utilisateur du stockage local ou de la session
      localStorage.clear();

      // Rediriger l'utilisateur vers la page de connexion
      this.$router.push('/').then(() => {
          location.reload();
        });
    }
  }
}
</script>

<style scoped>

.button-connection{
  background-color: #e3e3e3; /* Green */
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