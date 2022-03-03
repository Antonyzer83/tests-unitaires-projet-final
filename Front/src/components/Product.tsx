import { useState } from "react";
import { endpoint } from "../App";

const Product = ({ setRoute, data: product }: any) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const addProduct = () => {
    setLoading(true);
    fetch(`${endpoint}/cart/${product.id}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ quantity }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          setMessage("Trop de quantité");
        } else {
          setMessage("Enregistré dans le panier");
        }
        setLoading(false);
      });
  };

  return (
    <div>
      {loading && <div>Loading....</div>}
      {message && <p>{message}</p>}
      <div onClick={() => setRoute({ route: "home" })}>Retour</div>
      <div>
        <div>
          <img src={product.image} alt="" />
          <p>Figurine de {product.name}</p>
          <p>Quantitée {product.quantity}</p>
        </div>
      </div>
      <hr />
      <input
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
        placeholder="Quantité à ajouter"
      />
      <button onClick={addProduct}>Ajouter au panier</button>
    </div>
  );
};

export default Product;
