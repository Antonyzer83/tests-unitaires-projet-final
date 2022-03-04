import React from "react";
import useHome from "../hooks/useHome";

const Home = ({ setRoute }: { setRoute: (data: any) => void }) => {
  const { loading, products } = useHome();

  return (
    <div>
      {loading && <div>Loading....</div>}
      <div className="cart-btn" onClick={() => setRoute({ route: "cart" })}>Aller sur panier</div>
      <div>
        {products.map((product) => {
          return (
            <React.Fragment>
              <div
                onClick={() => setRoute({ route: "product", data: product })}
              >
                <img className="product-img" src={product.image} alt="" />
                <p>Figurine de <span className="product-name">{product.name}</span></p>
                <p>Quantitée <span className="product-quantity">{product.quantity}</span></p>
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
