process.on('unhandledRejection', r => console.log(r))
const { Pool } = require('pg')

const pool = process.env.DATABASE_URL 
  ? new Pool({
    connectionString : process.env.DATABASE_URL,
    ssl: true
  })
  : new Pool({
    user: 'benjamin',
    host: 'localhost',
    database: 'benjamin',
    password: '',
    port: 5432,
  })

const db = {}
const dbAdvanced = {}

db.new = async (table, data) => {
    const client = await pool.connect(),
      keys = Object.keys(data).join(','),
      values = Object.values(data).map((val, key) => '$' + (key + 1)).join(',')

      console.log("INSERT INTO "+ table +"("+ keys +") VALUES("+ values +") RETURNING id", Object.values(data))

      const res = await client.query("INSERT INTO "+ table +"("+ keys +") VALUES("+ values +") RETURNING id", Object.values(data)).catch(err => {
        client.release()
      throw err
    })

    client.release()
    return res.rows[0].id
}


db.find = async (table, data) => {
  const client = await pool.connect(),
    whereArray = Object.entries(data).map(entry => entry[0] +" = '"+ entry[1] + "'")
    where = whereArray.join(' AND '),
    res = await client.query("SELECT * FROM "+ table +" WHERE "+ where).catch(err => {
    client.release()
    throw err
  })

  client.release()
  return res.rows
}

db.getByValues = async (table, column, values) => {
  const client = await pool.connect(),
    whereArray = values.map(value => column +" = "+ value + "")
    where = whereArray.join(' OR '),
    res = await client.query("SELECT * FROM "+ table +" WHERE "+ where).catch(err => {
    client.release()
    throw err
  })

  client.release()
  return res.rows
}


db.findOne = async (table, data) => {

  const entries = await db.find(table, data).catch(err => {
    throw err
  })

  return entries[0]
}


db.update = async (table, id, data) => {
  const client = await pool.connect(),
    setArray = Object.keys(data).map((entry, key) => entry +" = $"+ (key + 1))
    set = setArray.join(', '),
    res = await client.query("UPDATE "+ table +" SET "+ set +" WHERE id = "+ id, Object.values(data)).catch(err => {
    client.release()
    throw err
  })

  console.log("UPDATE "+ table +" SET "+ set +" WHERE id = "+ id, Object.values(data))

  client.release()
  return res.rows
}



  
exports.db = db
exports.dbAdvanced = dbAdvanced
