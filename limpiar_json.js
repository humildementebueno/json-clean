const fs = require('fs');

// 1. Leer el archivo
const registros = JSON.parse(fs.readFileSync('Produtos22082025.json', 'utf8'));

const vistos = new Set();
const filtrados = [];
const duplicadosArr = [];

// 2. Recorrer y limpiar
for (const reg of registros) {
    // Eliminar campo "users"
    const { users, ...resto } = reg;

    // Generar clave única usando nombre_g, proveedor_id y nacionalidad
    const clave = `${resto.nombre_g}_${resto.proveedor_id}_${resto.nacionalidad}`;

    if (!vistos.has(clave)) {
        vistos.add(clave);
        filtrados.push(resto);
    } else {
        duplicadosArr.push(resto); // Guardar duplicado
    }
}

// 3. Guardar el JSON limpio
fs.writeFileSync('Produtos22082025_limpio.json', JSON.stringify(filtrados, null, 2));

// 4. Guardar los duplicados encontrados
fs.writeFileSync('Produtos22082025_duplicados.json', JSON.stringify(duplicadosArr, null, 2));

console.log(`Se eliminaron ${duplicadosArr.length} duplicados.`);
console.log(`Archivo limpio guardado como Produtos22082025_limpio.json`);
console.log(`Duplicados guardados en Produtos22082025_duplicados.json`);
