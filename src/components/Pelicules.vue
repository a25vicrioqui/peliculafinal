<template>

  <PeliculesDesign
    :buscar="buscar"
    :pelis="pelis"
    :cargando="cargando"
    :error="error"
    :pelicula-seleccionada="peliculaSeleccionada"
    :cargando-detalles="cargandoDetalles"
    @actualitzar-buscar="buscar = $event"
    @buscar-pelis="buscarPelis"
    @limpiar-busqueda="limpiarBusqueda"
    @ver-detalles="verDetalles"
    @cerrar-detalles="peliculaSeleccionada = null"
  />

</template>


<script setup lang="ts">

import { ref } from 'vue'
import PeliculesDesign from './PeliculesDesign.vue'
import {
  buscarPeliculas,
  buscarDetallesPelicula
} from '@/services/communicationManager'


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

const peliculaSeleccionada = ref<any>(null)
const cargandoDetalles = ref(false)


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


const verDetalles = async (imdbID: string) => {

  cargandoDetalles.value = true

  try {

    peliculaSeleccionada.value = await buscarDetallesPelicula(imdbID)

  } catch (e: any) {

    error.value = e.message

  } finally {

    cargandoDetalles.value = false

  }

}


const limpiarBusqueda = () => {

  buscar.value = ''

  pelis.value = []

  error.value = ''

  peliculaSeleccionada.value = null

}

</script>