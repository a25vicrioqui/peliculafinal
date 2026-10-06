<template>

  <v-app-bar :elevation="5">

    <template v-slot:prepend>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
    </template>

    <v-app-bar-title>Cercador de Pelicules</v-app-bar-title>

  </v-app-bar>

  <v-layout
    class="rounded rounded-md border"
  >

    <v-navigation-drawer permanent>

      <v-list nav>

        <v-list-item title="Navigation drawer" link></v-list-item>

      </v-list>

    </v-navigation-drawer>

    <v-main>

      <!-- mostrar informacio detallada de la pelicula selecionada -->

      <v-container>

        <div class="search-row d-flex justify-start align-center ga-3 my-0 px-4">

          <v-text-field
            v-model="buscar"
            class="search-input"
            clearable
            label="Insertar nom de la pelicula"
            variant="solo-filled"
            hide-details
            @keyup.enter="buscarPelis"
          ></v-text-field>

          <v-btn
            variant="outlined"
            color="black"
            class="search-btn"
            :loading="cargando"
            @click="buscarPelis"
          >
            BUSCAR

            <v-img
              :src="search"
              width="24"
              height="24"
              contain
            ></v-img>

          </v-btn>

          <v-btn
            variant="outlined"
            color="black"
            class="search-btn"
            @click="limpiarBusqueda"
          >
            LIMPIAR
          </v-btn>

        </div>

        <v-progress-circular
          v-if="cargando"
          indeterminate
          class="mt-4"
        ></v-progress-circular>


        <v-alert
          v-if="error"
          type="error"
          class="mt-4"
        >
          {{ error }}
        </v-alert>


        <v-container
          v-if="pelis.length > 0"
          class="bg-surface-variant mb-6 mt-6"
        >

          <v-row
            class="align-start"
          >

            <template
              v-for="(peli, index) in pelis"
              :key="peli.imdbID || index"
            >

              <v-col
                cols="12"
                sm="6"
                md="4"
              >

                <v-card
                  class="mx-auto"
                  max-width="344"
                  hover
                >

                  <v-card-item>

                    <div class="d-flex justify-space-around align-center">

                      <div class="ma-4">

                        <div class="text-title-small">
                          {{ peli.Title }}
                        </div>

                        <v-img
                          class="bg-surface elevation-3 poster"
                          :src="peli.Poster !== 'N/A' ? peli.Poster : 'https://via.placeholder.com/300x450?text=Sin+poster'"
                          width="300"
                          height="400"
                          cover
                        ></v-img>

                        <div class="mt-2">
                          {{ peli.Year }}
                        </div>

                        <div class="mt-1">
                          {{ peli.Type }}
                        </div>

                      </div>

                    </div>

                  </v-card-item>

                </v-card>

              </v-col>

            </template>

          </v-row>

        </v-container>

      </v-container>

    </v-main>

  </v-layout>

</template>


<script setup lang="ts">

import { ref } from 'vue'
import search from '../assets/search.png'
import { buscarPeliculas } from '@/services/communicationManager'


interface Pelicula {
  imdbID: string
  Title: string
  Year: string
  Type: string
  Poster: string
}


const buscar = ref('')
const pelis = ref<Pelicula[]>([])
const cargando = ref(false)
const error = ref('')


const buscarPelis = async () => {

  if (!buscar.value.trim()) {

    pelis.value = []
    error.value = ''
    return
  }

  cargando.value = true
  error.value = ''

  try {

    pelis.value = await buscarPeliculas(buscar.value)

  } catch (e: any) {

    error.value = e.message
    pelis.value = []

  } finally {

    cargando.value = false

  }
}


const limpiarBusqueda = () => {

  buscar.value = ''

  pelis.value = []

  error.value = ''

}


</script>


<style scoped>


.poster {
  border-radius: 4px;
}

.search-row {
  width: 100%;
}

.search-input {
  max-width: 320px;
  min-width: 220px;
}

.search-btn {
  flex-shrink: 0;
}

</style>