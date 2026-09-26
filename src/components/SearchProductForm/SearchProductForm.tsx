import type { SearchProductFormProps } from '../../types/product';

function SearchProductForm({
    searchTerm,
    setSearchTerm,
    sortOrder,
    setSortOrder,
}: SearchProductFormProps) {
    return (
        <form>
            <label htmlFor="productSearch">Szukaj produktu:</label>
            <input
                type="search"
                id="productSearch"
                placeholder="Szukaj produktu..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            <button
                type="button"
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            >
                Sortuj {sortOrder === 'asc' ? 'malejąco' : 'rosnąco'}
            </button>
        </form>
    );
}

export default SearchProductForm;
