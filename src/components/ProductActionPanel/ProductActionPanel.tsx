import type { ProductActionPanelProps } from '../../types/product';
import ProductActionsForm from '../ProductActionsForm/ProductActionsForm';
import './ProductActionPanel.css';

function ProductActionPanel({
    onActionCancel,
    onDelete,
    onSubmit,
    actionState,
    selectedProduct,
}: ProductActionPanelProps) {
    return (
        <div className="actions-panel">
            <div className="panel-header">
                <h3>
                    {actionState === 'add'
                        ? 'Dodaj produkt'
                        : actionState === 'edit'
                          ? 'Edytuj produkt'
                          : 'Usuń produkt'}
                </h3>
                <button
                    className="panel-close-button"
                    type="button"
                    onClick={onActionCancel}
                    aria-label="Zamknij formularz"
                >
                    X
                </button>
            </div>
            {actionState === 'delete' ? (
                <>
                    <p>Czy chcesz usunąć {selectedProduct && selectedProduct.name}?</p>
                    <button type="button" onClick={onDelete}>
                        Tak
                    </button>
                    <button type="button" onClick={onActionCancel}>
                        Nie
                    </button>
                </>
            ) : (
                <ProductActionsForm
                    selectedProduct={selectedProduct}
                    onSubmit={onSubmit}
                    buttonText={
                        actionState === 'add'
                            ? 'Dodaj'
                            : actionState === 'edit'
                              ? 'Zapisz'
                              : undefined
                    }
                />
            )}
        </div>
    );
}
export default ProductActionPanel;
