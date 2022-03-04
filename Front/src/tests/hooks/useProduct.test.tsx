import { renderHook } from "@testing-library/react-hooks";
import { act } from "react-dom/test-utils";
import useProduct from '../../hooks/useProduct';

const newProduct = {
  id: 1,
  name: 'Rick Sanchez',
  price: '9,99',
  quantity: 2,
  image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg'
};

test('addProductSuccess', () => {
  const { result } = renderHook(() => useProduct(newProduct));
  const { addProduct, setQuantity, message, loading } = result.current;
  act(() => {
    setQuantity(1);
    addProduct();
  });

  expect(message).toEqual('Enregistré dans le panier');
  expect(loading).toEqual(false);
});

test('addProductFailWithTooManyQuantity', () => {
  const { result } = renderHook(() => useProduct(newProduct));
  const { addProduct, setQuantity, message, loading } = result.current;
  act(() => {
    setQuantity(3);
    addProduct();
  });
  
  expect(message).toEqual('Trop de quantité');
  expect(loading).toEqual(false);
});
