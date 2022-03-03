import React, { useEffect, useState } from "react";
import { endpoint, Product } from "../App";

const Cart = ({ setRoute }: { setRoute: (data: any) => void }) => {
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
  return (
    <div>
      {loading && <div>Loading....</div>}
      {message && <p>{message}</p>}
      <div onClick={() => setRoute({ route: "home" })}>Retour</div>
      <div>
        {products.map((product) => {
          return (
            <React.Fragment>
              <div>
                <img src={product.image} alt="" />
                <p>Figurine de {product.name}</p>
                <p>Quantitée {product.quantity}</p>
              </div>
              <button onClick={() => removeToCart(product)}>
                Supprimer du panier
              </button>
              <hr />
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default Cart;
