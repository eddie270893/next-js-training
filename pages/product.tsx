import React from "react";
import Cart from "../components/Cart/Cart";
import httpClient from "../helper/httpClient";
import { useSelector, useDispatch } from "react-redux";
import { addProduct } from "../store/reducers/cart";

const Product = (props: any) => {
  const products = props.data.data;
  const dispatch = useDispatch();

  const handleAddToCart = (productId: string, title: string, price: number) => {
    dispatch(
      addProduct({
        productId,
        title,
        price,
      })
    );
  };
  return (
    <div>
      {products && products.length > 0 && (
        <>
          {products.map((product: any) => {
            return (
              <div className="mb-2" key={product.productId}>
                <span>{product.title}: </span>
                <span>${product.price}</span>
                <button
                  onClick={() =>
                    handleAddToCart(
                      product.productId,
                      product.title,
                      product.price
                    )
                  }
                  className="p-1 bg-slate-300"
                >
                  Add to Cart
                </button>
              </div>
            );
          })}
        </>
      )}
      <Cart />
    </div>
  );
};

export async function getServerSideProps() {
  const response = await httpClient.get("/product");

  return {
    props: {
      data: response.data,
    }, // will be passed to the page component as props
  };
}

export default Product;
