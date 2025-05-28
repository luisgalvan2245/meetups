import status from 'http-status'
import request from 'supertest'
import { v4 as uuidV4 } from 'uuid'
import { describe, expect, it } from 'vitest'

import { Server } from '../src/apps/platform/backend/server'

describe('MeetupController', () => {
  const { app } = new Server()

  describe('GET /meetups', () => {
    it('should return all meetups', async () => {
      // Create two meetups
      const meetupData1 = {
        title: 'Test Meetup 1',
        description: 'Test Description 1',
        date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        location: 'Test Location 1',
        imageUrl: 'https://example.com/test1.jpg',
        organizerId: uuidV4()
      }
      const meetupData2 = {
        title: 'Test Meetup 2',
        description: 'Test Description 2',
        date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        location: 'Test Location 2',
        imageUrl: 'https://example.com/test2.jpg',
        organizerId: uuidV4()
      }
      await request(app).put(`/meetups/${uuidV4()}`).send(meetupData1)
      await request(app).put(`/meetups/${uuidV4()}`).send(meetupData2)

      // Get the meetups
      const response = await request(app).get('/meetups')
      expect(response.status).toBe(status.OK)
      expect(Array.isArray(response.body)).toBe(true)
      expect(response.body.length).toBe(2)
      expect(response.body[0]).toHaveProperty('id')
      expect(response.body[0]).toHaveProperty('title')
      expect(response.body[0]).toHaveProperty('description')
      expect(response.body[0]).toHaveProperty('date')
      expect(response.body[0]).toHaveProperty('location')
      expect(response.body[0]).toHaveProperty('imageUrl')
    })
  })

  describe('GET /meetups/:id', () => {
    it('should return a meetup by id', async () => {
      // Create a meetup
      const meetupData = {
        title: 'Test Meetup',
        description: 'Test Description',
        date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        location: 'Test Location',
        imageUrl: 'https://example.com/test.jpg',
        organizerId: uuidV4()
      }
      await request(app).put(`/meetups/${uuidV4()}`).send(meetupData)

      // Get the meetup
      const meetupsResponse = await request(app).get('/meetups')
      const meetupId = meetupsResponse.body[0].id
      const response = await request(app).get(`/meetups/${meetupId}`)
      expect(response.status).toBe(status.OK)
      expect(response.body).toHaveProperty('id', meetupId)
    })
    it('should return 404 for non-existent meetup', async () => {
      const response = await request(app).get(`/meetups/${uuidV4()}`)
      expect(response.status).toBe(status.NOT_FOUND)
    })
    it('should return 400 for invalid UUID format', async () => {
      const response = await request(app).get('/meetups/not-a-uuid')
      expect(response.status).toBe(status.BAD_REQUEST)
    })
  })

  describe('PUT /meetups/:id (create)', () => {
    it('should create a new meetup with the provided id', async () => {
      const meetupId = uuidV4()
      const meetupData = {
        title: 'Test Meetup',
        description: 'Test Description',
        date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        location: 'Test Location',
        imageUrl: 'https://example.com/test.jpg',
        organizerId: uuidV4()
      }
      const response = await request(app)
        .put(`/meetups/${meetupId}`)
        .send(meetupData)
      expect(response.status).toBe(status.CREATED)

      // Verify the meetup was created
      const getResponse = await request(app).get(`/meetups/${meetupId}`)
      expect(getResponse.status).toBe(status.OK)
      expect(getResponse.body).toHaveProperty('id', meetupId)
    })

    it('should return 400 if title is missing', async () => {
      const meetupId = uuidV4()
      const data = {
        description: 'desc',
        date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        location: 'loc',
        imageUrl: 'https://example.com/test.jpg',
        organizerId: uuidV4()
      }
      const response = await request(app).put(`/meetups/${meetupId}`).send(data)
      expect(response.status).toBe(status.BAD_REQUEST)
    })
    it('should return 400 if description is missing', async () => {
      const meetupId = uuidV4()
      const data = {
        title: 'title',
        date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        location: 'loc',
        imageUrl: 'https://example.com/test.jpg',
        organizerId: uuidV4()
      }
      const response = await request(app).put(`/meetups/${meetupId}`).send(data)
      expect(response.status).toBe(status.BAD_REQUEST)
    })
    it('should return 400 if date is missing', async () => {
      const meetupId = uuidV4()
      const data = {
        title: 'title',
        description: 'desc',
        location: 'loc',
        imageUrl: 'https://example.com/test.jpg',
        organizerId: uuidV4()
      }
      const response = await request(app).put(`/meetups/${meetupId}`).send(data)
      expect(response.status).toBe(status.BAD_REQUEST)
    })
    it('should return 400 if location is missing', async () => {
      const meetupId = uuidV4()
      const data = {
        title: 'title',
        description: 'desc',
        date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        imageUrl: 'https://example.com/test.jpg',
        organizerId: uuidV4()
      }
      const response = await request(app).put(`/meetups/${meetupId}`).send(data)
      expect(response.status).toBe(status.BAD_REQUEST)
    })
    it('should return 400 if imageUrl is missing', async () => {
      const meetupId = uuidV4()
      const data = {
        title: 'title',
        description: 'desc',
        date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        location: 'loc',
        organizerId: uuidV4()
      }
      const response = await request(app).put(`/meetups/${meetupId}`).send(data)
      expect(response.status).toBe(status.BAD_REQUEST)
    })
    it('should return 400 if title is not a string', async () => {
      const meetupId = uuidV4()
      const data = {
        title: 123,
        description: 'desc',
        date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        location: 'loc',
        imageUrl: 'https://example.com/test.jpg',
        organizerId: uuidV4()
      }
      const response = await request(app).put(`/meetups/${meetupId}`).send(data)
      expect(response.status).toBe(status.BAD_REQUEST)
    })
    it('should return 400 if description is not a string', async () => {
      const meetupId = uuidV4()
      const data = {
        title: 'title',
        description: 123,
        date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        location: 'loc',
        imageUrl: 'https://example.com/test.jpg',
        organizerId: uuidV4()
      }
      const response = await request(app).put(`/meetups/${meetupId}`).send(data)
      expect(response.status).toBe(status.BAD_REQUEST)
    })
    it('should return 400 if date is not a valid date', async () => {
      const meetupId = uuidV4()
      const data = {
        title: 'title',
        description: 'desc',
        date: 'not-a-date',
        location: 'loc',
        imageUrl: 'https://example.com/test.jpg',
        organizerId: uuidV4()
      }
      const response = await request(app).put(`/meetups/${meetupId}`).send(data)
      expect(response.status).toBe(status.BAD_REQUEST)
    })
    it('should return 400 if location is not a string', async () => {
      const meetupId = uuidV4()
      const data = {
        title: 'title',
        description: 'desc',
        date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        location: 123,
        imageUrl: 'https://example.com/test.jpg',
        organizerId: uuidV4()
      }
      const response = await request(app).put(`/meetups/${meetupId}`).send(data)
      expect(response.status).toBe(status.BAD_REQUEST)
    })
    it('should return 400 if imageUrl is not a string', async () => {
      const meetupId = uuidV4()
      const data = {
        title: 'title',
        description: 'desc',
        date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        location: 'loc',
        imageUrl: 123,
        organizerId: uuidV4()
      }
      const response = await request(app).put(`/meetups/${meetupId}`).send(data)
      expect(response.status).toBe(status.BAD_REQUEST)
    })
    it('should return 400 for invalid UUID format', async () => {
      const response = await request(app)
        .put('/meetups/not-a-uuid')
        .send({
          title: 'title',
          description: 'desc',
          date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
          location: 'loc',
          imageUrl: 'https://example.com/test.jpg',
          organizerId: uuidV4()
        })
      expect(response.status).toBe(status.BAD_REQUEST)
    })
  })

  describe('PATCH /meetups/:id (update)', () => {
    it('should update a meetup', async () => {
      // Create a meetup first
      const meetupId = uuidV4()
      const meetupData = {
        title: 'Original Title',
        description: 'Original Description',
        date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        location: 'Original Location',
        imageUrl: 'https://example.com/original.jpg',
        organizerId: uuidV4()
      }
      await request(app).put(`/meetups/${meetupId}`).send(meetupData)

      // Now update it
      const updateData = {
        title: 'Updated Title',
        description: 'Updated Description'
      }
      const response = await request(app)
        .patch(`/meetups/${meetupId}`)
        .send(updateData)
      expect(response.status).toBe(status.NO_CONTENT)

      // Verify the update
      const getResponse = await request(app).get(`/meetups/${meetupId}`)
      expect(getResponse.status).toBe(status.OK)
      expect(getResponse.body).toHaveProperty('title', 'Updated Title')
      expect(getResponse.body).toHaveProperty(
        'description',
        'Updated Description'
      )
      expect(getResponse.body).toHaveProperty('location', 'Original Location')
    })

    it('should return 404 for non-existent meetup', async () => {
      const nonExistentId = uuidV4()
      const updateData = { title: 'Updated Title' }
      const response = await request(app)
        .patch(`/meetups/${nonExistentId}`)
        .send(updateData)
      expect(response.status).toBe(status.NOT_FOUND)
    })

    it('should return 400 for invalid UUID format', async () => {
      const response = await request(app).patch('/meetups/not-a-uuid').send({
        title: 'Updated Title'
      })
      expect(response.status).toBe(status.BAD_REQUEST)
    })
  })

  describe('DELETE /meetups/:id', () => {
    it('should delete a meetup', async () => {
      // Create a meetup to delete
      const meetupId = uuidV4()
      const meetupData = {
        title: 'To Be Deleted',
        description: 'This meetup will be deleted',
        date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        location: 'Delete Location',
        imageUrl: 'https://example.com/delete.jpg',
        organizerId: uuidV4()
      }
      await request(app).put(`/meetups/${meetupId}`).send(meetupData)

      // Delete it
      const response = await request(app).delete(`/meetups/${meetupId}`)
      expect(response.status).toBe(status.NO_CONTENT)

      // Verify it's gone
      const getResponse = await request(app).get(`/meetups/${meetupId}`)
      expect(getResponse.status).toBe(status.NOT_FOUND)
    })

    it('should return 404 for non-existent meetup', async () => {
      const nonExistentId = uuidV4()
      const response = await request(app).delete(`/meetups/${nonExistentId}`)
      expect(response.status).toBe(status.NOT_FOUND)
    })

    it('should return 400 for invalid UUID format', async () => {
      const response = await request(app).delete('/meetups/not-a-uuid')
      expect(response.status).toBe(status.BAD_REQUEST)
    })
    it('should return 422 for invalid imageUrl format', async () => {
      const nonExistentId = uuidV4()
      const response = await request(app)
        .put(`/meetups/${nonExistentId}`)
        .send({
          title: 'title',
          description: 'desc',
          date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
          location: 'loc',
          imageUrl: 'invalid-url',
          organizerId: uuidV4()
        })
      expect(response.status).toBe(status.UNPROCESSABLE_ENTITY)
    })
  })
})
