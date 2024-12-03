import pg from 'pg'
const { Client } = pg
 
const client = new Client({
  password: process.env.SUPABASE_KEY,
  ssl: {
    rejectUnauthorized: false
  }
})

console.log(client)

client.connect()
    .then(() => console.log("Connected to Supabase!"))
    .catch((err) => console.log("Connection error", err.stack))

export const query = async (text) => {
    try{
        console.log("query to be executed:", text)
        const res = await client.query(text)
        return res
    } catch (err) {
        console.error("Problem executing query")
        console.error(err)
        throw err
    }
}

/* 
HOW TO USE
    query(qs).then(data) => {res.json(data.rows)}
*/