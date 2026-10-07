import { render, screen, within } from '@testing-library/react';
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

test('shows a message when searching for product that does not exist', async () => {
    render(<ProductsPage />);
    const user = userEvent.setup();

    await user.type(screen.getByRole('searchbox'), 'Monitor');

    expect(screen.getByText('Brak pasujących wyników')).toBeInTheDocument()
    expect(screen.queryByText('Brak produktów')).not.toBeInTheDocument()
});
