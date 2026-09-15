import ProductItem from '../ProductItem/ProductItem';
import type { ProductListProps, ProductProps } from '../../types/product';
import { useState } from 'react';
import EditProductForm from '../EditProductForm/EditProductForm';

function ProductList({ products, onEditProduct }: ProductListProps) {
    const [editingProduct, setEditingProduct] = useState<ProductProps | null>(null);
    const handleEditProduct = (product: ProductProps) => {
        setEditingProduct(product);
    };
    function handleSaveProduct(updatedProduct: ProductProps) {
        setEditingProduct(null);
        onEditProduct(updatedProduct);
    }
    const listProducts = products.map((product, index) => {
        return <ProductItem key={index} product={product} onEditProduct={handleEditProduct} />;
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
