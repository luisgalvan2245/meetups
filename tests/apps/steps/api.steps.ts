import {
  Before,
  Given,
  IWorldOptions,
  Then,
  When,
  World,
  setWorldConstructor
} from '@cucumber/cucumber'
import { Application } from 'express'
import request from 'supertest'
import { v4 as uuidV4 } from 'uuid'

import { Server } from '../../../src/apps/platform/backend/server'

class APIWorld extends World {
  app!: Application
  response: any
  ticketId: string
  ticketData: any

  constructor(options: IWorldOptions) {
    super(options)
    this.response = null
    this.ticketId = ''
    this.ticketData = {}
  }

  getFutureDate(days: number): string {
    const daysInMs = days * 24 * 60 * 60 * 1000
    return new Date(Date.now() + daysInMs).toISOString()
  }
}

setWorldConstructor(APIWorld)

Before(async function (this: APIWorld) {
  this.app = new Server({ silent: true }).app
})

Given('I have created two tickets', async function (this: APIWorld) {
  const ticketData1 = {
    title: 'Test Ticket 1',
    description: 'Test Description 1',
    date: this.getFutureDate(7),
    location: 'Test Location 1',
    imageUrl: 'https://example.com/test1.jpg',
    organizerId: uuidV4()
  }
  const ticketData2 = {
    title: 'Test Ticket 2',
    description: 'Test Description 2',
    date: this.getFutureDate(7),
    location: 'Test Location 2',
    imageUrl: 'https://example.com/test2.jpg',
    organizerId: uuidV4()
  }
  await request(this.app).put(`/tickets/${uuidV4()}`).send(ticketData1)
  await request(this.app).put(`/tickets/${uuidV4()}`).send(ticketData2)
})

Given('I have created a ticket', async function (this: APIWorld) {
  this.ticketId = uuidV4()
  this.ticketData = {
    title: 'Test Ticket',
    description: 'Test Description',
    date: this.getFutureDate(7),
    location: 'Test Location',
    imageUrl: 'https://example.com/test.jpg',
    organizerId: uuidV4()
  }
  const response = await request(this.app)
    .put(`/tickets/${this.ticketId}`)
    .send(this.ticketData)
  if (response.status !== 201) {
    throw new Error(`Failed to create ticket: ${response.status}`)
  }
})

When(
  'I make a GET request to {string}',
  async function (this: APIWorld, endpoint: string) {
    const url = endpoint
      .replace('{ticketId}', this.ticketId)
      .replace('{nonExistentId}', uuidV4())
    this.response = await request(this.app).get(url)
  }
)

When(
  'I make a PUT request to {string} with valid ticket data',
  async function (this: APIWorld, endpoint: string) {
    this.ticketId = uuidV4()
    this.ticketData = {
      title: 'Test Ticket CREATED',
      description: 'Test Description CREATED',
      date: this.getFutureDate(7),
      location: 'Test Location CREATED',
      imageUrl: 'https://example.com/test_created.jpg',
      organizerId: uuidV4()
    }
    const url = endpoint.replace('{ticketId}', this.ticketId)
    this.response = await request(this.app).put(url).send(this.ticketData)
  }
)

When(
  'I make a PUT request to {string} with missing required fields',
  async function (this: APIWorld, endpoint: string) {
    this.ticketId = uuidV4()
    // Missing title field
    const invalidData = {
      description: 'Test Description',
      date: this.getFutureDate(7),
      location: 'Test Location',
      imageUrl: 'https://example.com/test.jpg',
      organizerId: uuidV4()
    }
    const url = endpoint.replace('{ticketId}', this.ticketId)
    this.response = await request(this.app).put(url).send(invalidData)
  }
)

When(
  'I make a PUT request to {string} with missing description',
  async function (this: APIWorld, endpoint: string) {
    this.ticketId = uuidV4()
    const invalidData = {
      title: 'Test Title',
      date: this.getFutureDate(7),
      location: 'Test Location',
      imageUrl: 'https://example.com/test.jpg',
      organizerId: uuidV4()
    }
    const url = endpoint.replace('{ticketId}', this.ticketId)
    this.response = await request(this.app).put(url).send(invalidData)
  }
)

When(
  'I make a PUT request to {string} with missing date',
  async function (this: APIWorld, endpoint: string) {
    this.ticketId = uuidV4()
    const invalidData = {
      title: 'Test Title',
      description: 'Test Description',
      location: 'Test Location',
      imageUrl: 'https://example.com/test.jpg',
      organizerId: uuidV4()
    }
    const url = endpoint.replace('{ticketId}', this.ticketId)
    this.response = await request(this.app).put(url).send(invalidData)
  }
)

When(
  'I make a PUT request to {string} with missing location',
  async function (this: APIWorld, endpoint: string) {
    this.ticketId = uuidV4()
    const invalidData = {
      title: 'Test Title',
      description: 'Test Description',
      date: this.getFutureDate(7),
      imageUrl: 'https://example.com/test.jpg',
      organizerId: uuidV4()
    }
    const url = endpoint.replace('{ticketId}', this.ticketId)
    this.response = await request(this.app).put(url).send(invalidData)
  }
)

When(
  'I make a PUT request to {string} with missing imageUrl',
  async function (this: APIWorld, endpoint: string) {
    this.ticketId = uuidV4()
    const invalidData = {
      title: 'Test Title',
      description: 'Test Description',
      date: this.getFutureDate(7),
      location: 'Test Location',
      organizerId: uuidV4()
    }
    const url = endpoint.replace('{ticketId}', this.ticketId)
    this.response = await request(this.app).put(url).send(invalidData)
  }
)

When(
  'I make a PUT request to {string} with missing organizerId',
  async function (this: APIWorld, endpoint: string) {
    this.ticketId = uuidV4()
    const invalidData = {
      title: 'Test Title',
      description: 'Test Description',
      date: this.getFutureDate(7),
      location: 'Test Location',
      imageUrl: 'https://example.com/test.jpg'
    }
    const url = endpoint.replace('{ticketId}', this.ticketId)
    this.response = await request(this.app).put(url).send(invalidData)
  }
)

When(
  'I make a PATCH request to {string} with update data',
  async function (this: APIWorld, endpoint: string) {
    const updateData = {
      title: 'Updated Title',
      description: 'Updated Description'
    }
    const url = endpoint.replace('{ticketId}', this.ticketId)
    this.response = await request(this.app).patch(url).send(updateData)
  }
)

When(
  'I make a DELETE request to {string}',
  async function (this: APIWorld, endpoint: string) {
    const url = endpoint.replace('{ticketId}', this.ticketId)
    this.response = await request(this.app).delete(url)
  }
)

Then(
  'the response status code should be {int}',
  function (this: APIWorld, statusCode: number) {
    if (this.response.status !== statusCode) {
      throw new Error(
        `Expected status code ${statusCode} but got ${this.response.status}`
      )
    }
  }
)

Then('the response should be a valid JSON array', function (this: APIWorld) {
  if (!Array.isArray(this.response.body)) {
    throw new Error('Expected response to be an array')
  }
})

Then(
  'the response should contain two tickets with required properties',
  function (this: APIWorld) {
    if (this.response.body.length !== 2) {
      throw new Error(`Expected 2 tickets but got ${this.response.body.length}`)
    }
    const requiredProperties = [
      'id',
      'title',
      'description',
      'date',
      'location',
      'imageUrl'
    ]
    for (const ticket of this.response.body) {
      for (const prop of requiredProperties) {
        if (!(prop in ticket)) {
          throw new Error(`Expected ticket to have property ${prop}`)
        }
      }
    }
  }
)

Then('the response should contain the ticket data', function (this: APIWorld) {
  const ticket = this.response.body
  if (ticket.id !== this.ticketId) {
    throw new Error(
      `Expected ticket id to be ${this.ticketId} but got ${ticket.id}`
    )
  }
  for (const [key, value] of Object.entries(this.ticketData)) {
    if (ticket[key] !== value) {
      throw new Error(`Expected ${key} to be ${value} but got ${ticket[key]}`)
    }
  }
})

Then(
  'the ticket should be created with the provided data',
  async function (this: APIWorld) {
    const getResponse = await request(this.app).get(`/tickets/${this.ticketId}`)
    if (getResponse.status !== 200) {
      throw new Error('Failed to get created ticket')
    }
    for (const [key, value] of Object.entries(this.ticketData)) {
      if (getResponse.body[key] !== value) {
        throw new Error(
          `Expected ${key} to be ${value} but got ${getResponse.body[key]}`
        )
      }
    }
  }
)

Then(
  'the ticket should be updated with the new data',
  async function (this: APIWorld) {
    const getResponse = await request(this.app).get(`/tickets/${this.ticketId}`)
    if (getResponse.status !== 200) {
      throw new Error('Failed to get updated ticket')
    }
    if (getResponse.body.title !== 'Updated Title') {
      throw new Error('Title was not updated')
    }
    if (getResponse.body.description !== 'Updated Description') {
      throw new Error('Description was not updated')
    }
  }
)

Then('the ticket should be deleted', async function (this: APIWorld) {
  const getResponse = await request(this.app).get(`/tickets/${this.ticketId}`)
  if (getResponse.status !== 404) {
    throw new Error('Ticket was not deleted')
  }
})
