import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import httpClient from "../../../helper/httpClient";
import dynamic from "next/dynamic";
import CustomCurrencyInput from "../../../components/CustomCurrencyInput/CustomCurrencyInput";

const Editor = dynamic(() => import("../../../components/Editor/Editor"), {
  ssr: false,
});

const ProductEdit = () => {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState({
    title: "",
    price: "",
    description: "",
  });
  const [description, setDescription] = useState("")
  useEffect(() => {
    if (id && id.length > 1) {
      httpClient.get(`/product/${id}`).then((response) => {
        console.log(response);
        setProduct(response.data.data);
      });
    }
  }, [id]);

  const handleChange = (name: string, value: string) => {
    const tmp = {
      ...product,
      [name]: value,
    }
    setProduct(tmp);
  };

  const ref = useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    const formData = new FormData();
    console.log("product", product);
    formData.append("title", product.title);
    formData.append("price", product.price);
    formData.append("description", description);
    if (ref.current && ref.current.files && ref.current.files.length > 0) {
      formData.append("thumb", ref.current.files[0]);
    }

    if (id && id.length > 1) {
      httpClient.put(`/product/${id}`, formData).then((response) => {
        console.log("ok", response);
      });
    } else {
      httpClient.post("/product", formData).then((response) => {
        router.push(`/product/edit/${response.data.data.productId}`);
      });
    }
  };

  console.log('product', product);

  return (
    <div className="container mx-auto">
      <div>
        <label className="block">Product name</label>
        <input
          className="border border-solid rounded-sm py-1 px-4 mb-2"
          type="text"
          name="title"
          onChange={e => handleChange('title', e.target.value)}
          value={product.title}
          placeholder="Product name"
        />
      </div>
      <div>
        <label className="block">Product price</label>
        <CustomCurrencyInput
          className="border border-solid rounded-sm py-1 px-4 mb-2"
          name="price"
          value={product.price}
          onChange={(name: string, value: number) => handleChange(name, `${value}`)}
        />
      </div>
      <div>
        <label className="block">Product thumbnail</label>
        <input
          ref={ref}
          type="file"
          className="border border-solid rounded-sm py-1 px-4 mb-2"
        />
      </div>
      <Editor onChange={(val: string) => setDescription(val)} data={product.description} />
      <button
        onClick={handleSubmit}
        className="border border-solid rounded-sm py-1 px-4 mb-2 bg-orange-600 text-white"
      >
        {id && id.length > 1 ? "Update product" : "Create product"}
      </button>

      <button onClick={() => router.push("/product")}>Back to list</button>
    </div>
  );
};

export default ProductEdit;
