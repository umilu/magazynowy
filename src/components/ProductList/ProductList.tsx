import ProductItem from '../ProductItem/ProductItem';
import type { ProductListProps } from '../../types/product';

function ProductList({ products }: ProductListProps) {
    const listProducts = products.map((product, index) => {
        return <ProductItem key={index} product={product} />;
    });
    return <div>{listProducts}</div>;
}

export default ProductList;
