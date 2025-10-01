const fs = require('fs');

// Leer el archivo JSON
let cliente = JSON.parse(fs.readFileSync('cliente.json', 'utf8'));

// Crear un objeto para contar las categorías
let categoriaConteo = {};

// Recorrer todos los clientes
cliente.data.forEach(item => {
    let categoria = item.categoria || 'Sin categoría';
    // Sumar la cantidad de cada categoría
    categoriaConteo[categoria] = (categoriaConteo[categoria] || 0) + 1;
});

// Obtener la lista de categorías distintas
let categoriasDistintas = Object.keys(categoriaConteo);

// Ordenar por cantidad (de mayor a menor)
let categoriasOrdenadas = categoriasDistintas.sort((a, b) => categoriaConteo[b] - categoriaConteo[a]);

// Mostrar resultados
console.log('Categorías distintas:', categoriasDistintas);
console.log('Conteo por categoría:', categoriaConteo);
console.log('Categorías ordenadas por cantidad:', categoriasOrdenadas);
console.log('La categoría más frecuente es:', categoriasOrdenadas[0], 'con', categoriaConteo[categoriasOrdenadas[0]], 'clientes');
