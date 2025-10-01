const fs = require('fs');

// Leer el archivo JSON
let ventasPotosi = JSON.parse(fs.readFileSync('ventasPotosi.json', 'utf8'));

// Extraer los datos relevantes
let ventas = ventasPotosi.data.map(v => ({
    observacion_venta: v.observacion_venta,
    tipo: v.tipo_venta,
    total_cobro: v.total,
    total_a_cobrar: v.total_descuento,
    cliente: v.cliente,
    fecha_registro: v.created_at,
    fecha_cobro: v.fecha_cobro,
    nota_venta: v.nota_venta,
    localidad: v.localidad,
    descuento: v.descuento
}));
//A. Distribución de tipos de venta
let tipos = {};
ventas.forEach(v => {
    tipos[v.tipo] = (tipos[v.tipo] || 0) + 1;
});
console.log("Distribución de tipos de venta:", tipos);
//B. Descuentos aplicados por cliente
let descuentosUnicos = new Set();

// Filtrar ventas por tipo_venta "normal" y extraer el porcentaje único
ventas.forEach(v => {
    if (v.tipo === "normal" && v.descuento) {
        let match = v.descuento.match(/(\d+)%/); // Busca el porcentaje
        if (match) {
            descuentosUnicos.add(match[1] + '%');
        }
    }
});

// Convertir el Set a array si lo necesitas
let listaDescuentosUnicos = Array.from(descuentosUnicos);

console.log("Porcentajes de descuento únicos (tipo normal):", listaDescuentosUnicos);


// C. Descuentos por cliente y tipo de venta
let descuentosPorClienteTipo = {};

ventas.forEach(v => {
    if (v.descuento) {
        let match = v.descuento.match(/(\d+)%/); // Busca el porcentaje
        if (match) {
            let cliente = v.cliente;
            let tipo = v.tipo;
            let porcentaje = match[1] + '%';
            // Inicializa estructura si no existe
            if (!descuentosPorClienteTipo[cliente]) descuentosPorClienteTipo[cliente] = {};
            if (!descuentosPorClienteTipo[cliente][tipo]) descuentosPorClienteTipo[cliente][tipo] = new Set();
            // Agrega el porcentaje único
            descuentosPorClienteTipo[cliente][tipo].add(porcentaje);
        }
    }
});

// Para mostrar como array (opcional)
for (let cliente in descuentosPorClienteTipo) {
    for (let tipo in descuentosPorClienteTipo[cliente]) {
        descuentosPorClienteTipo[cliente][tipo] = Array.from(descuentosPorClienteTipo[cliente][tipo]);
    }
}

console.log("Descuentos únicos por cliente y tipo de venta:", descuentosPorClienteTipo);


//D. qué porcentajes distintos de descuento se usaron en cada tipo de venta (por ejemplo, "normal", "licitacion", etc.), sin importar el cliente
let descuentosPorTipo = {};

ventas.forEach(v => {
    if (v.descuento && v.tipo) {
        let match = v.descuento.match(/(\d+)%/); // Busca el porcentaje
        if (match) {
            let tipo = v.tipo;
            let porcentaje = match[1] + '%';
            if (!descuentosPorTipo[tipo]) descuentosPorTipo[tipo] = new Set();
            descuentosPorTipo[tipo].add(porcentaje);
        }
    }
});

// Convertir los sets a arrays para mostrar
for (let tipo in descuentosPorTipo) {
    descuentosPorTipo[tipo] = Array.from(descuentosPorTipo[tipo]);
}

console.log("Descuentos únicos por tipo de venta:", descuentosPorTipo);




//D. Filtrado de observaciones distintas
// Buscar observaciones únicas en las ventas
let observacionesUnicas = new Set();

ventas.forEach(v => {
    for (let key in v) {
        if (
            key.toLowerCase().includes("observ") &&
            v[key] !== null &&
            v[key] !== undefined &&
            v[key].toString().trim() !== ""
        ) {
            observacionesUnicas.add(v[key].toString().trim());
        }
    }
});

// Convertir a array
let observacionesArray = Array.from(observacionesUnicas);

// Mostrar en una sola línea, formato array de strings
console.log(
    `Observaciones de venta distintas: 
    [` +
    observacionesArray.map(obs => `'${obs}'`).join(", ") +
    "]"
);



// E. Filtrado de ventas donde el cobro se ve todos los valores distintos
let valoresCobroUnicos = new Set();

ventas.forEach(v => {
    if (v.cobro !== undefined && v.cobro !== null) {
        valoresCobroUnicos.add(v.cobro);
    }
});

console.log("Valores distintos del campo 'cobro':", Array.from(valoresCobroUnicos));



//C. Montos de venta por localidad
let montosPorLocalidad = {};
ventas.forEach(v => {
    montosPorLocalidad[v.localidad] = (montosPorLocalidad[v.localidad] || 0) + v.total_cobro;
});
console.log("Montos por localidad:", montosPorLocalidad);

//D. Clientes que más compran
let comprasPorCliente = {};
ventas.forEach(v => {
    comprasPorCliente[v.cliente] = (comprasPorCliente[v.cliente] || 0) + v.total_cobro;
});
// Ordenar clientes por total comprado
let topClientes = Object.entries(comprasPorCliente)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10); // Top 10
console.log("Clientes que más compran:", topClientes);

//E. Ventas con monto cero
let ventasMontoCero = ventas.filter(v => v.total_cobro === 0 || v.total_a_cobrar === 0);
console.log("Ventas con monto cero:", ventasMontoCero.length);


//F. Relación entre fechas de registro y cobro
function diasEntreFechas(fecha1, fecha2) {
    let d1 = new Date(fecha1);
    let d2 = new Date(fecha2);
    return Math.round((d2 - d1) / (1000 * 60 * 60 * 24));
}
let diferencias = ventas.map(v => ({
    nota_venta: v.nota_venta,
    cliente: v.cliente,
    dias: diasEntreFechas(v.fecha_registro, v.fecha_cobro)
}));
console.log("Diferencia de días entre registro y cobro (primeros 10):", diferencias.slice(0, 10));
