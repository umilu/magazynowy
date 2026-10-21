import ProductItem from '../ProductItem/ProductItem';
import type { ProductListProps } from '../../types/product';
import './ProductList.css';

function ProductList({
    products,
    allProducts,
    onSelectProductForEdit,
    onSelectProductForDelete,
}: ProductListProps) {
    const listProducts = products.map((product) => {
        return (
            <ProductItem
                key={product.name}
                product={product}
                onSelectProductForEdit={onSelectProductForEdit}
                onSelectProductForDelete={onSelectProductForDelete}
            />
        );
    });

    return products.length > 0 ? (
        <ul className="product-list">{listProducts}</ul>
    ) : allProducts.length === 0 ? (
        <p>Brak produktów</p>
    ) : (
        <p>Brak pasujących wyników</p>
    );
}

export default ProductList;
