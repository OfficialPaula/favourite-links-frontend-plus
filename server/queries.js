require("dotenv").config()

const POOL = require('pg').Pool
const pool = new POOL({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST || "localhost",
  database: process.env.POSTGRES_NAME || "api",
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT || 5432,
})

const getLinks = (request, response) => {
  pool.query('SELECT * FROM links ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getLinkById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM links WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createLink = (request, response) => {
  console.log("request: ", request)
  const { name, url } = request.body

  pool.query('INSERT INTO links (name, url) VALUES ($1, $2) RETURNING *', [name, url], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`Link added with ID: ${results.rows[0].id}`)
  })
}

const updateLink = (request, response) => {
  const id = parseInt(request.params.id)
  const { name, url } = request.body

  pool.query(
    'UPDATE links SET name = $1, url = $2 WHERE id = $3',
    [name, url, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Link modified with ID: ${id}`)
    }
  )
}

const deleteLink = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM links WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`Link deleted with ID: ${id}`)
  })
}

module.exports = {
  getLinks,
  getLinkById,
  createLink,
  updateLink,
  deleteLink,
}