# json-clean-deduplicate

Herramienta para limpiar y eliminar duplicados en archivos JSON, enfocada en la combinación de los campos `nombre_g` y `proveedor_id`.

## Descripción

Este proyecto permite procesar archivos JSON para:

- Eliminar el campo innecesario `users`.
- Filtrar registros duplicados según la combinación de `nombre_g` y `proveedor_id`.
- Exportar un nuevo archivo JSON limpio y sin duplicados.

---

## Workflow

1. **Leer el JSON**
   - Cargar todos los registros del JSON en una estructura tipo array/lista.

2. **Eliminar el campo `users`**
   - Recorrer cada objeto del array y eliminar el campo `users` si existe.

3. **Filtrar duplicados**
   - Los duplicados se determinan por la combinación de los campos:
     - `nombre_g`
     - `proveedor_id`
   - Mantener solo un registro para cada combinación única de estos campos.

4. **Generar el nuevo JSON**
   - Crear un nuevo array con los registros ya filtrados y sin el campo `users`.

5. **(Opcional) Validar y guardar**
   - Validar que el nuevo JSON no tenga duplicados según los campos indicados.
   - Guardar o exportar el nuevo JSON.

---

## Diagrama Resumido

- **Cargar JSON**
- ➡️ **Eliminar campo `users`**
- ➡️ **Filtrar duplicados por (`nombre_g`, `proveedor_id`)**
- ➡️ **Guardar/Exportar resultado**

---

## Instalación

```bash
git clone https://github.com/tu-usuario/json-clean-deduplicate.git
cd json-clean-deduplicate
```

## Uso

> Pronto encontrarás ejemplos de uso y scripts en la carpeta `/src`.

---

## Licencia

Este proyecto está bajo la licencia MIT.
