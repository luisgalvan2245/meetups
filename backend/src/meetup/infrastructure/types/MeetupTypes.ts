// Data types
export interface MeetupModel {
  id: string
  title: string
  description: string
  date: string
  location: string
  imageUrl: string
  createdAt: string
  updatedAt: string
}

export interface CreateMeetupBody {
  title: string
  description: string
  date: string
  location: string
  imageUrl: string
}

export interface UpdateMeetupBody {
  title?: string
  description?: string
  date?: string
  location?: string
  imageUrl?: string
}

export interface IdParams {
  id: string
}

// Swagger schemas
export const MeetupSchema = {
  type: "object",
  required: [
    "id",
    "title",
    "description",
    "date",
    "location",
    "imageUrl",
    "createdAt",
    "updatedAt"
  ],
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

// Route schemas definitions
export const RouteSchemas = {
  getAllMeetups: {
    tags: ["meetups"],
    description: "Get all meetups",
    response: {
      200: MeetupArraySchema
    }
  },

  getMeetupById: {
    tags: ["meetups"],
    description: "Get a meetup by ID",
    params: IdParamsSchema,
    response: {
      200: MeetupSchema,
      404: {
        type: "null",
        description: "Meetup not found"
      }
    }
  },

  createMeetup: {
    tags: ["meetups"],
    description: "Create a new meetup",
    body: MeetupBodySchema,
    response: {
      201: MeetupSchema
    }
  },

  updateMeetup: {
    tags: ["meetups"],
    description: "Update a meetup",
    params: IdParamsSchema,
    body: UpdateMeetupBodySchema,
    response: {
      200: MeetupSchema,
      404: {
        type: "null",
        description: "Meetup not found"
      }
    }
  },

  deleteMeetup: {
    tags: ["meetups"],
    description: "Delete a meetup",
    params: IdParamsSchema,
    response: {
      204: {
        type: "null",
        description: "No content"
      },
      404: {
        type: "null",
        description: "Meetup not found"
      }
    }
  }
}
