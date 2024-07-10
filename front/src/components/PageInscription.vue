<template>
    <div class="content">
        <h1>Inscrivez vous</h1>
        <form @submit.prevent="register">
            <input type="text" id="name" name="name" v-model="name" placeholder="Nom d'utilisateur">
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
      name: '', // Ajoutez cette ligne pour définir la propriété `name`
      password: ''
    };
  },
  methods: {
    register: async function(){
        console.log('Name : ' + this.name + ' Password : ' + this.password)
      await this.$apollo.mutate({
        mutation: gql`
                    mutation CreateUser {
                        createUser(username: $name, password: $password) {
                            id
                            username
                            password
                        }
                    }
                `,
        variables: {
          username: this.name, // Assurez-vous d'utiliser `this.name` ici
          password: this.password
        }
      }).then(() => {
        this.$router.push('/connexion');
        this.$emit('update:isAuthenticated', true);
      }).catch((error) => {
        console.error(error);
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