import { describe, it, expect, beforeAll, afterAll } from "vitest"
import request from "supertest"
import { createTestApp } from "../../../helpers/app"

describe("MeetupController", () => {
  const app = createTestApp()

  describe("GET /meetups", () => {
    it("should return all meetups", async () => {
      const response = await request(app).get("/meetups")
      expect(response.status).toBe(200)
      expect(Array.isArray(response.body)).toBe(true)
      expect(response.body.length).toBeGreaterThan(0)
      expect(response.body[0]).toHaveProperty("id")
      expect(response.body[0]).toHaveProperty("title")
      expect(response.body[0]).toHaveProperty("description")
      expect(response.body[0]).toHaveProperty("date")
      expect(response.body[0]).toHaveProperty("location")
      expect(response.body[0]).toHaveProperty("imageUrl")
      expect(response.body[0]).toHaveProperty("createdAt")
      expect(response.body[0]).toHaveProperty("updatedAt")
    })
  })

  describe("GET /meetups/:id", () => {
    it("should return a meetup by id", async () => {
      // Primero obtenemos todos los meetups para tener un ID válido
      const meetupsResponse = await request(app).get("/meetups")
      const meetupId = meetupsResponse.body[0].id

      const response = await request(app).get(`/meetups/${meetupId}`)
      expect(response.status).toBe(200)
      expect(response.body).toHaveProperty("id", meetupId)
      expect(response.body).toHaveProperty("title")
      expect(response.body).toHaveProperty("description")
      expect(response.body).toHaveProperty("date")
      expect(response.body).toHaveProperty("location")
      expect(response.body).toHaveProperty("imageUrl")
      expect(response.body).toHaveProperty("createdAt")
      expect(response.body).toHaveProperty("updatedAt")
    })

    it("should return 404 for non-existent meetup", async () => {
      const response = await request(app).get("/meetups/non-existent-id")
      expect(response.status).toBe(404)
    })
  })

  describe("POST /meetups", () => {
    it("should create a new meetup", async () => {
      const meetupData = {
        title: "Test Meetup",
        description: "Test Description",
        date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 días en el futuro
        location: "Test Location",
        imageUrl: "https://example.com/test.jpg"
      }

      const response = await request(app).post("/meetups").send(meetupData)
      expect(response.status).toBe(201)
      expect(response.body).toHaveProperty("id")
      expect(response.body).toHaveProperty("title", meetupData.title)
      expect(response.body).toHaveProperty(
        "description",
        meetupData.description
      )
      expect(response.body).toHaveProperty("location", meetupData.location)
      expect(response.body).toHaveProperty("imageUrl", meetupData.imageUrl)
      expect(response.body).toHaveProperty("createdAt")
      expect(response.body).toHaveProperty("updatedAt")
    })

    it("should validate required fields", async () => {
      const response = await request(app).post("/meetups").send({})
      expect(response.status).toBe(400)
    })
  })

  describe("PUT /meetups/:id", () => {
    it("should update a meetup", async () => {
      // Primero obtenemos todos los meetups para tener un ID válido
      const meetupsResponse = await request(app).get("/meetups")
      const meetupId = meetupsResponse.body[0].id

      const updateData = {
        title: "Updated Title",
        description: "Updated Description"
      }

      const response = await request(app)
        .put(`/meetups/${meetupId}`)
        .send(updateData)
      expect(response.status).toBe(200)
      expect(response.body).toHaveProperty("id", meetupId)
      expect(response.body).toHaveProperty("title", updateData.title)
      expect(response.body).toHaveProperty(
        "description",
        updateData.description
      )
    })

    it("should return 404 for non-existent meetup", async () => {
      const response = await request(app)
        .put("/meetups/non-existent-id")
        .send({ title: "Updated Title" })
      expect(response.status).toBe(404)
    })
  })

  describe("DELETE /meetups/:id", () => {
    it("should delete a meetup", async () => {
      // Primero obtenemos todos los meetups para tener un ID válido
      const meetupsResponse = await request(app).get("/meetups")
      const meetupId = meetupsResponse.body[0].id

      const response = await request(app).delete(`/meetups/${meetupId}`)
      expect(response.status).toBe(204)

      // Verificamos que el meetup ya no existe
      const getResponse = await request(app).get(`/meetups/${meetupId}`)
      expect(getResponse.status).toBe(404)
    })

    it("should return 404 for non-existent meetup", async () => {
      const response = await request(app).delete("/meetups/non-existent-id")
      expect(response.status).toBe(404)
    })
  })
})
