export interface ProductProps {
    name: string;
    quantity: number;
}

export interface ProductItemProps {
    product: ProductProps;
    onEditProduct: (product: ProductProps) => void;
    onDeleteProduct: (product: ProductProps) => void;
}

export interface ProductListProps {
    products: ProductProps[];
    onEditProduct: (product: ProductProps) => void;
    onDeleteProduct: (product: ProductProps) => void;
}

export interface AddProductFormProps {
    onAddProduct: (product: ProductProps) => void;
}

export interface EditProductFormProps {
    product: ProductProps;
    onSaveProduct: (product: ProductProps) => void;
}
