import { useEffect, useRef, useState } from 'react';
import type { ProductActionsFormProps } from '../../types/product';
import './ProductActionsForm.css';

function ProductActionsForm({
    onSubmit,
    onActionCancel,
    buttonText,
    selectedProduct,
}: ProductActionsFormProps) {
    const [productName, setProductName] = useState(selectedProduct?.name ?? '');
    const [quantity, setQuantity] = useState(
        selectedProduct ? String(selectedProduct.quantity) : '',
    );

    const productNameInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        productNameInputRef.current?.focus();
    }, []);

    function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        const submittingProduct = {
            name: productName.trim(),
            quantity: quantity === '' ? NaN : Number(quantity),
        };
        onSubmit(submittingProduct);
    }

    return (
        <form className="product-actions-form" onSubmit={handleSubmit}>
            <div className="form-field">
                <label htmlFor="productName">Nazwa produktu:</label>
                <input
                    ref={productNameInputRef}
                    type="text"
                    id="productName"
                    value={productName}
                    onChange={(event) => setProductName(event.target.value)}
                />
            </div>
            <div className="form-field">
                <label htmlFor="quantity">Ilość:</label>
                <input
                    type="number"
                    id="quantity"
                    value={quantity}
                    onChange={(event) => setQuantity(event.target.value)}
                />
            </div>
            <div className="form-actions">
                <button className="white-button" type="button" onClick={onActionCancel}>
                    Anuluj
                </button>
                <button className="blue-button" type="submit">
                    {buttonText}
                </button>
            </div>
        </form>
    );
}

export default ProductActionsForm;
