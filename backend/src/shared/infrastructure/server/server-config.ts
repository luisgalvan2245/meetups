import { FastifyInstance, FastifyRequest } from "fastify"
import fastify from "fastify"

function setupJsonParser(server: FastifyInstance): void {
  server.addContentTypeParser(
    "application/json",
    { parseAs: "string" },
    (
      _req: FastifyRequest,
      body: string,
      done: (err: Error | null, parsed?: unknown) => void
    ) => {
      try {
        const json = JSON.parse(body)
        done(null, json)
      } catch (err) {
        done(err as Error, undefined)
      }
    }
  )
}

export function createServer(): FastifyInstance {
  const server = fastify({ logger: true })
  setupJsonParser(server)
  return server
}

export async function startServer(
  server: FastifyInstance,
  port = 3000
): Promise<void> {
  try {
    await server.listen({
      port: Number(process.env.PORT) || port,
      host: "0.0.0.0"
    })
    console.log(
      `Server running at http://localhost:${Number(process.env.PORT) || port}`
    )
    console.log(
      `Swagger UI at http://localhost:${Number(process.env.PORT) || port}/docs`
    )
  } catch (err) {
    server.log.error(err)
    process.exit(1)
  }
}
