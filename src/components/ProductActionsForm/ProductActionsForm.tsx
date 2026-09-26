import { useEffect, useRef, useState } from 'react';
import type { ProductActionsFormProps } from '../../types/product';

function ProductActionsForm({ onSubmit, buttonText, selectedProduct }: ProductActionsFormProps) {
    const [productName, setProductName] = useState(selectedProduct ? selectedProduct.name : '');
    const [quantity, setQuantity] = useState(selectedProduct ? selectedProduct.quantity : '');

    const productNameInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        productNameInputRef.current?.focus();
    }, []);

    function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        const submittingProduct = {
            name: productName,
            quantity: Number(quantity),
        };
        onSubmit(submittingProduct);
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="productName">Nazwa produktu:</label>
            <input
                ref={productNameInputRef}
                type="text"
                id="productName"
                value={productName}
                onChange={(event) => setProductName(event.target.value)}
            />
            <label htmlFor="quantity">Ilość:</label>
            <input
                type="number"
                id="quantity"
                value={quantity}
                onChange={(event) => setQuantity(Number(event.target.value))}
            />
            <button type="submit">{buttonText}</button>
        </form>
    );
}

export default ProductActionsForm;
