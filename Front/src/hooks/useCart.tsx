import React, { useEffect, useState } from "react";
import { endpoint, Product } from "../App";

const useCart = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [message, setMessage] = useState<string | null>(null);

  const loadCart = () => {
    fetch(`${endpoint}/cart`)
      .then((res) => res.json())
      .then((res) => {
        setLoading(false);
        setProducts(res.products);
      });
  };

  useEffect(() => {
    loadCart();
  }, []);

  const removeToCart = (product: Product) => {
    setLoading(true);
    fetch(`${endpoint}/cart/${product.id}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((res) => {
        setMessage("Produit bien supprimé");
        loadCart();
      });
  };

  return {
    loading,
    products,
    message,
    loadCart,
    removeToCart,
  };
};

export default useCart;