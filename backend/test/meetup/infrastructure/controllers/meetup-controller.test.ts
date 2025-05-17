import { describe, it, expect } from "vitest"
import request from "supertest"
import { createApp } from "@/index"

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
      expect(response.body[0]).toHaveProperty("createdAt")
      expect(response.body[0]).toHaveProperty("updatedAt")
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
      const response = await request(app).get("/meetups/non-existent-id")
      expect(response.status).toBe(404)
    })
  })

  describe("POST /meetups", () => {
    it("should create a new meetup", async () => {
      const meetupData = {
        title: "Test Meetup",
        description: "Test Description",
        date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        location: "Test Location",
        imageUrl: "https://example.com/test.jpg"
      }
      const response = await request(app).post("/meetups").send(meetupData)
      expect(response.status).toBe(201)
      expect(response.body).toHaveProperty("id")
    })

    it("should return 400 if title is missing", async () => {
      const data = {
        description: "desc",
        date: new Date().toISOString(),
        location: "loc",
        imageUrl: "url"
      }
      const response = await request(app).post("/meetups").send(data)
      expect(response.status).toBe(400)
    })
    it("should return 400 if description is missing", async () => {
      const data = {
        title: "title",
        date: new Date().toISOString(),
        location: "loc",
        imageUrl: "url"
      }
      const response = await request(app).post("/meetups").send(data)
      expect(response.status).toBe(400)
    })
    it("should return 400 if date is missing", async () => {
      const data = {
        title: "title",
        description: "desc",
        location: "loc",
        imageUrl: "url"
      }
      const response = await request(app).post("/meetups").send(data)
      expect(response.status).toBe(400)
    })
    it("should return 400 if location is missing", async () => {
      const data = {
        title: "title",
        description: "desc",
        date: new Date().toISOString(),
        imageUrl: "url"
      }
      const response = await request(app).post("/meetups").send(data)
      expect(response.status).toBe(400)
    })
    it("should return 400 if imageUrl is missing", async () => {
      const data = {
        title: "title",
        description: "desc",
        date: new Date().toISOString(),
        location: "loc"
      }
      const response = await request(app).post("/meetups").send(data)
      expect(response.status).toBe(400)
    })
    it("should return 400 if title is not a string", async () => {
      const data = {
        title: 123,
        description: "desc",
        date: new Date().toISOString(),
        location: "loc",
        imageUrl: "url"
      }
      const response = await request(app).post("/meetups").send(data)
      expect(response.status).toBe(400)
    })
    it("should return 400 if description is not a string", async () => {
      const data = {
        title: "title",
        description: 123,
        date: new Date().toISOString(),
        location: "loc",
        imageUrl: "url"
      }
      const response = await request(app).post("/meetups").send(data)
      expect(response.status).toBe(400)
    })
    it("should return 400 if date is not a valid date", async () => {
      const data = {
        title: "title",
        description: "desc",
        date: "not-a-date",
        location: "loc",
        imageUrl: "url"
      }
      const response = await request(app).post("/meetups").send(data)
      expect(response.status).toBe(400)
    })
    it("should return 400 if location is not a string", async () => {
      const data = {
        title: "title",
        description: "desc",
        date: new Date().toISOString(),
        location: 123,
        imageUrl: "url"
      }
      const response = await request(app).post("/meetups").send(data)
      expect(response.status).toBe(400)
    })
    it("should return 400 if imageUrl is not a string", async () => {
      const data = {
        title: "title",
        description: "desc",
        date: new Date().toISOString(),
        location: "loc",
        imageUrl: 123
      }
      const response = await request(app).post("/meetups").send(data)
      expect(response.status).toBe(400)
    })
  })

  describe("PUT /meetups/:id", () => {
    it("should update a meetup", async () => {
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
    })
    it("should return 400 if title is not a string", async () => {
      const meetupsResponse = await request(app).get("/meetups")
      const meetupId = meetupsResponse.body[0].id
      const data = { title: 123 }
      const response = await request(app).put(`/meetups/${meetupId}`).send(data)
      expect(response.status).toBe(400)
    })
    it("should return 400 if description is not a string", async () => {
      const meetupsResponse = await request(app).get("/meetups")
      const meetupId = meetupsResponse.body[0].id
      const data = { description: 123 }
      const response = await request(app).put(`/meetups/${meetupId}`).send(data)
      expect(response.status).toBe(400)
    })
    it("should return 400 if date is not a valid date", async () => {
      const meetupsResponse = await request(app).get("/meetups")
      const meetupId = meetupsResponse.body[0].id
      const data = { date: "not-a-date" }
      const response = await request(app).put(`/meetups/${meetupId}`).send(data)
      expect(response.status).toBe(400)
    })
    it("should return 400 if location is not a string", async () => {
      const meetupsResponse = await request(app).get("/meetups")
      const meetupId = meetupsResponse.body[0].id
      const data = { location: 123 }
      const response = await request(app).put(`/meetups/${meetupId}`).send(data)
      expect(response.status).toBe(400)
    })
    it("should return 400 if imageUrl is not a string", async () => {
      const meetupsResponse = await request(app).get("/meetups")
      const meetupId = meetupsResponse.body[0].id
      const data = { imageUrl: 123 }
      const response = await request(app).put(`/meetups/${meetupId}`).send(data)
      expect(response.status).toBe(400)
    })
  })

  describe("DELETE /meetups/:id", () => {
    it("should delete a meetup", async () => {
      const meetupsResponse = await request(app).get("/meetups")
      const meetupId = meetupsResponse.body[0].id
      const response = await request(app).delete(`/meetups/${meetupId}`)
      expect(response.status).toBe(204)
      const getResponse = await request(app).get(`/meetups/${meetupId}`)
      expect(getResponse.status).toBe(404)
    })
    it("should return 404 for non-existent meetup", async () => {
      const response = await request(app).delete("/meetups/non-existent-id")
      expect(response.status).toBe(404)
    })
  })
})
