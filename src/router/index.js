import { createRouter, createWebHistory } from 'vue-router'
import AccueilView from '../views/AccueilView.vue'
import mapView from "../views/mapView.vue";
import GenreView from "../views/GenreView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", name: "Accueil", component: AccueilView },
    // ici les autre routes
    { path: "/map", name: "Carte", component: mapView },
    { path: "/bar", name: "Genre", component: GenreView },
  ],
});

export default router
