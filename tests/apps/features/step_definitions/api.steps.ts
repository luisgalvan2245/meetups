import { After, Before, Given, Then, When } from '@cucumber/cucumber'
import request from 'supertest'
import { v4 as uuidV4 } from 'uuid'

import { Server } from '../../../../src/apps/platform/backend/server'

let response: any
let server: Server
let meetupId: string
let meetupData: any

Before(async function () {
  server = new Server()
  await server.listen()
})

After(async function () {
  await server.close()
})

Given('I have created two meetups', async function () {
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
  await request(server.app).put(`/meetups/${uuidV4()}`).send(meetupData1)
  await request(server.app).put(`/meetups/${uuidV4()}`).send(meetupData2)
})

Given('I have created a meetup', async function () {
  meetupId = uuidV4()
  meetupData = {
    title: 'Test Meetup',
    description: 'Test Description',
    date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    location: 'Test Location',
    imageUrl: 'https://example.com/test.jpg',
    organizerId: uuidV4()
  }
  await request(server.app).put(`/meetups/${meetupId}`).send(meetupData)
})

When('I make a GET request to {string}', async function (endpoint: string) {
  const url = endpoint
    .replace('{meetupId}', meetupId)
    .replace('{nonExistentId}', uuidV4())
  response = await request(server.app).get(url)
})

When(
  'I make a PUT request to {string} with valid meetup data',
  async function (endpoint: string) {
    const url = endpoint.replace('{meetupId}', meetupId)
    response = await request(server.app).put(url).send(meetupData)
  }
)

When(
  'I make a PUT request to {string} with missing required fields',
  async function (endpoint: string) {
    const invalidData = {
      description: 'Test Description',
      date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      location: 'Test Location',
      imageUrl: 'https://example.com/test.jpg',
      organizerId: uuidV4()
    }
    const url = endpoint.replace('{meetupId}', meetupId)
    response = await request(server.app).put(url).send(invalidData)
  }
)

When(
  'I make a PATCH request to {string} with update data',
  async function (endpoint: string) {
    const updateData = {
      title: 'Updated Title',
      description: 'Updated Description'
    }
    const url = endpoint.replace('{meetupId}', meetupId)
    response = await request(server.app).patch(url).send(updateData)
  }
)

When('I make a DELETE request to {string}', async function (endpoint: string) {
  const url = endpoint.replace('{meetupId}', meetupId)
  response = await request(server.app).delete(url)
})

Then('the response status code should be {int}', function (statusCode: number) {
  if (response.status !== statusCode) {
    throw new Error(
      `Expected status code ${statusCode} but got ${response.status}`
    )
  }
})

Then('the response should be a valid JSON array', function () {
  if (!Array.isArray(response.body)) {
    throw new Error('Expected response to be an array')
  }
})

Then(
  'the response should contain two meetups with required properties',
  function () {
    if (response.body.length !== 2) {
      throw new Error(`Expected 2 meetups but got ${response.body.length}`)
    }
    const requiredProperties = [
      'id',
      'title',
      'description',
      'date',
      'location',
      'imageUrl'
    ]
    for (const meetup of response.body) {
      for (const prop of requiredProperties) {
        if (!(prop in meetup)) {
          throw new Error(`Expected meetup to have property ${prop}`)
        }
      }
    }
  }
)

Then('the response should contain the meetup data', function () {
  const meetup = response.body
  if (meetup.id !== meetupId) {
    throw new Error(`Expected meetup id to be ${meetupId} but got ${meetup.id}`)
  }
  for (const [key, value] of Object.entries(meetupData)) {
    if (meetup[key] !== value) {
      throw new Error(`Expected ${key} to be ${value} but got ${meetup[key]}`)
    }
  }
})

Then('the meetup should be created with the provided data', async function () {
  const getResponse = await request(server.app).get(`/meetups/${meetupId}`)
  if (getResponse.status !== 200) {
    throw new Error('Failed to get created meetup')
  }
  for (const [key, value] of Object.entries(meetupData)) {
    if (getResponse.body[key] !== value) {
      throw new Error(
        `Expected ${key} to be ${value} but got ${getResponse.body[key]}`
      )
    }
  }
})

Then('the meetup should be updated with the new data', async function () {
  const getResponse = await request(server.app).get(`/meetups/${meetupId}`)
  if (getResponse.status !== 200) {
    throw new Error('Failed to get updated meetup')
  }
  if (getResponse.body.title !== 'Updated Title') {
    throw new Error('Title was not updated')
  }
  if (getResponse.body.description !== 'Updated Description') {
    throw new Error('Description was not updated')
  }
})

Then('the meetup should be deleted', async function () {
  const getResponse = await request(server.app).get(`/meetups/${meetupId}`)
  if (getResponse.status !== 404) {
    throw new Error('Meetup was not deleted')
  }
})
