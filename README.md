# Servidor MCP Lector de PDF (@sylphlab/pdf-reader-mcp)

Permite a tus agentes de IA (como Gemini CLI) leer y extraer información de archivos PDF de forma segura y eficiente: texto, metadatos, número de páginas, todo desde una única herramienta flexible.

## Instalación

### Usando pnpm (recomendado)

```bash
pnpm add @sylphlab/pdf-reader-mcp # o npm install / yarn add
```

Configura tu host MCP (por ejemplo `mcp_settings.json`) para usar `npx`:

```json
{
  "mcpServers": {
    "pdf-reader-mcp": {
      "command": "npx",
      "args": ["@sylphlab/pdf-reader-mcp"],
      "name": "PDF Reader (npx)"
    }
  }
}
```

_Asegúrate de que el host establezca correctamente el `cwd` al directorio del proyecto._

### Usando Docker

```bash
docker pull sylphlab/pdf-reader-mcp:latest
```

Configuración del host:

```json
{
  "mcpServers": {
    "pdf-reader-mcp": {
      "command": "docker",
      "args": [
        "run",
        "-i",
        "--rm",
        "-v",
        "/ruta/a/tu/proyecto:/app",
        "sylphlab/pdf-reader-mcp:latest"
      ],
      "name": "PDF Reader (Docker)"
    }
  }
}
```

### Compilación local (para desarrollo)

```bash
git clone https://github.com/aitormendez/pdf-reader-mcp.git
cd pdf-reader-mcp
pnpm install
pnpm run build
```

Configuración del host:

```json
{
  "mcpServers": {
    "pdf-reader-mcp": {
      "command": "node",
      "args": ["/ruta/a/pdf-reader-mcp/dist/index.js"],
      "name": "PDF Reader (Local Build)"
    }
  }
}
```

## Uso rápido

Llamada MCP de ejemplo:

```json
{
  "tool_name": "read_pdf",
  "arguments": {
    "sources": [
      {
        "path": "./documentos/informe.pdf",
        "pages": [2]
      }
    ],
    "include_metadata": true,
    "include_page_count": false,
    "include_full_text": false
  }
}
```

Respuesta esperada:

```json
{
  "results": [
    {
      "source": "./documentos/informe.pdf",
      "success": true,
      "data": {
        "page_texts": [
          { "page": 2, "text": "Texto de la página 2..." }
        ],
        "info": { ... },
        "metadata": { ... }
      }
    }
  ]
}
```

## Características

- Leer el texto completo de un PDF.
- Leer páginas específicas.
- Obtener metadatos (autor, título, fecha).
- Obtener el número total de páginas.
- Procesar múltiples PDFs en una sola petición.
- Salida estructurada en JSON.
- Integración sencilla con entornos MCP.

## Ventajas

- ✅ Seguro (por defecto): accede solo a rutas del proyecto.
- ✅ Flexible: soporta rutas locales y URLs públicas.
- ✅ Eficiente: usa `pdfjs-dist` y validación con Zod.
- ✅ Consolidado: una sola herramienta para varias tareas.
- ✅ Rápido: benchmarks internos muestran buen rendimiento.

## Planes futuros

- Extraer imágenes o anotaciones.
- Optimizar para PDFs muy grandes.
- Mejorar cobertura de tests.
- Mejorar documentación.

## Soporte

- ¿Bug o petición de mejora? [GitHub Issues](https://github.com/sylphlab/pdf-reader-mcp/issues)
- ¿Quieres contribuir? Lee [CONTRIBUTING.md](./CONTRIBUTING.md)

## Licencia

MIT

---

### Cambios locales

Se ha eliminado la restricción en `pathUtils.ts` que limitaba el acceso a archivos fuera del directorio del proyecto. Esto permite el uso libre en combinación con Nextcloud y otros servidores MCP locales.
