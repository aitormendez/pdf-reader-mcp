# PDF Reader MCP — Integración con Gemini CLI

Este servidor MCP proporciona una herramienta (`read_pdf`) que permite leer archivos PDF desde el sistema de archivos local, devolviendo texto por páginas, metadatos y número de páginas. Está diseñado para usarse con agentes compatibles con el protocolo MCP, como Gemini CLI.

## ✨ Funcionalidad principal

La herramienta `read_pdf` admite las siguientes operaciones:

- Extraer el texto completo de un PDF.
- Leer el contenido de páginas específicas.
- Obtener los metadatos del documento (autor, título, fecha de creación, etc.).
- Contar el número total de páginas.
- Procesar múltiples PDFs en una sola solicitud.

El resultado es siempre un JSON estructurado con los datos solicitados.

## ⚙️ Uso

### Requisitos

- Node.js ≥ 20 (idealmente v22 para evitar advertencias).
- pnpm (para construir el proyecto).
- Gemini CLI correctamente configurado.

### Instalación

Clonar el repositorio:

```bash
git clone git@github.com:aitormendez/pdf-reader-mcp.git
cd pdf-reader-mcp
pnpm install
pnpm run build
```

### Ejecución

```bash
node dist/index.js
```

El servidor MCP quedará activo por `stdio` y será reconocido por Gemini CLI si está registrado en `.gemini/settings.json`.

### Ejemplo de uso

```json
{
  "tool_name": "read_pdf",
  "arguments": {
    "sources": [
      {
        "path": "./documents/my_report.pdf",
        "pages": [2]
      }
    ],
    "include_metadata": true,
    "include_page_count": true,
    "include_full_text": false
  }
}
```

## 🔐 Seguridad

Originalmente, este proyecto restringía el acceso a rutas fuera del directorio del proyecto. Esto se gestionaba en `src/utils/pathUtils.ts`.

### 🛠️ Modificación realizada

Para permitir el acceso a cualquier parte del sistema de archivos (en contextos de uso local, sin requerimientos de seguridad adicionales), se ha modificado la función `resolveSafePath` en `pathUtils.ts` para devolver directamente la ruta sin validación, permitiendo así acceder a cualquier archivo:

```ts
export function resolveSafePath(inputPath: string): string {
  return inputPath;
}
```

⚠️ Esta modificación elimina la protección frente a accesos arbitrarios al sistema de archivos, por lo que **no debe usarse en entornos multiusuario o expuestos a clientes externos.**

## 📦 Estructura de herramientas registradas

```text
🟢 pdf-reader-mcp - Ready (1 tools)
  - read_pdf
```

Este servidor puede combinarse con otros MCP como el de Nextcloud, permitiendo acceder a archivos PDF remotos sincronizados en el sistema de archivos local.

---

Este archivo documenta la versión personalizada del proyecto para uso local y privado.
