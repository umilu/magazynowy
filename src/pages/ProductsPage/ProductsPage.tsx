import { useState } from 'react';
import type { ProductProps } from '../../types/product';
import ProductList from '../../components/ProductList/ProductList';
import ActionsModal from '../../components/ActionsModal/ActionsModal';
import SearchProductForm from '../../components/SearchProductForm/SearchProductForm';

function ProductsPage() {
    const [products, setProducts] = useState<ProductProps[]>([
        { name: 'Laptop', quantity: 10 },
        { name: 'Mysz', quantity: 25 },
        { name: 'Klawiatura', quantity: 15 },
    ]);

    const [selectedProduct, setSelectedProduct] = useState<ProductProps | null>(null);
    const [actionState, setActionState] = useState<'add' | 'edit' | 'delete' | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    function normalizeProductName(name: string) {
        return name.trim().toLowerCase();
    }

    function handleAddProduct(addedProduct: ProductProps) {
        if (addedProduct.name === '') {
            return;
        }
        if (addedProduct.quantity <= 0 || Number.isNaN(addedProduct.quantity)) {
            return;
        }
        if (
            products.some(
                (p) => normalizeProductName(p.name) === normalizeProductName(addedProduct.name),
            )
        ) {
            return;
        }
        const newProduct = {
            name: addedProduct.name,
            quantity: addedProduct.quantity,
        };
        setProducts((prevState) => prevState.concat(newProduct));
        setSelectedProduct(null);
        setActionState(null);
    }

    function handleSelectProductForEdit(product: ProductProps) {
        setActionState('edit');
        setSelectedProduct(product);
    }

    function handleUpdateProduct(updatedProduct: ProductProps) {
        if (
            products.some(
                (p) => normalizeProductName(p.name) === normalizeProductName(updatedProduct.name),
            )
        ) {
            return;
        }
        selectedProduct &&
            setProducts((prevProducts) =>
                prevProducts.map((p) =>
                    p.name.toLowerCase() === selectedProduct.name.toLowerCase()
                        ? updatedProduct
                        : p,
                ),
            );
        setSelectedProduct(null);
        setActionState(null);
    }

    function handleSelectProductForDelete(product: ProductProps) {
        setActionState('delete');
        setSelectedProduct(product);
    }

    function handleDeleteProduct() {
        selectedProduct &&
            setProducts((prevProducts) =>
                prevProducts.filter(
                    (p) => p.name.toLowerCase() !== selectedProduct.name.toLowerCase(),
                ),
            );
        setSelectedProduct(null);
        setActionState(null);
    }

    function handleActionCancel() {
        setSelectedProduct(null);
        setActionState(null);
    }

    const filteredProducts = products.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    const sortedProducts = [...filteredProducts].sort((a, b) =>
        sortOrder === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name),
    );

    return (
        <main>
            <div className="products-controls">
                <SearchProductForm
                    searchTerm={searchTerm}
                    sortOrder={sortOrder}
                    setSortOrder={setSortOrder}
                    setSearchTerm={setSearchTerm}
                />
                <button type="button" onClick={() => setActionState('add')}>
                    Dodaj produkt
                </button>
            </div>
            <ProductList
                onSelectProductForEdit={handleSelectProductForEdit}
                products={sortedProducts}
                allProducts={products}
                onSelectProductForDelete={handleSelectProductForDelete}
            />
            {actionState && (
                <ActionsModal
                    selectedProduct={selectedProduct}
                    onDelete={handleDeleteProduct}
                    onSubmit={
                        actionState === 'edit'
                            ? handleUpdateProduct
                            : actionState === 'add'
                              ? handleAddProduct
                              : handleDeleteProduct
                    }
                    actionState={actionState}
                    onActionCancel={handleActionCancel}
                />
            )}
        </main>
    );
}

export default ProductsPage;
