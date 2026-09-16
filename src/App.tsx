import './App.css';
import { useState } from 'react';
import Header from './components/Header/Header';
import ProductList from './components/ProductList/ProductList';
import AddProductForm from './components/AddProductForm/AddProductForm';
import type { ProductProps } from './types/product';

function App() {
    const [products, setProducts] = useState<ProductProps[]>([
        { name: 'Laptop', quantity: 10 },
        { name: 'Mysz', quantity: 25 },
        { name: 'Klawiatura', quantity: 15 },
    ]);

    function onAddProduct(product: ProductProps) {
        setProducts((prevProducts) => {
            const exists = prevProducts.some(
                (p) => p.name.toLowerCase() === product.name.toLowerCase(),
            );
            if (exists) {
                return prevProducts;
            }

            return [...prevProducts, product];
        });
    }

    function onEditProduct(product: ProductProps) {
        setProducts((prevProducts) =>
            prevProducts.map((p) =>
                p.name.toLowerCase() === product.name.toLowerCase() ? product : p,
            ),
        );
    }

    function onDeleteProduct(product: ProductProps) {
        setProducts((prevProducts) =>
            prevProducts.filter((p) => p.name.toLowerCase() !== product.name.toLowerCase()),
        );
    }

    return (
        <>
            <Header />
            <main>
                <ProductList
                    products={products}
                    onEditProduct={onEditProduct}
                    onDeleteProduct={onDeleteProduct}
                />
                <AddProductForm onAddProduct={onAddProduct} />
            </main>
        </>
    );
}

export default App;
