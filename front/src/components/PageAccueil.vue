<template>
    <div>
      <h1>Page d'accueil</h1>


        <!-- formulaire avec "rentrer un nom" -->
        <form>
            <label for="name">Rentrez un nom</label>
            <input type="text" id="name" name="name">
            <input type="submit" value="Envoyer">
        </form>

    </div>
  </template>
  
  <script>
  export default {
    name: 'PageAccueil'
  }
  </script>