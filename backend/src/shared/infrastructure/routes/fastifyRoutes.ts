import { FastifyInstance } from "fastify"
import { MeetupController } from "../../../meetup/infrastructure/controllers/meetupController"

export async function registerRoutes(server: FastifyInstance) {
  const meetupController = new MeetupController()

  // Meetup routes
  server.get("/meetups", async (_request, _reply) => {
    const response = await meetupController.getAllMeetups()
    return response
  })

  server.get<{ Params: { id: string } }>(
    "/meetups/:id",
    async (request, reply) => {
      const response = await meetupController.getMeetupById(request.params.id)
      if (!response) {
        reply.code(404).send({ message: "Meetup not found" })
        return
      }
      return response
    }
  )

  server.post<{
    Body: {
      title: string
      description: string
      date: Date
      location: string
      imageUrl: string
    }
  }>("/meetups", async (request, reply) => {
    const response = await meetupController.createMeetup(request.body)
    reply.code(201)
    return response
  })

  server.put<{
    Params: { id: string }
    Body: {
      title?: string
      description?: string
      date?: Date
      location?: string
      imageUrl?: string
    }
  }>("/meetups/:id", async (request, reply) => {
    const response = await meetupController.updateMeetup(
      request.params.id,
      request.body
    )
    if (!response) {
      reply.code(404).send({ message: "Meetup not found" })
      return
    }
    return response
  })

  server.delete<{ Params: { id: string } }>(
    "/meetups/:id",
    async (request, reply) => {
      await meetupController.deleteMeetup(request.params.id)
      reply.code(204).send()
    }
  )
}
