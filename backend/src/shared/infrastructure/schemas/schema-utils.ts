import { z } from "zod"
import { generateSchema, extendZodWithOpenApi } from "@anatine/zod-openapi"

// Extender Zod con capacidades OpenAPI
extendZodWithOpenApi(z)

// Función para convertir esquemas Zod a esquemas OpenAPI/Swagger
export function createOpenApiSchemaObject(schema: z.ZodType<any>) {
  return generateSchema(schema)
}

// Función para convertir esquemas Zod a definiciones de rutas Fastify
export function createRouteSchema(options: {
  tags: string[]
  summary: string
  description?: string
  requestSchema?: z.ZodType<any>
  responseSchema: z.ZodType<any>
  params?: z.ZodType<any>
  querystring?: z.ZodType<any>
  successCode?: number
  errorResponses?: Record<number, { description: string }>
}) {
  const {
    tags,
    summary,
    description,
    requestSchema,
    responseSchema,
    params,
    querystring,
    successCode = 200,
    errorResponses = {}
  } = options

  // Esquema base de la ruta
  const schema: any = {
    tags,
    summary,
    // Fastify requiere que las descripciones se manejen en otra parte
    response: {}
  }

  // Configurar respuestas con esquemas
  schema.response[successCode] = {
    description: "Successful response",
    // Convertir el esquema Zod a un esquema JSON de Fastify
    schema: createOpenApiSchemaObject(responseSchema)
  }

  // Añadir respuestas de error
  Object.entries(errorResponses).forEach(([code, { description }]) => {
    schema.response[code] = { description }
  })

  // Añadir esquema de cuerpo si existe
  if (requestSchema) {
    schema.body = createOpenApiSchemaObject(requestSchema)
  }

  // Añadir esquema de parámetros si existe
  if (params) {
    schema.params = createOpenApiSchemaObject(params)
  }

  // Añadir esquema de query si existe
  if (querystring) {
    schema.querystring = createOpenApiSchemaObject(querystring)
  }

  return schema
}

// Generar definición OpenAPI completa para toda la API
export function generateOpenApiDocument(options: {
  title: string
  description: string
  version: string
  schemas: Record<string, z.ZodType<any>>
}) {
  const { title, description, version, schemas } = options

  return {
    openapi: "3.0.0",
    info: {
      title,
      description,
      version
    },
    components: {
      schemas: Object.entries(schemas).reduce(
        (acc, [name, schema]) => ({
          ...acc,
          [name]: createOpenApiSchemaObject(schema)
        }),
        {}
      )
    }
  }
}
