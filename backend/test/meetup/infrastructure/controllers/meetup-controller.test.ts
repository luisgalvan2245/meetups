import { describe, it, expect } from "vitest"
import request from "supertest"
import { createApp } from "@/index"
import * as uuid from "uuid"

describe("MeetupController", () => {
  const app = createApp()

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
    })
  })

  describe("GET /meetups/:id", () => {
    it("should return a meetup by id", async () => {
      const meetupsResponse = await request(app).get("/meetups")
      const meetupId = meetupsResponse.body[0].id
      const response = await request(app).get(`/meetups/${meetupId}`)
      expect(response.status).toBe(200)
      expect(response.body).toHaveProperty("id", meetupId)
    })
    it("should return 404 for non-existent meetup", async () => {
      const response = await request(app).get(`/meetups/${uuid.v4()}`)
      expect(response.status).toBe(404)
    })
    it("should return 422 for invalid UUID format", async () => {
      const response = await request(app).get("/meetups/not-a-uuid")
      expect(response.status).toBe(422)
    })
  })

  describe("PUT /meetups/:id (create)", () => {
    it("should create a new meetup with the provided id", async () => {
      const meetupId = uuid.v4()
      const meetupData = {
        title: "Test Meetup",
        description: "Test Description",
        date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        location: "Test Location",
        imageUrl: "https://example.com/test.jpg"
      }
      const response = await request(app)
        .put(`/meetups/${meetupId}`)
        .send(meetupData)
      expect(response.status).toBe(201)

      // Verify the meetup was created
      const getResponse = await request(app).get(`/meetups/${meetupId}`)
      expect(getResponse.status).toBe(200)
      expect(getResponse.body).toHaveProperty("id", meetupId)
    })

    it("should return 400 if title is missing", async () => {
      const meetupId = uuid.v4()
      const data = {
        description: "desc",
        date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        location: "loc",
        imageUrl: "https://example.com/test.jpg"
      }
      const response = await request(app).put(`/meetups/${meetupId}`).send(data)
      expect(response.status).toBe(400)
    })
    it("should return 400 if description is missing", async () => {
      const meetupId = uuid.v4()
      const data = {
        title: "title",
        date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        location: "loc",
        imageUrl: "https://example.com/test.jpg"
      }
      const response = await request(app).put(`/meetups/${meetupId}`).send(data)
      expect(response.status).toBe(400)
    })
    it("should return 400 if date is missing", async () => {
      const meetupId = uuid.v4()
      const data = {
        title: "title",
        description: "desc",
        location: "loc",
        imageUrl: "https://example.com/test.jpg"
      }
      const response = await request(app).put(`/meetups/${meetupId}`).send(data)
      expect(response.status).toBe(400)
    })
    it("should return 400 if location is missing", async () => {
      const meetupId = uuid.v4()
      const data = {
        title: "title",
        description: "desc",
        date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        imageUrl: "https://example.com/test.jpg"
      }
      const response = await request(app).put(`/meetups/${meetupId}`).send(data)
      expect(response.status).toBe(400)
    })
    it("should return 400 if imageUrl is missing", async () => {
      const meetupId = uuid.v4()
      const data = {
        title: "title",
        description: "desc",
        date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        location: "loc"
      }
      const response = await request(app).put(`/meetups/${meetupId}`).send(data)
      expect(response.status).toBe(400)
    })
    it("should return 400 if title is not a string", async () => {
      const meetupId = uuid.v4()
      const data = {
        title: 123,
        description: "desc",
        date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        location: "loc",
        imageUrl: "https://example.com/test.jpg"
      }
      const response = await request(app).put(`/meetups/${meetupId}`).send(data)
      expect(response.status).toBe(400)
    })
    it("should return 400 if description is not a string", async () => {
      const meetupId = uuid.v4()
      const data = {
        title: "title",
        description: 123,
        date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        location: "loc",
        imageUrl: "https://example.com/test.jpg"
      }
      const response = await request(app).put(`/meetups/${meetupId}`).send(data)
      expect(response.status).toBe(400)
    })
    it("should return 400 if date is not a valid date", async () => {
      const meetupId = uuid.v4()
      const data = {
        title: "title",
        description: "desc",
        date: "not-a-date",
        location: "loc",
        imageUrl: "https://example.com/test.jpg"
      }
      const response = await request(app).put(`/meetups/${meetupId}`).send(data)
      expect(response.status).toBe(400)
    })
    it("should return 400 if location is not a string", async () => {
      const meetupId = uuid.v4()
      const data = {
        title: "title",
        description: "desc",
        date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        location: 123,
        imageUrl: "https://example.com/test.jpg"
      }
      const response = await request(app).put(`/meetups/${meetupId}`).send(data)
      expect(response.status).toBe(400)
    })
    it("should return 400 if imageUrl is not a string", async () => {
      const meetupId = uuid.v4()
      const data = {
        title: "title",
        description: "desc",
        date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        location: "loc",
        imageUrl: 123
      }
      const response = await request(app).put(`/meetups/${meetupId}`).send(data)
      expect(response.status).toBe(400)
    })
    it("should return 422 for invalid UUID format", async () => {
      const response = await request(app)
        .put("/meetups/not-a-uuid")
        .send({
          title: "title",
          description: "desc",
          date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
          location: "loc",
          imageUrl: "https://example.com/test.jpg"
        })
      expect(response.status).toBe(422)
    })
  })

  describe("PATCH /meetups/:id (update)", () => {
    it("should update a meetup", async () => {
      // Create a meetup first
      const meetupId = uuid.v4()
      const meetupData = {
        title: "Original Title",
        description: "Original Description",
        date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        location: "Original Location",
        imageUrl: "https://example.com/original.jpg"
      }
      await request(app).put(`/meetups/${meetupId}`).send(meetupData)

      // Now update it
      const updateData = {
        title: "Updated Title",
        description: "Updated Description"
      }
      const response = await request(app)
        .patch(`/meetups/${meetupId}`)
        .send(updateData)
      expect(response.status).toBe(200)

      // Verify the update
      const getResponse = await request(app).get(`/meetups/${meetupId}`)
      expect(getResponse.status).toBe(200)
      expect(getResponse.body).toHaveProperty("title", "Updated Title")
      expect(getResponse.body).toHaveProperty(
        "description",
        "Updated Description"
      )
      expect(getResponse.body).toHaveProperty("location", "Original Location")
    })

    it("should return 404 for non-existent meetup", async () => {
      const nonExistentId = uuid.v4()
      const updateData = { title: "Updated Title" }
      const response = await request(app)
        .patch(`/meetups/${nonExistentId}`)
        .send(updateData)
      expect(response.status).toBe(404)
    })

    it("should return 422 for invalid UUID format", async () => {
      const response = await request(app).patch("/meetups/not-a-uuid").send({
        title: "Updated Title"
      })
      expect(response.status).toBe(422)
    })
  })

  describe("DELETE /meetups/:id", () => {
    it("should delete a meetup", async () => {
      // Create a meetup to delete
      const meetupId = uuid.v4()
      const meetupData = {
        title: "To Be Deleted",
        description: "This meetup will be deleted",
        date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        location: "Delete Location",
        imageUrl: "https://example.com/delete.jpg"
      }
      await request(app).put(`/meetups/${meetupId}`).send(meetupData)

      // Delete it
      const response = await request(app).delete(`/meetups/${meetupId}`)
      expect(response.status).toBe(204)

      // Verify it's gone
      const getResponse = await request(app).get(`/meetups/${meetupId}`)
      expect(getResponse.status).toBe(404)
    })

    it("should return 404 for non-existent meetup", async () => {
      const nonExistentId = uuid.v4()
      const response = await request(app).delete(`/meetups/${nonExistentId}`)
      expect(response.status).toBe(404)
    })

    it("should return 422 for invalid UUID format", async () => {
      const response = await request(app).delete("/meetups/not-a-uuid")
      expect(response.status).toBe(422)
    })
  })
})
