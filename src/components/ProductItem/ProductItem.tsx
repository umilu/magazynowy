import type { ProductItemProps } from '../../types/product';
import './ProductItem.css';

function ProductItem({ product, onEditProduct, onDeleteProduct }: ProductItemProps) {
    const stockStatus =
        product.quantity <= 0
            ? 'Brak w magazynie'
            : product.quantity < 6
              ? 'Niski stan magazynowy'
              : 'Dostępny';

    return (
        <div className="product-item">
            <p>
                {product.name} - {product.quantity} szt.{' '}
                <span
                    className={
                        stockStatus === 'Brak w magazynie'
                            ? 'stock-empty'
                            : stockStatus === 'Niski stan magazynowy'
                              ? 'stock-low'
                              : 'stock-available'
                    }
                >
                    {stockStatus}
                </span>
            </p>
            <div className="product-actions">
                <button type="button" onClick={() => onEditProduct(product)}>
                    Edytuj
                </button>
                <button type="button" onClick={() => onDeleteProduct(product)}>
                    Usuń
                </button>
            </div>
        </div>
    );
}

export default ProductItem;
