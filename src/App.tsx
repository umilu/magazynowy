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

    const onAddProduct = (product: ProductProps) => {
        setProducts((prevProducts) => {
            const exists = prevProducts.some((p) => p.name.toLowerCase() === product.name.toLowerCase());
            if (exists) {
                return prevProducts;
            }

            return [...prevProducts, product];
        });
    };

    const onEditProduct = (product: ProductProps) => {
        setProducts((prevProducts) =>
            prevProducts.map((p) => (p.name.toLowerCase() === product.name.toLowerCase() ? product : p)),
        );
    };

    return (
        <>
            <Header />
            <main>
                <ProductList products={products} onEditProduct={onEditProduct} />
                <AddProductForm onAddProduct={onAddProduct} />
            </main>
        </>
    );
}

export default App;
