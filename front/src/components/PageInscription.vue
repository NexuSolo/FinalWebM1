<template>
    <div class="content">
        <h1>Inscrivez vous</h1>
        <form @submit.prevent="register">
            <input type="text" id="name" name="name" v-model="name" placeholder="Nom d'utilisateur">
            <input type="email" id="email" name="email" v-model="email" placeholder="Email">
            <input type="password" id="password" name="password" v-model="password" placeholder="Mot de passe">
            <input class="send" type="submit" value="Envoyer">
        </form>
        <!-- router link vers page d'inscription -->
        <RouterLink to="/connection">Se connecter</RouterLink>
    </div>
</template>

<script>
import gql from 'graphql-tag';

export default {
  data() {
    return {
      name: '', // Propriété pour le nom d'utilisateur
      email: '', // Ajoutez cette ligne pour définir la propriété `email`
      password: '' // Propriété pour le mot de passe
    };
  },
  methods: {
    register: async function(){
      await this.$apollo.mutate({
        mutation: gql`
                    mutation CreateUser($email: String!, $password: String!, $username: String!) {
                        createUser(email: $email, password: $password, username: $username) {
                            email
                            id
                            username
                        }
                    }
                `,
        variables: {
          email: this.email, // Utilisez la propriété `email` pour la variable email
          username: this.name, // Utilisez la propriété `name` pour la variable username
          password: this.password // Utilisez la propriété `password` pour la variable password
        }
      }).then(() => {
        this.$router.push('/connection');
        this.$emit('update:isAuthenticated', true);
      }).catch(() => {
        alert('Nom d\'utilisateur ou email déjà utilisé');
      });
    }
  }
}
</script>

<style scoped>
.content {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    height: 100vh;
}

h1 {
    font-size: 2em;
    margin-bottom: 20px;
}

form {
    display: flex;
    flex-direction: column;
    align-items: center;
}

input {
    width: 300px;
    height: 50px;
    border: none;
    border-radius: 5px;
    margin-bottom: 20px;
    padding-left: 10px;
    font-size: 1.5em;
}

.send {
    /* cacher */
    display: none;
}
</style>