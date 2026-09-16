import type { ProductItemProps } from '../../types/product';

function ProductItem({ product, onEditProduct, onDeleteProduct }: ProductItemProps) {
    return (
        <div>
            <p>
                {product.name} - {product.quantity} szt.
            </p>
            <button type="button" onClick={() => onEditProduct(product)}>
                Edytuj
            </button>
            <button type="button" onClick={() => onDeleteProduct(product)}>
                Usuń
            </button>
        </div>
    );
}

export default ProductItem;
