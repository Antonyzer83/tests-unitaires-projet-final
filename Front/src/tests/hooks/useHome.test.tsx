import { renderHook } from "@testing-library/react-hooks";
import { act } from "react-dom/test-utils";
import useHome from '../../hooks/useHome';

test('loadProducts', () => {
  const { result } = renderHook(() => useHome());
  const { loadProducts, loading, products } = result.current;
  act(() => {
    loadProducts();
  });

  expect(products).not.toEqual([]);
  expect(loading).toEqual(false);
})