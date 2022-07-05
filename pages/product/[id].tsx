import React from "react";
import httpClient from "../../helper/httpClient";
import Image from "next/image";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { addProduct } from "../../store/reducers/cart";
import { useRouter } from "next/router";

const ProductDetail = (props: any) => {
  const product = props.product;
  const dispatch = useDispatch();
  const router = useRouter()

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
    <div className="container mx-auto">
      <div className="grid lg:grid-cols-2 gap-10">
        <div>
          <Image
            src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/${product.thumb}`}
            alt={product.title}
            layout="responsive"
            height={1}
            width={1}
          />
        </div>
        <div>
          <p className="font-bold text-lg">
            <Link href={`/product/${product.productId}`}>{product.title}</Link>
          </p>
          <p>${product.price}</p>
          <button
            onClick={() =>
              handleAddToCart(product.productId, product.title, product.price)
            }
            className="py-1 px-3 bg-slate-300 rounded-md"
          >
            Add to Cart
          </button>

          <div dangerouslySetInnerHTML={{__html: product.description}}></div>
          <button onClick={() => router.push('/product')}>Back to list</button>
          <button onClick={() => router.push(`/product/edit/${product.productId}`)}>Edit product</button>
        </div>
      </div>
    </div>
  );
};

export async function getStaticProps({ params }: { params: { id: string } }) {
  const response = await httpClient.get(`/product/${params.id}`);
  console.log(response);
  return {
    props: {
      product: response.data.data,
      id: params.id,
    }, // will be passed to the page component as props
  };
}

export async function getStaticPaths() {
  const response = await httpClient.get("/product");
  const products: any[] = [];
  console.log("response", response);
  response.data.data.forEach((item: any) => {
    products.push({
      params: { id: `${item.productId}` },
    });
  });

  return {
    paths: products,
    fallback: true, // false or 'blocking'
  };
}

export default ProductDetail;
