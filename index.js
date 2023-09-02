class ProductManager {
    constructor() {
        this.products = [];
        this.nextId = 1;
    }

    addProduct(product) {
        if (
            !product.title ||
            !product.description ||
            !product.price ||
            !product.thumbnail ||
            !product.code ||
            !product.stock
        ) {
            console.error("Todos los campos son obligatorios");
            return;
        }

        if (
            this.products.some(
                (existingProduct) => existingProduct.code === product.code
            )
        ) {
            console.error("Ya existe un producto con el mismo código");
            return;
        }

        product.id = this.nextId++;
        this.products.push(product);
    }

    getProducts() {
        return this.products;
    }

    getProductById(id) {
        const product = this.products.find((p) => p.id === id);
        if (!product) {
            console.error("Not found");
            return;
        }
        return product;
    }
}

// Testing //
const productManager = new ProductManager();

// Testeo 1
const emptyProducts = productManager.getProducts();
console.log("Productos iniciales:", emptyProducts);
console.assert(
    emptyProducts.length === 0,
    "La lista de productos no está vacía al inicio"
);

// Testeo 2
productManager.addProduct({
    title: "producto prueba",
    description: "Este es un producto prueba",
    price: 200,
    thumbnail: "Sin imagen",
    code: "abc123",
    stock: 25,
});

const productsAfterAdd = productManager.getProducts();
console.log("Productos después de agregar uno:", productsAfterAdd);
console.assert(
    productsAfterAdd.length === 1,
    "La lista de productos no contiene un producto después de agregarlo."
);

// Testeo 3
productManager.addProduct({
    title: "producto repetido",
    description: "Este producto tiene un código repetido",
    price: 300,
    thumbnail: "Sin imagen",
    code: "abc123",
    stock: 15,
});

// Testeo 4
const nonExistentProduct = productManager.getProductById(99);

// Testeo 5
const existingProduct = productManager.getProductById(1);

console.log("Resultado de la prueba:", nonExistentProduct);
console.log("Resultado de la prueba:", existingProduct);
