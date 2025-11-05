import { getBreed } from './api.js';

const contenedor = document.getElementById('breedDetails');

const params = new URLSearchParams(window.location.search);
const id = params.get('id');

async function cargarDetalles() {
  if (!id) {
    contenedor.innerHTML = '<p>Error: No se proporcionó un ID válido.</p>';
    return;
  }

  const data = await getBreed(id);

  if (!data || !data.breed || data.breed.length === 0) {
    contenedor.innerHTML = '<p>No se encontraron detalles para este gato.</p>';
    return;
  }

  const breed = data.breed; 

  contenedor.innerHTML = `
    <div class="detalle-gato">
      <img src="${breed.url}" alt="Gato ${breed.id}">
      <h2>${breed.breeds?.[0]?.name || 'Nombre no disponible'}</h2>
      <p><strong>Origen:</strong> ${breed.breeds?.[0]?.origin || 'Desconocido'}</p>
      <p><strong>Descripción:</strong> ${breed.breeds?.[0]?.description || 'Sin descripción'}</p>
      <p><strong>Temperamento:</strong> ${breed.breeds?.[0]?.temperament || 'No disponible'}</p>
      <p><strong>Amigable con niños:</strong> ${breed.breeds?.[0]?.child_friendly || 'No disponible'}</p>
      <p><strong>Amigable con perros:</strong> ${breed.breeds?.[0]?.dog_friendly || 'No disponible'}</p>
      <p class = "wiki-url"><strong>Wikipedia URL:</strong><a class = "url-wiki" href ="${breed.breeds?.[0]?.wikipedia_url}">Mas informacion</a></p>
      
    </div>
  `;
}

window.addEventListener('DOMContentLoaded', cargarDetalles);
