<template>
  <div class="content">
    <h1>Rentrez un nom</h1>
      <form @submit.prevent="submitForm">
          <input type="text" id="name" name="name" v-model="name">
          <input class="send" type="submit" value="Envoyer">
      </form>
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
  methods: {
      submitForm() {
          console.log(this.name);
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

  .send{
    /* cacher */
    display: none;
  }



  </style>
