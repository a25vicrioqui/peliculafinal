<template>

  <v-app-bar
    :elevation="5"
    class="barra"
  >
    <template v-slot:prepend>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
    </template>

    <v-app-bar-title>Cercador de Pelicules</v-app-bar-title>
  </v-app-bar>

  <v-layout
    class="layout rounded rounded-md border"
  >

    <v-navigation-drawer
      permanent
      class="menu"
    >
      <v-list nav>
        <v-list-item
          title="Cercador de Pelicules"
          link
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main class="fondo">

      <v-container class="contenidor">

        <!-- mostrar informacio detallada de la pelicula selecionada -->

        <div class="search-row">

          <v-text-field
            :model-value="buscar"
            @update:model-value="$emit('actualitzar-buscar', $event)"
            class="search-input"
            clearable
            label="Insertar nom de la pelicula"
            variant="solo-filled"
            hide-details
            @keyup.enter="$emit('buscar-pelis')"
          ></v-text-field>

          <v-btn
            variant="outlined"
            class="search-btn buscar-btn"
            :loading="cargando"
            @click="$emit('buscar-pelis')"
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
            class="search-btn limpiar-btn"
            @click="$emit('limpiar-busqueda')"
          >
            LIMPIAR
          </v-btn>

        </div>

        <v-progress-circular
          v-if="cargando"
          indeterminate
          class="mt-6"
        ></v-progress-circular>

        <v-alert
          v-if="error"
          type="error"
          class="mt-6"
        >
          {{ error }}
        </v-alert>

        <v-container
          v-if="pelis.length > 0"
          class="peliculas-container"
        >

          <v-row class="peliculas-row">

            <template
              v-for="(peli, index) in pelis"
              :key="peli.imdbID || index"
            >

              <v-col
                cols="12"
                sm="6"
                md="4"
                class="pelicula-col"
              >

                <v-card
                  class="pelicula"
                  max-width="344"
                  hover
                >

                  <v-card-item>

                    <div class="pelicula-contenido">

                      <div class="pelicula-titulo">
                        {{ peli.Title }}
                      </div>

                      <v-img
                        class="poster"
                        :src="peli.Poster !== 'N/A' ? peli.Poster : 'https://via.placeholder.com/300x450?text=Sin+poster'"
                        width="300"
                        height="400"
                        cover
                      ></v-img>

                      <div class="pelicula-info">

                        <div>
                          Año: {{ peli.Year }}
                        </div>

                        <div>
                          Tipo: {{ peli.Type }}
                        </div>

                        <v-btn
                          class="info-btn"
                          variant="outlined"
                          @click="$emit('ver-detalles', peli.imdbID)"
                        >
                          VER MÁS INFO
                        </v-btn>

                      </div>

                    </div>

                  </v-card-item>

                </v-card>

              </v-col>

            </template>

          </v-row>

        </v-container>

        <v-dialog
          :model-value="peliculaSeleccionada !== null"
          max-width="600"
          @update:model-value="$emit('cerrar-detalles')"
        >

          <v-card
            v-if="peliculaSeleccionada"
            class="detalle-card"
          >

            <v-card-title>
              {{ peliculaSeleccionada.Title }}
            </v-card-title>

            <v-card-text>

              <div class="detalle-contenido">

                <v-img
                  :src="peliculaSeleccionada.Poster"
                  width="200"
                  height="280"
                  cover
                  class="detalle-poster"
                ></v-img>

                <div class="detalle-info">

                  <p>
                    <strong>Año:</strong>
                    {{ peliculaSeleccionada.Year }}
                  </p>

                  <p>
                    <strong>Duración:</strong>
                    {{ peliculaSeleccionada.Runtime }}
                  </p>

                  <p>
                    <strong>Género:</strong>
                    {{ peliculaSeleccionada.Genre }}
                  </p>

                  <p>
                    <strong>Director:</strong>
                    {{ peliculaSeleccionada.Director }}
                  </p>

                  <p>
                    <strong>Actores:</strong>
                    {{ peliculaSeleccionada.Actors }}
                  </p>

                  <p>
                    <strong>Valoración:</strong>
                    {{ peliculaSeleccionada.imdbRating }}
                  </p>

                </div>

              </div>

              <p class="detalle-argumento">
                <strong>Argumento:</strong>
                {{ peliculaSeleccionada.Plot }}
              </p>

            </v-card-text>

            <v-card-actions>

              <v-btn
                class="cerrar-btn"
                @click="$emit('cerrar-detalles')"
              >
                CERRAR
              </v-btn>

            </v-card-actions>

          </v-card>

        </v-dialog>

      </v-container>

    </v-main>

  </v-layout>

</template>

<script setup lang="ts">

import search from '../assets/search.png'

interface Pelicula {
  imdbID: string
  Title: string
  Year: string
  Type: string
  Poster: string
}

defineProps<{
  buscar: string
  pelis: Pelicula[]
  cargando: boolean
  error: string
  peliculaSeleccionada: any
  cargandoDetalles: boolean
}>()

defineEmits<{
  (e: 'actualitzar-buscar', valor: string): void
  (e: 'buscar-pelis'): void
  (e: 'limpiar-busqueda'): void
  (e: 'ver-detalles', imdbID: string): void
  (e: 'cerrar-detalles'): void
}>()

</script>

<style scoped>

.contenidor {
  max-width: 1200px;
  margin: 0 auto;
  padding: 30px;
}

/* Barra y menu */

.barra,
.menu {
  background-color: #2A1D44;
  color: white;
}

.menu .v-list-item {
  color: #EB8383;
}

/* Fons principal */

.fondo {
  background: linear-gradient(135deg, #2A1D44 0%, #EB8383 100%);
  min-height: 100vh;
}

/* Buscador */

.search-row {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  margin-bottom: 25px;
}

.search-input {
  max-width: 400px;
  min-width: 250px;
}

.search-input :deep(.v-field) {
  background-color: #F8DADA;
}

/* Botons */

.search-btn {
  flex-shrink: 0;
  min-height: 48px;
  border-color: #2A1D44;
  color: #2A1D44;
  background-color: #F8DADA;
}

.search-btn:hover,
.info-btn:hover {
  background-color: #EB8383;
  color: #2A1D44;
}

/* Contenidor de les pelicules */

.peliculas-container {
  margin-top: 25px;
  padding: 20px 0;
}

.peliculas-row {
  align-items: stretch;
}

.pelicula-col {
  display: flex;
  justify-content: center;
}

/* Cards */

.pelicula {
  width: 100%;
  text-align: center;
  border-radius: 10px;
  padding-bottom: 10px;
  background-color: #2A1D44;
  color: white;
}

.pelicula-contenido {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.pelicula-titulo {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 15px;
  min-height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #EB8383;
}

.poster {
  border-radius: 6px;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.30);
}

.pelicula-info {
  width: 100%;
  margin-top: 15px;
  font-size: 15px;
  line-height: 1.8;
  color: #769DA3;
}

/* Boton de mas informacion */

.info-btn {
  margin-top: 15px;
  border-color: #EB8383;
  color: #EB8383;
}

/* Ventana de detalles */

.detalle-card {
  background-color: #2A1D44;
  color: white;
}

.detalle-card .v-card-title {
  color: #EB8383;
  font-size: 22px;
}

.detalle-contenido {
  display: flex;
  gap: 20px;
}

.detalle-poster {
  border-radius: 6px;
}

.detalle-info {
  line-height: 1.8;
}

.detalle-info p {
  margin-bottom: 5px;
}

.detalle-argumento {
  margin-top: 20px;
  line-height: 1.6;
}

.cerrar-btn {
  background-color: #F8DADA;
  color: #2A1D44;
}

</style>