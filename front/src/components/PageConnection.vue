<template>
    <div class="content">
        <h1>Connectez vous</h1>
        <form @submit.prevent="login">
            <input type="text" id="name" name="username" v-model="username" placeholder="Nom d'utilisateur">
            <input type="password" id="password" name="password" v-model="password" placeholder="Mot de passe">
            <input class="send" type="submit" value="Envoyer">
        </form>
        <RouterLink to="/inscription">Pas encore inscrit ?</RouterLink>
    </div>
</template>

<script>
import gql from 'graphql-tag';


export default {
    data() {
        return {
            username: '',
            password: '',
        };
    },
    computed: {
        isUserAuthenticated() {
            return localStorage.getItem('isAuthenticated');
        }
    },
    methods: {
        login() {
            this.$apollo.query({
                query: gql`
                    query Login ($username: String!, $password: String!){
                        login(username: $username, password: $password) {
                            id
                            username
                            }
                            }
                            `,
                variables: {
                    username: this.username,
                    password: this.password
                }
            }).then(({ data }) => {
                if (!data.login) {
                    alert('Nom d\'utilisateur ou mot de passe incorrect');
                    this.username = '';
                    this.password = '';
                    return;
                }
                this.saveUserDate(data.login.id, "VotreTokenIci");
                localStorage.setItem('isAuthenticated', true);
                localStorage.setItem('username', data.login.username);
                localStorage.setItem('userId', data.login.id);
                this.$emit('update:isAuthenticated', true);
                alert(data.login.username + ' est connecté');
                this.$router.push('/').then(() => {
                    location.reload();
                });
            }).catch(() => {
                alert('Nom d\'utilisateur ou mot de passe incorrect');  
            });
        },
        saveUserDate(id, token) {
            localStorage.setItem('token', token);
            localStorage.setItem('id', id);
            this.$root.$data.userId = localStorage.getItem('id');
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