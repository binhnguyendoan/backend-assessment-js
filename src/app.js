require("dotenv").config();
const http = require("http");
const { neon } = require("@neondatabase/serverless");
const { handleRequest, json } = require("itty-router");

const sql = neon(process.env.DATABASE_URL);

  
const createTabletest= async () => {
    await sql `
    CREATE TABLE IF NOT EXISTS test (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL
    )
    `
    ;
    console.log("Table 'test' created or already exists.");
};
 const insertData = async (productData) => {
  const { title, tags, created_at, updated_at } = productData;
 
  await sql `
  INSERT INTO products ( title, tags, created_at, updated_at)
  VALUES ( ${title}, ${tags}, ${created_at}, ${updated_at})
  ON CONFLICT (ProductID) DO NOTHING
  `
;

  console.log("Table 'products' insert or already exists.");
};

const requestHandler = async (req, res) => {

  const url = req.url;
  const method = req.method;
  if (url === "/api/products" && method === "GET") {
    try {
     
      const result = await sql`SELECT * FROM products`; 
      res.end(JSON.stringify({
        success: true,
        result: result
      }));
      
    } catch (error) {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Error retrieving products.");
    }
  }
    
  const result = await "sql SELECT version()";
  const { version } = result[0];
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end(version);
};

http.createServer(requestHandler).listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});