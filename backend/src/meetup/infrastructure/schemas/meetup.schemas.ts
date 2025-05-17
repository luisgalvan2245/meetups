import { z } from "zod"
import { createRouteSchema } from "@/shared/infrastructure/schemas/schema-utils"

// Esquemas base - Single Source of Truth
export const meetupIdSchema = z.string().uuid()

export const meetupSchema = z.object({
  id: meetupIdSchema,
  title: z.string().min(3).max(100),
  description: z.string().min(10).max(2000),
  date: z.string().datetime(),
  location: z.string().min(3).max(200),
  imageUrl: z.string().url(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime()
})

export const createMeetupSchema = z.object({
  title: z.string().min(3).max(100),
  description: z.string().min(10).max(2000),
  date: z.string().datetime(),
  location: z.string().min(3).max(200),
  imageUrl: z.string().url()
})

export const updateMeetupSchema = z.object({
  title: z.string().min(3).max(100).optional(),
  description: z.string().min(10).max(2000).optional(),
  date: z.string().datetime().optional(),
  location: z.string().min(3).max(200).optional(),
  imageUrl: z.string().url().optional()
})

export const meetupArraySchema = z.array(meetupSchema)

export const idParamsSchema = z.object({
  id: meetupIdSchema
})

// Definición de tipos inferidos desde los esquemas
export type Meetup = z.infer<typeof meetupSchema>
export type CreateMeetupDto = z.infer<typeof createMeetupSchema>
export type UpdateMeetupDto = z.infer<typeof updateMeetupSchema>
export type IdParams = z.infer<typeof idParamsSchema>

// Definiciones de rutas con esquemas reutilizables
export const MEETUP_ROUTES = {
  getAllMeetups: createRouteSchema({
    tags: ["meetups"],
    summary: "Get all meetups",
    description: "Returns all meetups in the system",
    responseSchema: meetupArraySchema
  }),

  getMeetupById: createRouteSchema({
    tags: ["meetups"],
    summary: "Get meetup by ID",
    description: "Returns a single meetup by ID",
    params: idParamsSchema,
    responseSchema: meetupSchema,
    errorResponses: {
      404: { description: "Meetup not found" }
    }
  }),

  createMeetup: createRouteSchema({
    tags: ["meetups"],
    summary: "Create a new meetup",
    description: "Creates a new meetup and returns the created entity",
    requestSchema: createMeetupSchema,
    responseSchema: meetupSchema,
    successCode: 201
  }),

  updateMeetup: createRouteSchema({
    tags: ["meetups"],
    summary: "Update an existing meetup",
    description: "Updates a meetup by ID and returns the updated entity",
    params: idParamsSchema,
    requestSchema: updateMeetupSchema,
    responseSchema: meetupSchema,
    errorResponses: {
      404: { description: "Meetup not found" }
    }
  }),

  deleteMeetup: createRouteSchema({
    tags: ["meetups"],
    summary: "Delete a meetup",
    description: "Deletes a meetup by ID",
    params: idParamsSchema,
    responseSchema: z.null(),
    successCode: 204,
    errorResponses: {
      404: { description: "Meetup not found" }
    }
  })
}

// Exportar todos los esquemas para reutilización en validación y documentación
export const MEETUP_SCHEMAS = {
  Meetup: meetupSchema,
  MeetupArray: meetupArraySchema,
  CreateMeetup: createMeetupSchema,
  UpdateMeetup: updateMeetupSchema,
  IdParams: idParamsSchema
}
