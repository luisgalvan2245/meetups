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
}

setWorldConstructor(APIWorld)

Before(async function (this: APIWorld) {
  this.app = new Server({ silent: true }).app
})

Given('I have created two tickets', async function (this: APIWorld) {
  const ticketData1 = {
    description: 'Test Description 1'
  }
  const ticketData2 = {
    description: 'Test Description 2'
  }
  await request(this.app).put(`/tickets/${uuidV4()}`).send(ticketData1)
  await request(this.app).put(`/tickets/${uuidV4()}`).send(ticketData2)
})

Given('I have created a ticket', async function (this: APIWorld) {
  this.ticketId = uuidV4()
  this.ticketData = {
    description: 'Test Description'
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
      description: 'Test Description CREATED'
    }
    const url = endpoint.replace('{ticketId}', this.ticketId)
    this.response = await request(this.app).put(url).send(this.ticketData)
  }
)

When(
  'I make a PUT request to {string} with missing description',
  async function (this: APIWorld, endpoint: string) {
    this.ticketId = uuidV4()
    const invalidData = {}
    const url = endpoint.replace('{ticketId}', this.ticketId)
    this.response = await request(this.app).put(url).send(invalidData)
  }
)

When(
  'I make a PATCH request to {string} with update data',
  async function (this: APIWorld, endpoint: string) {
    const updateData = {
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
    this.response.body.forEach((ticket: any) => {
      if (!('id' in ticket)) {
        throw new Error('Expected ticket to have property id')
      }
      if (!('description' in ticket)) {
        throw new Error('Expected ticket to have property description')
      }
    })
  }
)

Then('the response should contain the ticket data', function (this: APIWorld) {
  if (this.response.body.id !== this.ticketId) {
    throw new Error(
      `Expected ticket id to be ${this.ticketId} but got ${this.response.body.id}`
    )
  }
  if (this.response.body.description !== this.ticketData.description) {
    throw new Error(
      `Expected description to be ${this.ticketData.description} but got ${this.response.body.description}`
    )
  }
})

Then(
  'the ticket should be created with the provided data',
  async function (this: APIWorld) {
    const response = await request(this.app).get(`/tickets/${this.ticketId}`)
    if (response.status !== 200) {
      throw new Error('Failed to get created ticket')
    }
    if (response.body.id !== this.ticketId) {
      throw new Error(
        `Expected ticket id to be ${this.ticketId} but got ${response.body.id}`
      )
    }
    if (response.body.description !== this.ticketData.description) {
      throw new Error(
        `Expected description to be ${this.ticketData.description} but got ${response.body.description}`
      )
    }
  }
)

Then(
  'the ticket should be updated with the new data',
  async function (this: APIWorld) {
    const response = await request(this.app).get(`/tickets/${this.ticketId}`)
    if (response.status !== 200) {
      throw new Error('Failed to get updated ticket')
    }
    if (response.body.description !== 'Updated Description') {
      throw new Error('Description was not updated')
    }
  }
)

Then('the ticket should be deleted', async function (this: APIWorld) {
  const response = await request(this.app).get(`/tickets/${this.ticketId}`)
  if (response.status !== 404) {
    throw new Error('Ticket was not deleted')
  }
})
