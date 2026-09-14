export interface ProductProps {
    name: string;
    quantity: number;
}

export interface ProductItemProps {
    product: ProductProps;
}

export interface ProductListProps {
    products: ProductProps[];
}

export interface AddProductFormProps {
    onAddProduct: (product: ProductProps) => void;
}
