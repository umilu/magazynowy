import type { ProductItemProps } from '../../types/product';

function ProductItem({ product, onEditProduct }: ProductItemProps) {
    return (
        <div>
            <p>
                {product.name} - {product.quantity} szt.
            </p>
            <button type="button" onClick={() => onEditProduct(product)}>
                Edytuj
            </button>
        </div>
    );
}

export default ProductItem;
