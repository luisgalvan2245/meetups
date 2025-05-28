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
  meetupId: string
  meetupData: any

  constructor(options: IWorldOptions) {
    super(options)
    this.response = null
    this.meetupId = ''
    this.meetupData = {}
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

Given('I have created two meetups', async function (this: APIWorld) {
  const meetupData1 = {
    title: 'Test Meetup 1',
    description: 'Test Description 1',
    date: this.getFutureDate(7),
    location: 'Test Location 1',
    imageUrl: 'https://example.com/test1.jpg',
    organizerId: uuidV4()
  }
  const meetupData2 = {
    title: 'Test Meetup 2',
    description: 'Test Description 2',
    date: this.getFutureDate(7),
    location: 'Test Location 2',
    imageUrl: 'https://example.com/test2.jpg',
    organizerId: uuidV4()
  }
  await request(this.app).put(`/meetups/${uuidV4()}`).send(meetupData1)
  await request(this.app).put(`/meetups/${uuidV4()}`).send(meetupData2)
})

Given('I have created a meetup', async function (this: APIWorld) {
  this.meetupId = uuidV4()
  this.meetupData = {
    title: 'Test Meetup',
    description: 'Test Description',
    date: this.getFutureDate(7),
    location: 'Test Location',
    imageUrl: 'https://example.com/test.jpg',
    organizerId: uuidV4()
  }
  await request(this.app).put(`/meetups/${this.meetupId}`).send(this.meetupData)
})

When(
  'I make a GET request to {string}',
  async function (this: APIWorld, endpoint: string) {
    const url = endpoint
      .replace('{meetupId}', this.meetupId)
      .replace('{nonExistentId}', uuidV4())
    this.response = await request(this.app).get(url)
  }
)

When(
  'I make a PUT request to {string} with valid meetup data',
  async function (this: APIWorld, endpoint: string) {
    this.meetupId = uuidV4()
    this.meetupData = {
      title: 'Test Meetup CREATED',
      description: 'Test Description CREATED',
      date: this.getFutureDate(7),
      location: 'Test Location CREATED',
      imageUrl: 'https://example.com/test_created.jpg',
      organizerId: uuidV4()
    }
    const url = endpoint.replace('{meetupId}', this.meetupId)
    this.response = await request(this.app).put(url).send(this.meetupData)
  }
)

When(
  'I make a PUT request to {string} with missing required fields',
  async function (this: APIWorld, endpoint: string) {
    this.meetupId = uuidV4()
    // Missing title field
    const invalidData = {
      description: 'Test Description',
      date: this.getFutureDate(7),
      location: 'Test Location',
      imageUrl: 'https://example.com/test.jpg',
      organizerId: uuidV4()
    }
    const url = endpoint.replace('{meetupId}', this.meetupId)
    this.response = await request(this.app).put(url).send(invalidData)
  }
)

When(
  'I make a PUT request to {string} with missing description',
  async function (this: APIWorld, endpoint: string) {
    this.meetupId = uuidV4()
    const invalidData = {
      title: 'Test Title',
      date: this.getFutureDate(7),
      location: 'Test Location',
      imageUrl: 'https://example.com/test.jpg',
      organizerId: uuidV4()
    }
    const url = endpoint.replace('{meetupId}', this.meetupId)
    this.response = await request(this.app).put(url).send(invalidData)
  }
)

When(
  'I make a PUT request to {string} with missing date',
  async function (this: APIWorld, endpoint: string) {
    this.meetupId = uuidV4()
    const invalidData = {
      title: 'Test Title',
      description: 'Test Description',
      location: 'Test Location',
      imageUrl: 'https://example.com/test.jpg',
      organizerId: uuidV4()
    }
    const url = endpoint.replace('{meetupId}', this.meetupId)
    this.response = await request(this.app).put(url).send(invalidData)
  }
)

When(
  'I make a PUT request to {string} with missing location',
  async function (this: APIWorld, endpoint: string) {
    this.meetupId = uuidV4()
    const invalidData = {
      title: 'Test Title',
      description: 'Test Description',
      date: this.getFutureDate(7),
      imageUrl: 'https://example.com/test.jpg',
      organizerId: uuidV4()
    }
    const url = endpoint.replace('{meetupId}', this.meetupId)
    this.response = await request(this.app).put(url).send(invalidData)
  }
)

When(
  'I make a PUT request to {string} with missing imageUrl',
  async function (this: APIWorld, endpoint: string) {
    this.meetupId = uuidV4()
    const invalidData = {
      title: 'Test Title',
      description: 'Test Description',
      date: this.getFutureDate(7),
      location: 'Test Location',
      organizerId: uuidV4()
    }
    const url = endpoint.replace('{meetupId}', this.meetupId)
    this.response = await request(this.app).put(url).send(invalidData)
  }
)

When(
  'I make a PUT request to {string} with missing organizerId',
  async function (this: APIWorld, endpoint: string) {
    this.meetupId = uuidV4()
    const invalidData = {
      title: 'Test Title',
      description: 'Test Description',
      date: this.getFutureDate(7),
      location: 'Test Location',
      imageUrl: 'https://example.com/test.jpg'
    }
    const url = endpoint.replace('{meetupId}', this.meetupId)
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
    const url = endpoint.replace('{meetupId}', this.meetupId)
    this.response = await request(this.app).patch(url).send(updateData)
  }
)

When(
  'I make a DELETE request to {string}',
  async function (this: APIWorld, endpoint: string) {
    const url = endpoint.replace('{meetupId}', this.meetupId)
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
  'the response should contain two meetups with required properties',
  function (this: APIWorld) {
    if (this.response.body.length !== 2) {
      throw new Error(`Expected 2 meetups but got ${this.response.body.length}`)
    }
    const requiredProperties = [
      'id',
      'title',
      'description',
      'date',
      'location',
      'imageUrl'
    ]
    for (const meetup of this.response.body) {
      for (const prop of requiredProperties) {
        if (!(prop in meetup)) {
          throw new Error(`Expected meetup to have property ${prop}`)
        }
      }
    }
  }
)

Then('the response should contain the meetup data', function (this: APIWorld) {
  const meetup = this.response.body
  if (meetup.id !== this.meetupId) {
    throw new Error(
      `Expected meetup id to be ${this.meetupId} but got ${meetup.id}`
    )
  }
  for (const [key, value] of Object.entries(this.meetupData)) {
    if (meetup[key] !== value) {
      throw new Error(`Expected ${key} to be ${value} but got ${meetup[key]}`)
    }
  }
})

Then(
  'the meetup should be created with the provided data',
  async function (this: APIWorld) {
    const getResponse = await request(this.app).get(`/meetups/${this.meetupId}`)
    if (getResponse.status !== 200) {
      throw new Error('Failed to get created meetup')
    }
    for (const [key, value] of Object.entries(this.meetupData)) {
      if (getResponse.body[key] !== value) {
        throw new Error(
          `Expected ${key} to be ${value} but got ${getResponse.body[key]}`
        )
      }
    }
  }
)

Then(
  'the meetup should be updated with the new data',
  async function (this: APIWorld) {
    const getResponse = await request(this.app).get(`/meetups/${this.meetupId}`)
    if (getResponse.status !== 200) {
      throw new Error('Failed to get updated meetup')
    }
    if (getResponse.body.title !== 'Updated Title') {
      throw new Error('Title was not updated')
    }
    if (getResponse.body.description !== 'Updated Description') {
      throw new Error('Description was not updated')
    }
  }
)

Then('the meetup should be deleted', async function (this: APIWorld) {
  const getResponse = await request(this.app).get(`/meetups/${this.meetupId}`)
  if (getResponse.status !== 404) {
    throw new Error('Meetup was not deleted')
  }
})
