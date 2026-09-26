import type { ActionsModalProps } from '../../types/product';
import ProductActionsForm from '../ProductActionsForm/ProductActionsForm';

function ActionsModal({
    onActionCancel,
    onDelete,
    onSubmit,
    actionState,
    selectedProduct,
}: ActionsModalProps) {
    return (
        <div>
            <button type="button" onClick={onActionCancel} aria-label="Zamknij">
                X
            </button>
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
                            ? 'dodaj produkt'
                            : actionState === 'edit'
                              ? 'zapisz produkt'
                              : undefined
                    }
                />
            )}
        </div>
    );
}
export default ActionsModal;
