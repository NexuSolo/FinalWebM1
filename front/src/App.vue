<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { io } from "socket.io-client";

const socket = io("ws://localhost:3000");
socket.on("connect", () => {
  console.log("Connecté au serveur WebSocket");
});

socket.on("clyftik6t00011xktc9dmkhc6", (data) => {
  console.log("Message reçu :", data);
});

export default {
  name: 'App'
  
}
</script>

<style>

#app{
  font-family: Arial, sans-serif;
  background-color: #f5f5f5;
}


</style>