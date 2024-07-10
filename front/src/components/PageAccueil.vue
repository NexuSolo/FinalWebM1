<template>
  <div class="content">
    <h1>Accueil</h1>
    <!-- Bouton de déconnexion -->
    <button @click="logout">Déconnexion</button>
  </div>
</template>

<script>
export default {
  name: 'PageAccueil',
  data() {
    return {
      name: ''
    }
  },
  mounted() {
    console.log(localStorage);
  },
  methods: {
    submitForm() {
      console.log(this.name);
    },
    logout() {
      // Supprimer les données de l'utilisateur du stockage local ou de la session
      localStorage.clear(); // ou sessionStorage.clear() selon ce que vous utilisez

      // Rediriger l'utilisateur vers la page de connexion
      this.$router.push('/connection').then(() => {
          location.reload();
        });
    }
  }
}
</script>

<style scoped>
</style>