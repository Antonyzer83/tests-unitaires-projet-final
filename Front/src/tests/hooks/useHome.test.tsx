import { renderHook } from "@testing-library/react-hooks";
import { act } from "react-dom/test-utils";
import useHome from '../../hooks/useHome';
import { setupServer } from "msw/node";
import { rest } from "msw";

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
})