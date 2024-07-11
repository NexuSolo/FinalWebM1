<template>
    <div v-if="isUserLoggedIn">
        <button class="deco" @click="logout">Déconnexion</button>
    </div>
    <div v-if="!isHome">
        <button class="accueil" @click="goHome">Accueil</button>
    </div>
</template>

<script>

export default {
    name: 'BoutonDeco',
    computed: {
        isUserLoggedIn() {
            return localStorage.getItem('userId') !== null;
        },
        isHome() {
            return this.$route.path === '/';
        }
    },
    methods: {
        logout() {
            localStorage.clear();
            this.$router.push('/').then(() => {
                location.reload();
            });
        },
        goHome() {
            // Rediriger l'utilisateur vers la page d'accueil
            this.$router.push('/');
        }
    }
}

</script>

<style scoped>

.deco{
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
    position: absolute;
    right: 10%;
    top: 93%;
}

.accueil{
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
    position: absolute;
    left: 10%;
    top: 93%;
}

button:hover {
    background-color: #555555;
    color: white;
}

</style>