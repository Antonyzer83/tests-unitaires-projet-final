import { renderHook } from "@testing-library/react-hooks";
import { act } from "react-dom/test-utils";
import useHome from '../../hooks/useHome';
import { setupServer } from "msw/node";
import { rest } from "msw";
import { render } from "@testing-library/react";
import Home from '../../components/Home';

const server = setupServer(
  rest.get(
    "http://localhost:8000/api/products",
    (req, res, ctx) => {
      return res(
        ctx.json([
          {
            id: 1,
            name: "Rick Sanchez",
            price: "9,99",
            quantity: 2,
            image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg"
          }
        ])
      );
    }
  )
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

/**
 * HOOKS
 */

test('loadProducts', async () => {
  const { result } = renderHook(() => useHome());
  const { loadProducts } = result.current;
  await act(async () => {
    await loadProducts();
  });

  const { loading, products } = result.current;

  expect(products).toEqual([
    {
      id: 1,
      name: "Rick Sanchez",
      price: "9,99",
      quantity: 2,
      image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg"
    }
  ]);
  expect(loading).toEqual(false);
});

/**
 * COMPONENTS
 */

let container: any;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

test('loadProductsComponent', () => {
  const { container } = render(<Home setRoute={() => { }} />);
  expect(container.querySelector('.cart-btn')?.innerHTML).toBe('Aller sur panier');
  // expect(container.querySelector('.product-name')?.innerHTML).toBe('Rick Sanchez');
  // expect(container.querySelector('.product-quantity')?.innerHTML).toBe('2');
  // expect(container.querySelector('.product-img')?.getAttribute('src')).toBe('https://rickandmortyapi.com/api/character/avatar/1.jpeg');
});
