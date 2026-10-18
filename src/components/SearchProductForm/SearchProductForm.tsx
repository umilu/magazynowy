import type { SearchProductFormProps } from '../../types/product';
import './SearchProductForm.css';

function SearchProductForm({
    searchTerm,
    setSearchTerm,
    sortOrder,
    setSortOrder,
}: SearchProductFormProps) {
    return (
        <form className="search-product-form" onSubmit={(e) => e.preventDefault()}>
            <label className="visually-hidden" htmlFor="productSearch">
                Szukaj produktu:
            </label>
            <div className="search-input-wrapper">
                <svg className="search-icon" viewBox="0 0 24 24" aria-hidden="true">
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.3-4.3" />
                </svg>

                <input
                    type="search"
                    id="productSearch"
                    placeholder="Szukaj produktu..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <button
                className="white-button"
                type="button"
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            >
                Sortuj {sortOrder === 'asc' ? 'malejąco' : 'rosnąco'}
            </button>
        </form>
    );
}

export default SearchProductForm;
