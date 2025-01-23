import { json, Router } from 'itty-router';;
const router = Router();

router.get("/api/products", async () => {
	try {
		const response = await fetch("https://02557f4d-8f03-405d-a4e7-7a6483d26a04.mock.pstmn.io/get");
		const data = await response.json();
		for (const product of data.products) {
			await insertData(product);
		}
		return json({
			success: true,
			message: "Products retrieved successfully.",
			
		});

	} catch (error: any) {
		return json({
			success: false,
			message: "Failed to retrieve or insert products.",
			error: error.message || error,
		});
	}

})

export default router;




