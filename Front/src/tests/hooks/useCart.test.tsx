import { renderHook } from "@testing-library/react-hooks";
import { act } from "react-dom/test-utils";
import useCart from '../../hooks/useCart';

const newProduct = {
  id: 1,
  name: 'Rick Sanchez',
  price: '9,99',
  quantity: 2,
  image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg'
};

test('loadCart', () => {
  const { result } = renderHook(() => useCart());
  const { loadCart, products, loading } = result.current;
  act(() => {
    loadCart();
  });
  
  expect(products).not.toEqual([]);
  expect(loading).toEqual(false);
});

test('removeToCart', () => {
  const { result } = renderHook(() => useCart());
  const { removeToCart, message } = result.current;
  act(() => {
    removeToCart(newProduct);
  });

  expect(message).toEqual('Produit bien supprimé');
});
