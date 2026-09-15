import type { EditProductFormProps } from '../../types/product';
import { useState } from 'react';

function EditProductForm({ product, onSaveProduct }: EditProductFormProps) {
    const [productName, setProductName] = useState(product.name);
    const [quantity, setQuantity] = useState(String(product.quantity));

    function handleSave(event: React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault();
        const updatedProduct = { name: productName, quantity: Number(quantity) };
        onSaveProduct(updatedProduct);
    }

    return (
        <form onSubmit={handleSave}>
            <label htmlFor="productName">Nazwa produktu:</label>
            <input
                type="text"
                id="productName"
                value={productName}
                onChange={(event) => setProductName(event.target.value)}
            />
            <label htmlFor="quantity">Ilość:</label>
            <input type="number" id="quantity" value={quantity} onChange={(event) => setQuantity(event.target.value)} />
            <button type="submit">Zapisz produkt</button>
        </form>
    );
}

export default EditProductForm;
