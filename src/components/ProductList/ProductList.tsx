import ProductItem from '../ProductItem/ProductItem';
import type { ProductListProps, ProductProps } from '../../types/product';
import { useState } from 'react';
import EditProductForm from '../EditProductForm/EditProductForm';

function ProductList({ products, onEditProduct, onDeleteProduct }: ProductListProps) {
    const [editingProduct, setEditingProduct] = useState<ProductProps | null>(null);
    const [searchTerm, setSearchTerm] = useState('');

    function handleEditProduct(product: ProductProps) {
        setEditingProduct(product);
    }

    function handleSaveProduct(updatedProduct: ProductProps) {
        setEditingProduct(null);
        onEditProduct(updatedProduct);
    }

    function handleDeleteProduct(product: ProductProps) {
        onDeleteProduct(product);
    }

    const filteredProducts = products.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    const listProducts = filteredProducts.map((product, index) => {
        return (
            <ProductItem
                key={index}
                product={product}
                onEditProduct={handleEditProduct}
                onDeleteProduct={handleDeleteProduct}
            />
        );
    });

    return (
        <div>
            <input
                type="search"
                placeholder="Szukaj produktu..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            {editingProduct && <p>Edytujemy: {editingProduct.name}</p>}
            {filteredProducts.length > 0 ? (
                listProducts
            ) : products.length === 0 ? (
                <p>Brak produktów</p>
            ) : (
                <p>Brak pasujących wyników</p>
            )}
            {editingProduct && (
                <EditProductForm product={editingProduct} onSaveProduct={handleSaveProduct} />
            )}
        </div>
    );
}

export default ProductList;
