<template>
  <div class="content">
    <h1>Accueil</h1>
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




  </style>
