<script setup lang="ts">
import { ref } from 'vue'
const menuVisible = ref(true);
</script>

<template>
    <div class="z-10">
        <!-- Menu responsive -->

        <div class="overflow-y-hidden bg-violet-600 h-full w-screen fixed " :class="{ hidden: menuVisible }">
            <div class="flex justify-end mt-4">
                <button v-if="!menuVisible" v-on:click="menuVisible = !menuVisible" class="mx-4">
                    <svg xmlns="http://www.w3.org/2000/svg" class=" h-8 w-8 text-black" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            <ul class="m-8 font-inter leading-extra-loose font-Montserrat flex flex-col text-center text-xl ">
                <li class="mb-7">
                    <router-link class="text-white no-underline hover:text-jaune-100" to="/">
                        <p class="">Accueil</p>
                    </router-link>
                </li>
                <li class="mb-7">
                    <router-link class="text-white no-underline hover:text-jaune-0" to="/">
                        <p class="">bar</p>
                    </router-link>
                </li>
                <li class="mb-7">
                    <router-link class="text-white no-underline hover:text-jaune-0" to="/">
                        <p class="">line</p>
                    </router-link>
                </li>
                <li class="mb-7">
                    <router-link class="text-white no-underline hover:text-jaune-0" to="/">
                        <p class="">pie</p>
                    </router-link>
                </li>
                <li class="mb-7">
                    <router-link class="text-white no-underline hover:text-jaune-0" to="/map">
                        <p class="">Map</p>
                    </router-link>
                </li>

            </ul>
        </div>

        <!-- Menu desktop -->
        <div class="mx-10 ">
            <div class="hidden lg:flex justify-between mt-12  ">
                <div class="flex items-center ">
                    <RouterLink class=" font-yeseva text-5xl text-black " to="/">
                        home
                    </RouterLink>
                </div>

                <div class=" hidden lg:flex items-center space-x-6 font-Montserrat text-2xl">
                    <router-link class="" to="/bar">
                        <p class="text-verde hover:border-b hover:border-verde font-semibold">bar</p>
                    </router-link>
                    <router-link class="text-black" to="/">
                        <p class="text-verde hover:border-b hover:border-verde font-semibold">line</p>
                    </router-link>
                    <router-link class="text-black shrink-0" to="/">
                        <p class="text-verde hover:border-b hover:border-verde font-semibold">pie</p>
                    </router-link>
                    <router-link class="text-black" to="/map">
                        <p class="text-verde hover:border-b hover:border-verde font-semibold">Map</p>
                    </router-link>
                </div>
            </div>
        </div>

        <div class="lg:hidden mb-12">
            <div class="flex items-center justify-between">
                <div class="mx-4 mt-4">
                    <RouterLink class=" font-yeseva text-5xl text-black " to="/">
                      home
                    </RouterLink>
                </div>
                <button v-on:click="menuVisible = !menuVisible" class="mx-4">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-verde" viewBox="0 0 20 20"
                        fill="black" :class="{ hidden: !menuVisible }">
                        <path fill-rule="evenodd"
                            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                            clip-rule="black" />
                    </svg>
                </button>
            </div>
        </div>



    </div>
</template>