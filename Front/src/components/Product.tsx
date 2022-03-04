import useProduct from "../hooks/useProduct";

const Product = ({ setRoute, data: product }: any) => {
  const { quantity, message, loading, setQuantity, addProduct } = useProduct(product);

  return (
    <div>
      {loading && <div>Loading....</div>}
      {message && <p className="product-message">{message}</p>}
      <div className="back-btn" onClick={() => setRoute({ route: "home" })}>Retour</div>
      <div>
        <div>
          <img className="product-img" src={product.image} alt="" />
          <p>Figurine de <span className="product-name">{product.name}</span></p>
          <p>Quantitée <span className="product-quantity">{product.quantity}</span></p>
        </div>
      </div>
      <hr />
      <input
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
        placeholder="Quantité à ajouter"
      />
      <button className="submit-btn" onClick={addProduct}>Ajouter au panier</button>
    </div>
  );
};

export default Product;
