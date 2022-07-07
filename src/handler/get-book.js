/* eslint-disable eqeqeq */

const books = require('../data/books')

const getAllBookHandler = (request, h) => {
  // by query
  const { name, reading, finished } = request.query

  if (name !== undefined) {
    const bookResult = books.filter(book => book.name.toLowerCase().includes(name.toLowerCase()))

    const response = h.response({
      status: 'success',
      data: {
        books: bookResult.map(book => ({
          id: book.id,
          name: book.name,
          publisher: book.publisher
        }))
      }
    })

    response.code(200)
    return response
  } else if (reading !== undefined) {
    const bookResult = books.filter(book => book.reading == reading)

    const response = h.response({
      status: 'success',
      data: {
        books: bookResult.map(book => ({
          id: book.id,
          name: book.name,
          publisher: book.publisher
        }))
      }
    })

    response.code(200)
    return response
  } else if (finished !== undefined) {
    const bookResult = books.filter(book => book.finished == finished)

    const response = h.response({
      status: 'success',
      data: {
        books: bookResult.map(book => ({
          id: book.id,
          name: book.name,
          publisher: book.publisher
        }))
      }
    })

    response.code(200)
    return response
  }

  // all
  const response = h.response({
    status: 'success',
    data: {
      books: books.map(book => ({
        id: book.id,
        name: book.name,
        publisher: book.publisher
      }))
    }
  })

  response.code(200)
  return response
}

// GET BOOK BY ID
const getBookByIdHandler = (request, h) => {
  const { id } = request.params

  const book = books.filter(bo => bo.id === id)[0]
  if (book !== undefined) {
    const response = h.response({
      status: 'success',
      data: {
        book
      }
    })

    response.code(200)
    return response
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan'
  })
  response.code(404)
  return response
}

module.exports = { getAllBookHandler, getBookByIdHandler }
