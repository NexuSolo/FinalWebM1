<template>

  <div class="content">
    <h1>À qui voulez vous parler ?</h1>
    <form @submit.prevent="newConv">
      <input type="text" id="username" name="username" v-model="username">
      <input class="send" type="submit" value="Envoyer">
    </form>
  </div>

</template>

<script>

import gql from 'graphql-tag';

export default {
  name: 'PageNewConveration',
  data() {
    return {
      username: ''
    }
  },
  methods: {
    newConv() {
      this.$apollo.query({
        query: gql`
                    query GetUtilisateurByUsername($username: String!) {
                        getUtilisateurByUsername(username: $username) {
                            id
                            username
                        }
                    }
                    `,
        variables: {
          username: this.username,
        }
      }).then(({ data }) => {
        // Supposons que votre requête retourne un objet user similaire à ce que faisait la mutation
        // et que vous avez une logique pour gérer la réponse.
        console.log(data);
        if (!data) {
          alert('Nom d\'utilisateur ou mot de passe incorrect');
          this.username = '';
          return;
        }

        this.createNewConv(data.getUtilisateurByUsername.id);


        // Supposons que vous avez une méthode pour sauvegarder les données de l'utilisateur
        this.$router.push('/conversations').then(() => {
          location.reload();
        });
      }).catch(() => {
        console.log("Utilisateur introuvable");
        // console.error(error);
      });
    },
    createNewConv(nouveauContact){
      this.$apollo.mutate({
        mutation: gql`
                    mutation CreateConversation($id: String!, $nouveauContact: String!) {
                        createConversation(
                            user1: $id
                            user2: $nouveauContact
                        ) {
                            id
                        }
                    }
                    `,
        variables: {
          nouveauContact: nouveauContact,
          id: localStorage.getItem('id')
        }
      }).then(() => {
        console.log("Conversation créée");
      }).catch((error) => {
        console.log("Erreur lors de la création de la conversation");
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