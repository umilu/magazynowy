import { useState } from 'react';
import type { AddProductFormProps } from '../../types/product';

function AddProductForm({ onAddProduct }: AddProductFormProps) {
    const [productName, setProductName] = useState('');
    const [quantity, setQuantity] = useState('');
    function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault();
        const quantityNumber = parseInt(quantity);
        if (productName === '') {
            return;
        }
        if (quantityNumber <= 0 || Number.isNaN(quantityNumber)) {
            return;
        }
        const newProduct = {
            name: productName,
            quantity: quantityNumber,
        };
        onAddProduct(newProduct);
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="productName">Nazwa produktu:</label>
            <input
                type="text"
                id="productName"
                value={productName}
                onChange={(event) => setProductName(event.target.value)}
            />
            <label htmlFor="quantity">Ilość:</label>
            <input type="number" id="quantity" value={quantity} onChange={(event) => setQuantity(event.target.value)} />
            <button type="submit">Dodaj produkt</button>
        </form>
    );
}

export default AddProductForm;
