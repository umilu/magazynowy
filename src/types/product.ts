export interface ProductProps {
    name: string;
    quantity: number;
}

export interface ProductItemProps {
    product: ProductProps;
    onSelectProductForEdit: (product: ProductProps) => void;
    onSelectProductForDelete: (product: ProductProps) => void;
}

export interface ProductListProps {
    products: ProductProps[];
    allProducts: ProductProps[];
    onSelectProductForEdit: (product: ProductProps) => void;
    onSelectProductForDelete: (product: ProductProps) => void;
}

export interface AddProductFormProps {
    onAddProduct: (product: ProductProps) => void;
}

export interface SearchProductFormProps {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    sortOrder: 'asc' | 'desc';
    setSortOrder: (sortOrder: 'asc' | 'desc') => void;
}

export interface ProductActionsFormProps {
    onSubmit: (product: ProductProps) => void;
    buttonText: 'Dodaj' | 'Zapisz' | undefined;
    selectedProduct: ProductProps | null;
    onActionCancel: () => void;
}

export interface ProductActionPanelProps {
    onSubmit: (product: ProductProps) => void;
    actionState: 'add' | 'edit' | 'delete' | null;
    selectedProduct: ProductProps | null;
    onDelete: () => void;
    onActionCancel: () => void;
}
