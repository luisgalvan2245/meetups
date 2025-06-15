import status from 'http-status'
import request from 'supertest'
import { v4 as uuidV4 } from 'uuid'
import { describe, expect, it } from 'vitest'

import { Server } from '../src/server'

describe('TicketController', () => {
  const { app } = new Server()

  describe('GET /tickets', () => {
    it('should return all tickets', async () => {
      // Create two tickets
      const ticketData1 = {
        description: 'Test Description 1'
      }
      const ticketData2 = {
        description: 'Test Description 2'
      }
      await request(app).put(`/tickets/${uuidV4()}`).send(ticketData1)
      await request(app).put(`/tickets/${uuidV4()}`).send(ticketData2)

      // Get the tickets
      const response = await request(app).get('/tickets')
      expect(response.status).toBe(status.OK)
      expect(Array.isArray(response.body)).toBe(true)
      expect(response.body.length).toBe(2)
      expect(response.body[0]).toHaveProperty('id')
      expect(response.body[0]).toHaveProperty('description')
    })
  })

  describe('GET /tickets/:id', () => {
    it('should return a ticket by id', async () => {
      // Create a ticket
      const ticketData = {
        description: 'Test Description'
      }
      const ticketId = uuidV4()
      await request(app).put(`/tickets/${ticketId}`).send(ticketData)

      // Get the ticket
      const response = await request(app).get(`/tickets/${ticketId}`)
      expect(response.status).toBe(status.OK)
      expect(response.body).toHaveProperty('id', ticketId)
      expect(response.body).toHaveProperty('description', 'Test Description')
    })

    it('should return 404 for non-existent ticket', async () => {
      const response = await request(app).get(`/tickets/${uuidV4()}`)
      expect(response.status).toBe(status.NOT_FOUND)
    })

    it('should return 422 for invalid UUID format', async () => {
      const response = await request(app).get('/tickets/not-a-uuid')
      expect(response.status).toBe(status.UNPROCESSABLE_ENTITY)
    })
  })

  describe('PUT /tickets/:id (create)', () => {
    it('should create a new ticket with the provided id', async () => {
      const ticketId = uuidV4()
      const ticketData = {
        description: 'Test Description'
      }
      const response = await request(app)
        .put(`/tickets/${ticketId}`)
        .send(ticketData)
      expect(response.status).toBe(status.CREATED)

      // Verify the ticket was created
      const getResponse = await request(app).get(`/tickets/${ticketId}`)
      expect(getResponse.status).toBe(status.OK)
      expect(getResponse.body).toHaveProperty('id', ticketId)
      expect(getResponse.body).toHaveProperty('description', 'Test Description')
    })

    it('should return 422 if description is missing', async () => {
      const ticketId = uuidV4()
      const data = {}
      const response = await request(app).put(`/tickets/${ticketId}`).send(data)
      expect(response.status).toBe(status.UNPROCESSABLE_ENTITY)
    })

    it('should return 422 if description is not a string', async () => {
      const ticketId = uuidV4()
      const data = {
        description: 123
      }
      const response = await request(app).put(`/tickets/${ticketId}`).send(data)
      expect(response.status).toBe(status.UNPROCESSABLE_ENTITY)
    })
  })

  describe('PATCH /tickets/:id (update)', () => {
    it('should update a ticket description', async () => {
      // Create a ticket first
      const ticketId = uuidV4()
      const ticketData = {
        description: 'Original Description'
      }
      await request(app).put(`/tickets/${ticketId}`).send(ticketData)

      // Update the ticket
      const updateData = {
        description: 'Updated Description'
      }
      const response = await request(app)
        .patch(`/tickets/${ticketId}`)
        .send(updateData)
      expect(response.status).toBe(status.OK)

      // Verify the ticket was updated
      const getResponse = await request(app).get(`/tickets/${ticketId}`)
      expect(getResponse.status).toBe(status.OK)
      expect(getResponse.body).toHaveProperty(
        'description',
        'Updated Description'
      )
    })

    it('should return 404 for non-existent ticket', async () => {
      const updateData = {
        description: 'Updated Description'
      }
      const response = await request(app)
        .patch(`/tickets/${uuidV4()}`)
        .send(updateData)
      expect(response.status).toBe(status.NOT_FOUND)
    })
  })

  describe('DELETE /tickets/:id', () => {
    it('should delete a ticket', async () => {
      // Create a ticket first
      const ticketId = uuidV4()
      const ticketData = {
        description: 'Test Description'
      }
      await request(app).put(`/tickets/${ticketId}`).send(ticketData)

      // Delete the ticket
      const response = await request(app).delete(`/tickets/${ticketId}`)
      expect(response.status).toBe(status.NO_CONTENT)

      // Verify the ticket was deleted
      const getResponse = await request(app).get(`/tickets/${ticketId}`)
      expect(getResponse.status).toBe(status.NOT_FOUND)
    })

    it('should return 404 for non-existent ticket', async () => {
      const response = await request(app).delete(`/tickets/${uuidV4()}`)
      expect(response.status).toBe(status.NOT_FOUND)
    })
  })
})
