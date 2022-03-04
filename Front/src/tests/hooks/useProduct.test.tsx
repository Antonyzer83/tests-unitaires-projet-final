import { renderHook } from "@testing-library/react-hooks";
import { act } from "react-dom/test-utils";
import useProduct from '../../hooks/useProduct';
import { setupServer } from "msw/node";
import { rest } from "msw";

let error = false;

const server = setupServer(
  rest.post(
    "http://localhost:8000/api/cart/1",
    (req, res, ctx) => {
      if (error) {
        return res(
          ctx.json({
            error: 'Trop de quantité'
          })
        );
      } else {
        error = true;
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
    }
  )
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const newProduct = {
  id: 1,
  name: 'Rick Sanchez',
  price: '9,99',
  quantity: 2,
  image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg'
};

test('addProductSuccess', async () => {
  const { result } = renderHook(() => useProduct(newProduct));
  const { addProduct, setQuantity } = result.current;
  await act(async () => {
    setQuantity(1);
    await addProduct();
  });

  const { message, loading } = result.current;

  expect(message).toEqual('Enregistré dans le panier');
  expect(loading).toEqual(false);
});

test('addProductFailWithTooManyQuantity', async () => {
  const { result } = renderHook(() => useProduct(newProduct));
  const { addProduct, setQuantity } = result.current;
  await act(async () => {
    setQuantity(100);
    await addProduct();
  });

  const { message, loading } = result.current;
  
  expect(message).toEqual('Trop de quantité');
  expect(loading).toEqual(false);
});
