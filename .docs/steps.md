# Pasos para inicializar el proyecto

## Inicializar Git

```bash
git init
```

## Crear directorios

```bash
mkdir backend frontend
```

## Inicializar el proyecto backend

```bash
cd backend
npm init -y
```

## Inicializar el proyecto frontend con Vite

```bash
cd ..
npm create vite@latest frontend -- --template react-ts
```

## Instalar TypeScript y dependencias en el backend

```bash
cd backend
# Instalar TypeScript y tipos de Node
npm install -D typescript @types/node

# Inicializar configuración de TypeScript
npx tsc --init

# Instalar tsx para desarrollo (alternativa a ts-node + nodemon)
npm install -D tsx
```

## Hacer commit

```bash
git add .
git commit -m "chore(backend): add ts dependencies"
```

## Instalar Express y crear servidor básico

```bash
cd backend
# Instalar Express y sus tipos
npm install express
npm install -D @types/express
```

## Crear archivo principal para un servidor de prueba

`src/index.ts`:

## Configurar scripts de desarrollo

Editar el `package.json` para añadir los scripts:

```json
{
  "scripts": {
    "dev": "tsx watch src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js"
  }
}
```

## Probar el servidor

```bash
npm run dev
```

# En otra terminal, probar el endpoint

```bash
curl http://localhost:3000/api/events
```

## Instalar librerías tsoa y swagger

```bash
npm install tsoa && npm install -D @types/swagger-ui-express swagger-ui-express
```

## TSOA

Hay que crear el archivo tsoa.json, no se genera automáticamente.
Es un archivo de configuración que necesitamos crear manualmente.
Le dice a tsoa:
Dónde buscar los controladores (controllerPathGlobs)
Dónde generar la documentación Swagger (outputDirectory)
Dónde generar las rutas (routesDir)
Qué middleware usar (middleware)

Comando para ejecutar tsoa y generar los ficheros
cd backend && npx tsoa spec-and-routes

los datos mockeados se encuentran tanto en controladores como en servicios.
Crea un repository que contenga los datos mockeados.
Crea una interfaz para este repositorio que en domain que será la que utilizarán los servicios.
