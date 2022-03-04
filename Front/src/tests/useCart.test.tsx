import { renderHook } from "@testing-library/react-hooks";
import { act } from "react-dom/test-utils";
import useCart from '../hooks/useCart';
import { setupServer } from "msw/node";
import { rest } from "msw";

const newProduct = {
  id: 1,
  name: 'Rick Sanchez',
  price: '9,99',
  quantity: 2,
  image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg'
};

const server = setupServer(
  rest.get(
    "http://localhost:8000/api/cart",
    (req, res, ctx) => {
      return res(
        ctx.json({
          id: 1,
          products: [
            {
              id: 1,
              name: "Rick Sanchez",
              price: "9,99",
              quantity: 2,
              image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg"
            }
          ]
        })
      );
    }
  ),
  rest.delete(
    "http://localhost:8000/api/cart/1",
    (req, res, ctx) => {
      return res(
        ctx.json({
          id: 1,
          products: []
        })
      );
    }
  )
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('loadCart', async () => {
  const { result } = renderHook(() => useCart());
  const { loadCart, loading } = result.current;

  expect(loading).toEqual(true);

  await act(async () => {
    await loadCart();
  });
  
  const { products } = result.current;
  expect(products).toEqual([
    {
      id: 1,
      name: "Rick Sanchez",
      price: "9,99",
      quantity: 2,
      image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg"
    }
  ]);
});

test('removeToCart', async () => {
  const { result } = renderHook(() => useCart());
  const { removeToCart, loading } = result.current;

  expect(loading).toEqual(true);

  await act(async () => {
    await removeToCart(newProduct);
  });

  const { message } = result.current;
  expect(message).toEqual('Produit bien supprimé');
});
