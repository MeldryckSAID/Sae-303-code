<script setup lang="ts">
import Map from "../components/map.vue";
import Mapd from "../components/mapd.vue";
</script>

<template>
  <header></header>
  <main>
    <h1>Voici une carte vous permettant de voir les festivals par région</h1>
    <Map></Map>

    <h2>voici un digramme en donut vous permettant de voir le nombre de festival par région et le poucentage sur la totalité</h2>
  <Mapd/>
  </main>
</template>
