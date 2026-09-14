import type { ProductItemProps } from '../../types/product';

function ProductItem({ product }: ProductItemProps) {
    return (
        <div>
            <p>
                {product.name} - {product.quantity} szt.
            </p>
        </div>
    );
}

export default ProductItem;
