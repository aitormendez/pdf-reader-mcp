import path from 'path';
// Removed unused import: import { fileURLToPath } from 'url';
import { McpError, ErrorCode } from '@modelcontextprotocol/sdk/types.js';

// El directorio raíz del proyecto, usado para resolver rutas relativas.
// Ya no se impone como límite de seguridad porque el entorno es de uso personal.
export const PROJECT_ROOT = process.cwd();

console.info(`[Filesystem MCP - pathUtils] Project Root determined from CWD: ${PROJECT_ROOT}`); // Use info instead of log

/**
 * Resolves a user-provided path, allowing both absolute and relative paths.
 * Relative paths are resolved against the project root.
 * Throws McpError on invalid input.
 * @param userPath The path provided by the user.
 * @returns The resolved absolute path.
 */
export const resolvePath = (userPath: string): string => {
  if (typeof userPath !== 'string') {
    throw new McpError(ErrorCode.InvalidParams, 'Path must be a string.');
  }

  const normalizedPath = path.normalize(userPath);

  // Permitimos tanto rutas absolutas como relativas
  const resolved = path.isAbsolute(normalizedPath)
    ? normalizedPath
    : path.resolve(PROJECT_ROOT, normalizedPath);

  return resolved;
};
