<template>
    <div v-if="isUserLoggedIn">
        <button @click="logout">Déconnexion</button>
    </div>
</template>

<script>

export default {
    name: 'BoutonDeco',
    computed: {
        isUserLoggedIn() {
            return localStorage.getItem('userId') !== null;
        }
    },
    methods: {
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

button{
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

button:hover {
    background-color: #555555;
    color: white;
}

</style>