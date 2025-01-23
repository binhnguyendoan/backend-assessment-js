require("dotenv").config();

const http = require("http");
const { neon } = require("@neondatabase/serverless");

const sql = neon(process.env.DATABASE_URL);

const createTableProducts = async () => {
    await sql`
      CREATE TABLE IF NOT EXISTS products (
        ProductID SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        tags TEXT[],
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    console.log("Table 'products' created or already exists.");
};

const insertData = async (product) => {
    const insertQuery = `
      INSERT INTO products (ProductID, title, , tags, created_at, updated_at)
      VALUES ($1, $2, $3, $4, $5)
    `;

    for (const variant of product.variants) {
        await sql.query(insertQuery, [
            product.id,
            product.title,
            product.tags || null,
            product.created_at ? new Date(product.created_at) : null,
            product.updated_at ? new Date(product.updated_at) : null,
        ]);
    }
};

const requestHandler = async (req, res) => {
    await createTableProducts();
    const result = await sql`SELECT version()`;
    const { version } = result[0];
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end(version);
};

http.createServer(requestHandler).listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});