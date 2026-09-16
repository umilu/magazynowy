import ProductItem from '../ProductItem/ProductItem';
import type { ProductListProps, ProductProps } from '../../types/product';
import { useState } from 'react';
import EditProductForm from '../EditProductForm/EditProductForm';

function ProductList({ products, onEditProduct, onDeleteProduct }: ProductListProps) {
    const [editingProduct, setEditingProduct] = useState<ProductProps | null>(null);
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

    const listProducts = products.map((product, index) => {
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
            {editingProduct && <p>Edytujemy: {editingProduct.name}</p>}
            {listProducts}
            {editingProduct && <EditProductForm product={editingProduct} onSaveProduct={handleSaveProduct} />}
        </div>
    );
}

export default ProductList;
