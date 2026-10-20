import type { ProductItemProps } from '../../types/product';
import './ProductItem.css';

function ProductItem({
    product,
    onSelectProductForEdit,
    onSelectProductForDelete,
}: ProductItemProps) {
    const stockStatus =
        product.quantity <= 0
            ? 'Brak w magazynie'
            : product.quantity < 6
              ? 'Niski stan magazynowy'
              : 'Dostępny';

    return (
        <li className="product-item">
            <div className="product-info">
                <p>{product.name}</p>
                <span className="product-item-quantity">Ilość: {product.quantity}</span>
                <span
                    className={`product-item-stock ${
                        stockStatus === 'Brak w magazynie'
                            ? 'stock-empty'
                            : stockStatus === 'Niski stan magazynowy'
                              ? 'stock-low'
                              : 'stock-available'
                    }`}
                >
                    <span>{stockStatus}</span>
                </span>
            </div>
            <div className="product-actions">
                <button type="button" onClick={() => onSelectProductForEdit(product)}>
                    Edytuj
                </button>
                <button type="button" onClick={() => onSelectProductForDelete(product)}>
                    Usuń
                </button>
            </div>
        </li>
    );
}

export default ProductItem;
