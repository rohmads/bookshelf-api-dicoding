/* eslint-disable eqeqeq */
const { nanoid } = require('nanoid')
const books = require('./books')

// ADD BOOK
const addBookHandler = (request, h) => {
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload

  const id = nanoid(16)
  const finished = (pageCount === readPage)
  const insertedAt = new Date().toISOString()
  const updatedAt = insertedAt

  // validation
  if (!name) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku'
    })

    response.code(400)
    return response
  }

  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount'
    })

    response.code(400)
    return response
  }

  // push data
  const newBook = { name, year, author, summary, publisher, pageCount, readPage, reading, id, finished, insertedAt, updatedAt }
  books.push(newBook)

  const pushSuccess = books.filter(book => book.id === id).length > 0
  if (pushSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id
      }
    })

    response.code(201)
    return response
  }

  // error
  const response = h.response({
    status: 'error',
    message: 'Buku gagal ditambahkan'
  })

  response.code(500)
  return response
}

// GET ALL BOOK
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

// EDIT BOOK
const editBookByIdHandler = (request, h) => {
  const { id } = request.params
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload
  const finished = (pageCount === readPage)
  const updatedAt = new Date().toISOString()

  // validation
  if (!name) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku'
    })

    response.code(400)
    return response
  }

  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount'
    })

    response.code(400)
    return response
  }

  // update data
  const index = books.findIndex(book => book.id === id)
  if (index !== -1) {
    books[index] = {
      ...books[index], name, year, author, summary, publisher, pageCount, readPage, reading, finished, updatedAt
    }

    const response = h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui'
    })

    response.code(200)
    return response
  }

  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui buku. Id tidak ditemukan'
  })

  response.code(404)
  return response
}

// DELETE BOOK
const deleteBookByIdHandler = (request, h) => {
  const { id } = request.params
  const index = books.findIndex(book => book.id === id)

  if (index !== -1) {
    books.splice(index, 1)

    const response = h.response({
      status: 'success',
      message: 'Buku berhasil dihapus'
    })

    response.code(200)
    return response
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan'
  })

  response.code(404)
  return response
}

module.exports = {
  addBookHandler,
  getAllBookHandler,
  getBookByIdHandler,
  editBookByIdHandler,
  deleteBookByIdHandler
}
