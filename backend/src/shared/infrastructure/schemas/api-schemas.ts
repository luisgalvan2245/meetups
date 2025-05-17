import { MEETUP_SCHEMAS } from "@/meetup/infrastructure/schemas/meetup.schemas"
import { z } from "zod"

// Registro centralizado de todos los schemas de la API
// Facilita la generación de documentación unificada y mantenimiento
export const API_SCHEMAS: Record<string, z.ZodType<any>> = {
  // Schemas de Meetups
  ...Object.entries(MEETUP_SCHEMAS).reduce(
    (acc, [key, schema]) => ({
      ...acc,
      [`Meetup.${key}`]: schema
    }),
    {}
  )

  // En el futuro, añadir aquí más dominios:
  // ...Object.entries(USER_SCHEMAS)...
  // ...Object.entries(EVENT_SCHEMAS)...
  // etc.
}
