import { fireEvent, render, screen, within } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { test, expect } from 'vitest';
import ProductsPage from './ProductsPage';

test('displays initial products', () => {
    render(<ProductsPage />);

    expect(screen.getByText('Laptop')).toBeInTheDocument();
    expect(screen.getByText('Mysz')).toBeInTheDocument();
    expect(screen.getByText('Klawiatura')).toBeInTheDocument();
});

test('shows only products matching the search phrase', async () => {
    render(<ProductsPage />);
    const user = userEvent.setup();

    await user.type(screen.getByRole('searchbox'), 'mys');

    expect(screen.getByText('Mysz')).toBeInTheDocument();
    expect(screen.queryByText('Laptop')).not.toBeInTheDocument();
    expect(screen.queryByText('Klawiatura')).not.toBeInTheDocument();
});

test('adds a new product', async () => {
    render(<ProductsPage />);
    const user = userEvent.setup();

    await user.click(screen.getByRole('button', { name: '+ Dodaj produkt' }));
    await user.type(screen.getByLabelText('Nazwa produktu:'), 'Monitor');
    await user.type(screen.getByLabelText('Ilość:'), '11');
    await user.click(screen.getByRole('button', { name: 'Dodaj' }));

    expect(screen.getByText('Monitor')).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Dodaj produkt' })).not.toBeInTheDocument();
});

test('does not add a product with an existing name, regardless of letter case', async () => {
    render(<ProductsPage />);
    const user = userEvent.setup();

    await user.click(screen.getByRole('button', { name: '+ Dodaj produkt' }));
    await user.type(screen.getByLabelText('Nazwa produktu:'), 'laptop');
    await user.type(screen.getByLabelText('Ilość:'), '11');
    await user.click(screen.getByRole('button', { name: 'Dodaj' }));

    expect(screen.getAllByText(/^laptop$/i)).toHaveLength(1);
    expect(screen.getByRole('heading', { name: 'Dodaj produkt' })).toBeInTheDocument();
});

test('closes the panel and deletes the product after confirmation', async () => {
    render(<ProductsPage />);
    const user = userEvent.setup();

    const laptopRow = screen.getByText('Laptop').closest('.product-item') as HTMLElement;
    await user.click(within(laptopRow).getByRole('button', { name: 'Usuń' }));
    await user.click(screen.getByRole('button', { name: 'Tak' }));

    expect(screen.queryByRole('heading', { name: 'Usuń produkt' })).not.toBeInTheDocument();
    expect(screen.queryByText('Laptop')).not.toBeInTheDocument();
    expect(screen.getByText('Mysz')).toBeInTheDocument();
    expect(screen.getByText('Klawiatura')).toBeInTheDocument();
});

test('keeps the product when deletion is cancelled', async () => {
    render(<ProductsPage />);
    const user = userEvent.setup();

    const laptopRow = screen.getByText('Laptop').closest('.product-item') as HTMLElement;
    await user.click(within(laptopRow).getByRole('button', { name: 'Usuń' }));
    await user.click(screen.getByRole('button', { name: 'Nie' }));

    expect(screen.queryByRole('heading', { name: 'Usuń produkt' })).not.toBeInTheDocument();
    expect(screen.getByText('Laptop')).toBeInTheDocument();
});

test('changes sort order of the products list', async () => {
    render(<ProductsPage />);
    const user = userEvent.setup();

    const products = screen.getAllByText(/^(Laptop|Mysz|Klawiatura)$/);
    const productsNamesBefore = products.map((el) => el.textContent);
    await user.click(screen.getByRole('button', { name: 'Sortuj malejąco' }));
    const productsAfter = screen.getAllByText(/^(Laptop|Mysz|Klawiatura)$/);
    const productsNamesAfter = productsAfter.map((el) => el.textContent);

    expect(productsNamesBefore).toEqual(['Klawiatura', 'Laptop', 'Mysz']);
    expect(productsNamesAfter).toEqual(['Mysz', 'Laptop', 'Klawiatura']);
});

test('shows an empty state message when all products are deleted', async () => {
    render(<ProductsPage />);
    const user = userEvent.setup();

    for (const name of ['Laptop', 'Mysz', 'Klawiatura']) {
        const row = screen.getByText(name).closest('.product-item') as HTMLElement;
        await user.click(within(row).getByRole('button', { name: 'Usuń' }));
        await user.click(screen.getByRole('button', { name: 'Tak' }));
    }

    expect(screen.getByText('Brak produktów')).toBeInTheDocument();
    expect(screen.queryByText('Brak pasujących wyników')).not.toBeInTheDocument();
});

test('shows a message when searching for a product that does not exist', async () => {
    render(<ProductsPage />);
    const user = userEvent.setup();

    await user.type(screen.getByRole('searchbox'), 'Monitor');

    expect(screen.getByText('Brak pasujących wyników')).toBeInTheDocument();
    expect(screen.queryByText('Brak produktów')).not.toBeInTheDocument();
});

test.each([
    { reason: 'an empty name', name: '', quantity: '5' },
    { reason: 'an empty quantity', name: 'Monitor', quantity: '' },
    { reason: 'a negative quantity', name: 'Monitor', quantity: '-1' },
])('does not add a product with $reason', async ({ name, quantity }) => {
    render(<ProductsPage />);
    const user = userEvent.setup();

    await user.click(screen.getByRole('button', { name: '+ Dodaj produkt' }));
    if (quantity) await user.type(screen.getByLabelText('Ilość:'), quantity);
    if (name) await user.type(screen.getByLabelText('Nazwa produktu:'), name);
    await user.click(screen.getByRole('button', { name: 'Dodaj' }));

    expect(screen.getAllByRole('button', { name: 'Edytuj' })).toHaveLength(3);
    expect(screen.getByRole('heading', { name: 'Dodaj produkt' })).toBeInTheDocument();
});

test('edits a product quantity using a prefilled form', async () => {
    render(<ProductsPage />);
    const user = userEvent.setup();

    const laptopRow = screen.getByText('Laptop').closest('.product-item') as HTMLElement;
    await user.click(within(laptopRow).getByRole('button', { name: 'Edytuj' }));

    expect(screen.getByLabelText('Nazwa produktu:')).toHaveValue('Laptop');
    expect(screen.getByLabelText('Ilość:')).toHaveValue(10);

    await user.clear(screen.getByLabelText('Ilość:'));
    await user.type(screen.getByLabelText('Ilość:'), '11');
    await user.click(screen.getByRole('button', { name: 'Zapisz' }));

    const updatedRow = screen.getByText('Laptop').closest('.product-item') as HTMLElement;
    expect(within(updatedRow).getByText('Ilość: 11')).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Edytuj produkt' })).not.toBeInTheDocument();
});

test.each([
    { reason: 'out of stock', status: 'Brak w magazynie', name: 'Wentylator', quantity: '0' },
    { reason: 'low stock', status: 'Niski stan magazynowy', name: 'Kamera', quantity: '1' },
    { reason: 'low stock', status: 'Niski stan magazynowy', name: 'Płyta główna', quantity: '5' },
    { reason: 'available', status: 'Dostępny', name: 'Touchpad', quantity: '6' },
])(
    'shows a $reason status for a product with a $quantity quantity',
    async ({ status, name, quantity }) => {
        render(<ProductsPage />);
        const user = userEvent.setup();

        await user.click(screen.getByRole('button', { name: '+ Dodaj produkt' }));
        await user.type(screen.getByLabelText('Nazwa produktu:'), name);
        await user.type(screen.getByLabelText('Ilość:'), quantity);
        await user.click(screen.getByRole('button', { name: 'Dodaj' }));

        const productRow = screen.getByText(name).closest('.product-item') as HTMLElement;
        expect(within(productRow).getByText(status)).toBeInTheDocument();
    },
);

test('closes the add product panel without adding a product', async () => {
    render(<ProductsPage />);
    const user = userEvent.setup();

    await user.click(screen.getByRole('button', { name: '+ Dodaj produkt' }));
    await user.type(screen.getByLabelText('Nazwa produktu:'), 'Monitor');
    await user.type(screen.getByLabelText('Ilość:'), '9');
    await user.click(screen.getByRole('button', { name: 'Zamknij formularz' }));

    expect(screen.queryByText('Monitor')).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Dodaj produkt' })).not.toBeInTheDocument();
});

test('updates the edit form when another product is selected for editing', async () => {
    render(<ProductsPage />);
    const user = userEvent.setup();

    const laptopRow = screen.getByText('Laptop').closest('.product-item') as HTMLElement;
    await user.click(within(laptopRow).getByRole('button', { name: 'Edytuj' }));

    expect(screen.getByLabelText('Nazwa produktu:')).toHaveValue('Laptop');
    expect(screen.getByLabelText('Ilość:')).toHaveValue(10);

    const mouseRow = screen.getByText('Mysz').closest('.product-item') as HTMLElement;
    await user.click(within(mouseRow).getByRole('button', { name: 'Edytuj' }));

    expect(screen.getByLabelText('Nazwa produktu:')).toHaveValue('Mysz');
    expect(screen.getByLabelText('Ilość:')).toHaveValue(25);
});

test('clears the form when adding a product during editing', async () => {
    render(<ProductsPage />);
    const user = userEvent.setup();

    const laptopRow = screen.getByText('Laptop').closest('.product-item') as HTMLElement;
    await user.click(within(laptopRow).getByRole('button', { name: 'Edytuj' }));

    expect(screen.getByLabelText('Nazwa produktu:')).toHaveValue('Laptop');
    expect(screen.getByLabelText('Ilość:')).toHaveValue(10);

    await user.click(screen.getByRole('button', { name: '+ Dodaj produkt' }));

    expect(screen.getByLabelText('Nazwa produktu:')).toHaveValue('');
    expect(screen.getByLabelText('Ilość:')).toHaveValue(null);
});

test('close the panel when cancel is clicked', async () => {
    render(<ProductsPage />);
    const user = userEvent.setup();

    await user.click(screen.getByRole('button', { name: '+ Dodaj produkt' }));
    await user.type(screen.getByLabelText('Nazwa produktu:'), 'Monitor');
    await user.type(screen.getByLabelText('Ilość:'), '9');
    await user.click(screen.getByRole('button', { name: 'Anuluj' }));

    expect(screen.queryByText('Monitor')).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Dodaj produkt' })).not.toBeInTheDocument();
});

test.each([
    { reason: 'an empty name', name: '', quantity: '10' },
    { reason: 'an empty quantity', name: 'Laptop', quantity: '' },
    { reason: 'a negative quantity', name: 'Laptop', quantity: '-5' },
])('does not save an edited product with $reason', async ({ name, quantity }) => {
    render(<ProductsPage />);
    const user = userEvent.setup();

    const laptopRow = screen.getByText('Laptop').closest('.product-item') as HTMLElement;
    await user.click(within(laptopRow).getByRole('button', { name: 'Edytuj' }));
    await user.clear(screen.getByLabelText('Nazwa produktu:'));
    await user.clear(screen.getByLabelText('Ilość:'));
    if (name) await user.type(screen.getByLabelText('Nazwa produktu:'), name);
    if (quantity) await user.type(screen.getByLabelText('Ilość:'), quantity);
    await user.click(screen.getByRole('button', { name: 'Zapisz' }));

    const unchangedRow = screen.getByText('Laptop').closest('.product-item') as HTMLElement;
    expect(within(unchangedRow).getByText('Ilość: 10')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Edytuj produkt' })).toBeInTheDocument();
});

test('does not reload the page when the search form is submitted', () => {
    render(<ProductsPage />);

    const searchForm = screen.getByRole('searchbox').closest('form') as HTMLElement;

    expect(fireEvent.submit(searchForm)).toBe(false);
});
