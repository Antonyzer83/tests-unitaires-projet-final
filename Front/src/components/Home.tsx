import React, { useEffect, useState } from "react";
import { endpoint, Product } from "../App";

const Home = ({ setRoute }: { setRoute: (data: any) => void }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch(`${endpoint}/products`)
      .then((res) => res.json())
      .then((res) => {
        setLoading(false);
        setProducts(res);
      });
  }, []);

  return (
    <div>
      {loading && <div>Loading....</div>}
      <div onClick={() => setRoute({ route: "cart" })}>Aller sur panier</div>
      <div>
        {products.map((product) => {
          return (
            <React.Fragment>
              <div
                onClick={() => setRoute({ route: "product", data: product })}
              >
                <img src={product.image} alt="" />
                <p>Figurine de {product.name}</p>
                <p>Quantitée {product.quantity}</p>
              </div>
              <hr />
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
