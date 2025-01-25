import { Client } from "@neondatabase/serverless";
import { json } from "itty-router";
export const createTableProducts = async () => {
    const client = new Client({
        connectionString:
            "postgresql://product_db_owner:npg_A0B9mZxIwLsg@ep-restless-mountain-a7xnqw88.ap-southeast-2.aws.neon.tech/product_db?sslmode=require",
    });

    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS products (
            id BIGINT  PRIMARY KEY,
            title TEXT NOT NULL,
            tags TEXT[],
            sku TEXT NOT NULL,
            created_at TIMESTAMP NOT NULL,
            updated_at TIMESTAMP NOT NULL,
            UNIQUE (id)
        );
    `;

    try {
        await client.connect();

        await client.query(createTableQuery);

        return json({
            success: true,
            message: "Table 'products' created successfully.",
        });
    } catch (error: any) {
        return json({
            success: true,
            error: error.message,
        });
    } finally {
        await client.end();
    }
};

export const queryDatabase = async (query: string, params: any[] = []) => {
    const client = new Client({
        connectionString:
            "postgresql://product_db_owner:npg_A0B9mZxIwLsg@ep-restless-mountain-a7xnqw88.ap-southeast-2.aws.neon.tech/product_db?sslmode=require",
    });

    try {
        await client.connect();
        const result = await client.query(query, params);
        return result.rows;
    } catch (error: any) {
        throw new Error(`Database error: ${error.message || error}`);
    } finally {
        await client.end();
    }
};

export const insertProducts = async (product: any) => {
    const client = new Client({
        connectionString:
            "postgresql://product_db_owner:npg_A0B9mZxIwLsg@ep-restless-mountain-a7xnqw88.ap-southeast-2.aws.neon.tech/product_db?sslmode=require",
    });
    const { id, title, tags, created_at, updated_at } = product;
    const Arraytags = [tags];
    const fullTitle = product.variants.map((variant: any) => `${title}, ${variant.title}`).join(', ');
    const sku = product.variants.map((variant: any) => variant.sku).join(', ');

    try {
        await client.connect();
        await client.query(
            `
            INSERT INTO products (id, title, tags, sku, created_at, updated_at)
            VALUES ($1, $2, $3, $4, $5, $6)
            ON CONFLICT (id) DO NOTHING
            `,
            [id, fullTitle, Arraytags, sku, created_at, updated_at]
        );

    } catch (error: any) {
        throw new Error(`Database error while inserting product: ${error.message || error}`);
    } finally {
        await client.end();
    }
};


export const deleteProduct = async (product_id: number) => {
    const client = new Client({
        connectionString:
            "postgresql://product_db_owner:npg_A0B9mZxIwLsg@ep-restless-mountain-a7xnqw88.ap-southeast-2.aws.neon.tech/product_db?sslmode=require",
    });
    try {
        await client.connect();
        const result = await client.query(
            `DELETE FROM products WHERE id = $1 RETURNING *`,
            [product_id]
        );

        if (result.rows.length === 0) {
            return json({
                success: false,
                message: `Product with ID ${product_id} does not exist.`,
            });
        }
    } catch (error: any) {
        return json({
            success: false,
            message: "Failed to delete product.",
            error: error.message || error,
        });
    } finally {
        await client.end();
    }
};

export const updateProduct = async (product: any) => {
    const client = new Client({
        connectionString:
            "postgresql://product_db_owner:npg_A0B9mZxIwLsg@ep-restless-mountain-a7xnqw88.ap-southeast-2.aws.neon.tech/product_db?sslmode=require",
    });

    const { id, title, tags, created_at, updated_at } = product;

    const Arraytags = [tags];
    const fullTitle = product.variants.map((variant: any) => `${title}, ${variant.title}`).join(', ');
    const sku = product.variants.map((variant: any) => variant.sku).join(', ');


    try {
        await client.connect();

        const result = await client.query(
            `UPDATE products
             SET title = $1, tags = $2, sku = $3, created_at = $4, updated_at = $5
             WHERE id = $6 RETURNING *`,
            [fullTitle, Arraytags, sku, created_at, updated_at, id]
        );

        if (result.rows.length === 0) {
            return json({
                success: false,
                message: `Product with ID ${id} does not exist.`,
            });
        }

        return json({
            success: true,
            message: `Product with ID ${id} has been updated successfully.`,
        });
    } catch (error: any) {
        return json({
            success: false,
            message: "Failed to update product.",
            error: error.message || error,
        });
    } finally {
        await client.end();
    }
};

