const Pool = require('pg').Pool
const pool = new Pool({
  user: 'nigellobo',
  host: 'localhost',
  database: 'tea',
  password: '1m2n3b4v',
  port: 5432,
})
const getTeas = (request, response) => {
  pool.query('SELECT * FROM teas ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getTeaById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM teas WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createTea = (request, response) => {
  const { name, caffeineamount, likes, hexcolour, steeptime, temp } = request.body
  console.log(request.body)
  console.log(hexcolour)
  console.log(likes)
  pool.query('INSERT INTO teas (name, caffeineamount, likes, hexcolour, steeptime, temp) VALUES ($1, $2, $3, $4, $5, $6)', [name, caffeineamount, likes, hexcolour, steeptime, temp], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`Tea added with ID: ${results.insertId}`)
  })
}

const updateTea = (request, response) => {
  const id = parseInt(request.params.id)
  const { name, caffeineamount, likes, hexcolour, steeptime, temp } = request.body

  pool.query(
    'UPDATE teas SET name = $1, caffeineamount = $2, likes = $3, hexcolour = $4, steeptime = $5, temp = $6 WHERE id = $7',
    [name, caffeineamount, likes, hexcolour, steeptime, temp, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Tea modified with ID: ${id}`)
    }
  )
}

const deleteTea = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM teas WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`Tea deleted with ID: ${id}`)
  })
}

const incrementLikes = (request, response) => {
    const id = parseInt(request.params.id)
    const likes = parseInt(request.params.likes) + 1
    console.log(id)
    console.log(likes)
  
    pool.query(
        'UPDATE teas SET likes = $1 WHERE id = $2', [likes, id], (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send(`Tea likes incremeneted with ID: ${id}`)
        }
      )
  }

module.exports = {
  getTeas,
  getTeaById,
  createTea,
  updateTea,
  deleteTea,
  incrementLikes
}