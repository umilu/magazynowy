import ProductItem from '../ProductItem/ProductItem';
import type { ProductListProps } from '../../types/product';
import './ProductList.css';

function ProductList({
    products,
    allProducts,
    onSelectProductForEdit,
    onSelectProductForDelete,
}: ProductListProps) {
    const listProducts = products.map((product, index) => {
        return (
            <ProductItem
                key={index}
                product={product}
                onSelectProductForEdit={onSelectProductForEdit}
                onSelectProductForDelete={onSelectProductForDelete}
            />
        );
    });

    return (
        <div className="product-list">
            {products.length > 0 ? (
                listProducts
            ) : allProducts.length === 0 ? (
                <p>Brak produktów</p>
            ) : (
                <p>Brak pasujących wyników</p>
            )}
        </div>
    );
}

export default ProductList;
