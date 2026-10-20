export interface Product {
    name: string;
    quantity: number;
}

export interface ProductItemProps {
    product: Product;
    onSelectProductForEdit: (product: Product) => void;
    onSelectProductForDelete: (product: Product) => void;
}

export interface ProductListProps {
    products: Product[];
    allProducts: Product[];
    onSelectProductForEdit: (product: Product) => void;
    onSelectProductForDelete: (product: Product) => void;
}

export interface SearchProductFormProps {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
}

export interface ProductActionsFormProps {
    onSubmit: (product: Product) => void;
    buttonText: 'Dodaj' | 'Zapisz';
    selectedProduct: Product | null;
    onActionCancel: () => void;
}

export interface ProductActionPanelProps {
    onSubmit: (product: Product) => void;
    actionState: 'add' | 'edit' | 'delete' | null;
    selectedProduct: Product | null;
    onDelete: () => void;
    onActionCancel: () => void;
}
