import { json, Router } from 'itty-router';
import { createTableProducts, deleteProduct, insertProducts, queryDatabase, updateProduct } from './db';

const router = Router();

router.get("/up", async () => {
	try {
		await createTableProducts();
		return json({
			success: true,
			message: "Table 'products' created successfully.",
		});

	} catch (error: any) {
		return json({
			success: false,
			error: error.message || error,
		});
	}

});


router.get("/api/products", async () => {
	try {
		const response = await fetch("https://02557f4d-8f03-405d-a4e7-7a6483d26a04.mock.pstmn.io/get");
		const data: any = await response.json();
		for (const product of data.products) {
			await insertProducts(product);
		}

		return json({
			success: true,
			message: `${data.products.length} products have been successfully inserted into the database.`,
		});

	} catch (error: any) {
		return json({
			success: false,
			message: "Failed to retrieve products.",
			error: error.message || error,
		});
	}

});

router.post("/api/products", async (request: any) => {
	try {
		const body = await request.json();
		const { products } = body;

		if (!products || !Array.isArray(products)) {
			return json({
				success: false,
				message: "Invalid JSON data. Ensure 'products' is an array.",
			});
		}

		for (const product of products) {
			await insertProducts(product);
		}

		return json({
			success: true,
			message: `${products.length} products have been successfully added to the database.`,
		});
	} catch (error: any) {
		return json({
			success: false,
			message: "Failed to insert products.",
			error: error.message || error,
		});
	}
});

router.delete("/api/products/:product_id", async ({ params }: any) => {
	const { product_id } = params;

	try {
		await deleteProduct(Number(product_id));

		return json({
			success: true,
			message: `Product with ID ${product_id} has been deleted successfully.`,
		});
	} catch (error: any) {
		return json({
			success: false,
			message: "Failed to delete product.",
			error: error.message || error,
		});
	}
});


router.put("/api/products", async (request: any) => {
	try {

		const body = await request.json();
		const { products } = body;

		if (!products || !Array.isArray(products)) {
			return json({
				success: false,
				message: "Invalid JSON data. Ensure 'products' is an array.",
			});
		}

		for (const product of products) {
			await updateProduct(product);
		}

		return json({
			success: true,
			message: `${products.length} products have been updated successfully.`,
		});
	} catch (error: any) {
		return json({
			success: false,
			message: "Failed to update products.",
			error: error.message || error,
		});
	}
});



export default router;

