import { useState } from 'react';
import type { Product } from '../../types/product';
import ProductList from '../../components/ProductList/ProductList';
import ProductActionPanel from '../../components/ProductActionPanel/ProductActionPanel';
import SearchProductForm from '../../components/SearchProductForm/SearchProductForm';
import './ProductsPage.css';

function ProductsPage() {
    const [products, setProducts] = useState<Product[]>([
        { name: 'Laptop', quantity: 10 },
        { name: 'Mysz', quantity: 25 },
        { name: 'Klawiatura', quantity: 15 },
    ]);

    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [actionState, setActionState] = useState<'add' | 'edit' | 'delete' | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    function normalizeProductName(name: string) {
        return name.trim().toLowerCase();
    }

    function handleOpenAddPanel() {
        setActionState('add');
        setSelectedProduct(null);
    }

    function handleAddProduct(addedProduct: Product) {
        if (normalizeProductName(addedProduct.name) === '') {
            return;
        }
        if (addedProduct.quantity < 0 || Number.isNaN(addedProduct.quantity)) {
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

    function handleSelectProductForEdit(product: Product) {
        setActionState('edit');
        setSelectedProduct(product);
    }

    function handleUpdateProduct(updatedProduct: Product) {
        if (!selectedProduct) {
            return;
        }
        if (normalizeProductName(updatedProduct.name) === '') {
            return;
        }
        if (updatedProduct.quantity < 0 || Number.isNaN(updatedProduct.quantity)) {
            return;
        }
        if (
            products.some(
                (p) => normalizeProductName(p.name) === normalizeProductName(updatedProduct.name),
            ) &&
            normalizeProductName(selectedProduct.name) !== normalizeProductName(updatedProduct.name)
        ) {
            return;
        }
        setProducts((prevProducts) =>
            prevProducts.map((p) =>
                normalizeProductName(p.name) === normalizeProductName(selectedProduct.name)
                    ? updatedProduct
                    : p,
            ),
        );
        setSelectedProduct(null);
        setActionState(null);
    }

    function handleSelectProductForDelete(product: Product) {
        setActionState('delete');
        setSelectedProduct(product);
    }

    function handleDeleteProduct() {
        if (selectedProduct) {
            setProducts((prevProducts) =>
                prevProducts.filter(
                    (p) =>
                        normalizeProductName(p.name) !== normalizeProductName(selectedProduct.name),
                ),
            );
        }
        setSelectedProduct(null);
        setActionState(null);
    }

    function handleActionCancel() {
        setSelectedProduct(null);
        setActionState(null);
    }

    const filteredProducts = products.filter((p) =>
        normalizeProductName(p.name).includes(normalizeProductName(searchTerm)),
    );

    const sortedProducts = [...filteredProducts].sort((a, b) =>
        sortOrder === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name),
    );

    return (
        <main>
            <section className="products-intro">
                <h2>Produkty</h2>
                <p>Zarządzaj swoim magazynem - dodawaj, edytuj, usuwaj swoje produkty.</p>
            </section>
            <div className="products-controls">
                <SearchProductForm searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                <button
                    className="white-button"
                    type="button"
                    onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                >
                    Sortuj {sortOrder === 'asc' ? 'malejąco' : 'rosnąco'}
                </button>
                <button
                    className="blue-button add-product-button"
                    type="button"
                    onClick={handleOpenAddPanel}
                >
                    + Dodaj produkt
                </button>
            </div>
            <ProductList
                onSelectProductForEdit={handleSelectProductForEdit}
                products={sortedProducts}
                allProducts={products}
                onSelectProductForDelete={handleSelectProductForDelete}
            />
            {actionState && (
                <ProductActionPanel
                    selectedProduct={selectedProduct}
                    onDelete={handleDeleteProduct}
                    onSubmit={(product) => {
                        if (actionState === 'edit') {
                            handleUpdateProduct(product);
                        } else if (actionState === 'add') {
                            handleAddProduct(product);
                        }
                    }}
                    actionState={actionState}
                    onActionCancel={handleActionCancel}
                />
            )}
        </main>
    );
}

export default ProductsPage;
