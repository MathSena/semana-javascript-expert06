import { jest, expect, describe, test, beforeEach } from '@jest/globals'

import config from '../../../server/config.js'

const { pages } = config

describe('#Routes - test site for api response', () => {
  beforeEach(() => {
    jest.resetAllMocks()
    jest.clearAllMocks()
  })

  test.todo('GET / - should redirect to the home page')
  test.todo(`GET /home - should response with ${pages.homeHTML} file stream`)
  test.todo(
    `GET /controller - should response with ${pages.controllerHTML} file stream`
  )
  test.todo(`GET /file.txt - should response with file stream`)
  test.todo(
    `GET /unknown - given an inexistent route it should response with 404`
  )

  describe('exceptions', () => {
    test.todo('given inexistent file it should respond with 404')
    test.todo('given an error it should respond with 500')
  })
})
