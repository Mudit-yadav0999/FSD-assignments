
import express from "express";

const app = express();

const PORT = 4444;

app.use(express.json());

// 100 Products
const products = [];

for (let i = 1; i <= 100; i++) {
    products.push({
        id: i,
        name: `Product ${i}`,
        price: i * 100,
        category: `Category ${((i - 1) % 10) + 1}`,
        inStock: true
    });
}

// Home
app.get("/", (req, res) => {
    res.send("Product REST API is running");
});

// Get all products
app.get("/products", (req, res) => {
    res.json(products);
});

// Get product by ID
app.get("/products/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const product = products.find(p => p.id === id);

    if (!product) {
        return res.status(404).json({
            message: "Product not found"
        });
    }

    res.json(product);
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
