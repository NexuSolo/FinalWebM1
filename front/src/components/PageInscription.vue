<template>
    <div class="content">
        <h1>Inscrivez vous</h1>
        <form @submit.prevent="register">
            <input type="text" id="name" name="name" v-model="name" placeholder="Nom d'utilisateur">
            <input type="password" id="password" name="password" v-model="password" placeholder="Mot de passe">
            <input class="send" type="submit" value="Envoyer">
        </form>
        <RouterLink to="/connection">Se connecter</RouterLink>
    </div>
</template>

<script>
import gql from 'graphql-tag';

export default {
  data() {
    return {
      name: '',
      password: ''
    };
  },
  methods: {
    register: async function(){
      await this.$apollo.mutate({
        mutation: gql`
                    mutation CreateUser($username: String!, $password: String!) {
                        createUser(username: $username, password: $password) {
                            id
                            username
                            password
                        }
                    }
                `,
        variables: {
          username: this.name,
          password: this.password
        }
      }).then(() => {
        this.$router.push('/connection');
        this.$emit('update:isAuthenticated', true);
      }).catch(() => {
        alert('Nom d\'utilisateur déjà utilisé');
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
    display: none;
}
</style>