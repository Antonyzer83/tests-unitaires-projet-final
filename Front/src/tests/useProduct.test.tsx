import { renderHook } from "@testing-library/react-hooks";
import { act } from "react-dom/test-utils";
import useProduct from '../hooks/useProduct';
import { setupServer } from "msw/node";
import { rest } from "msw";
import { fireEvent, getByTestId, render } from "@testing-library/react";
import Product from '../components/Product';

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

/**
 * HOOKS
 */

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

/**
 * COMPONENTS
 */

let container: any;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

test('loadComponent', () => {
  const { container } = render(<Product setRoute={() => { }} data={ newProduct } />);
  expect(container.querySelector('.back-btn')?.innerHTML).toBe('Retour');
  expect(container.querySelector('.product-name')?.innerHTML).toBe('Rick Sanchez');
  expect(container.querySelector('.product-quantity')?.innerHTML).toBe('2');
  expect(container.querySelector('.product-img')?.getAttribute('src')).toBe('https://rickandmortyapi.com/api/character/avatar/1.jpeg');
});

/*test('addProductSuccessComponent', () => {
  const { container } = render(<Product setRoute={() => { }} data={newProduct} />);
  container.querySelector('input[name="number"]')?.setAttribute('value', '2');
  fireEvent.click(container.querySelector('.submit-btn') || container.querySelectorAll('')[0]);
  expect(container.querySelector('.product-message')?.innerHTML).toBe('Enregistré dans le panier');
});*/
