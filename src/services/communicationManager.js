export async function buscarPeliculas(titulo) {

  const url = `https://www.omdbapi.com/?i=tt3896198&apikey=3e179885&s=${encodeURIComponent(titulo)}`

  const response = await fetch(url)
  const data = await response.json()

  if (data.Response === 'False') {
    throw new Error(data.Error)
  }

  return data.Search
}