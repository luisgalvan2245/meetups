// Esquema compartido para la documentación de Swagger
export const MeetupSchema = {
  type: "object",
  properties: {
    id: { type: "string" },
    title: { type: "string" },
    description: { type: "string" },
    date: { type: "string", format: "date-time" },
    location: { type: "string" },
    imageUrl: { type: "string" },
    createdAt: { type: "string", format: "date-time" },
    updatedAt: { type: "string", format: "date-time" }
  }
}

export const MeetupArraySchema = {
  type: "array",
  items: MeetupSchema
}

export const MeetupBodySchema = {
  type: "object",
  required: ["title", "description", "date", "location", "imageUrl"],
  properties: {
    title: { type: "string" },
    description: { type: "string" },
    date: { type: "string", format: "date-time" },
    location: { type: "string" },
    imageUrl: { type: "string" }
  }
}

export const UpdateMeetupBodySchema = {
  type: "object",
  properties: {
    title: { type: "string" },
    description: { type: "string" },
    date: { type: "string", format: "date-time" },
    location: { type: "string" },
    imageUrl: { type: "string" }
  }
}

export const IdParamsSchema = {
  type: "object",
  properties: {
    id: { type: "string" }
  }
}
