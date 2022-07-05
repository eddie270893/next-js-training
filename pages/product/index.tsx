import React, { useEffect, useState } from "react";
import Cart from "../../components/Cart/Cart";
import httpClient from "../../helper/httpClient";
import { useDispatch } from "react-redux";
import { addProduct } from "../../store/reducers/cart";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import dayjs from "dayjs";
import {
  FaTrash,
  FaCartPlus,
  FaPencilAlt,
  FaArrowDown,
  FaArrowUp,
} from "react-icons/fa";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css";
import ReactPaginate from "react-paginate";
import styles from "../../styles/Pagination.module.scss";
import Table from "../../components/Table/Table";
import { ProductTableColumns } from "./_helpers/ProductTableColumns";
interface ProductFilter {
  search: string;
  orderBy: string;
  isAscending: boolean;
  priceFrom: number;
  priceTo: number;
  page: number;
}

const Product = (props: any) => {
  const products = props.data.data;
  console.log("props.pageCount", props.pageCount);
  const [filter, setFilter] = useState<ProductFilter>({
    search: "",
    orderBy: "name",
    isAscending: true,
    priceFrom: 0,
    priceTo: 0,
    page: 1,
  });

  const [isChangeFilter, setIsChangeFilter] = useState(false);

  useEffect(() => {
    const query = router.query;
    setFilter({
      search: router.query.search ? `${router.query.search}` : "",
      orderBy: router.query.orderBy ? `${router.query.orderBy}` : "",
      isAscending: router.query.isAscending ? true : false,
      priceFrom: router.query.priceFrom ? +router.query.priceFrom : 0,
      priceTo: router.query.priceTo ? +router.query.priceTo : 0,
      page: router.query.page ? +router.query.page : 1,
    });
  }, []);

  useEffect(() => {
    if (isChangeFilter) {
      const qs = Object.keys(filter)
        .map((key) => `${key}=${filter[key as keyof ProductFilter]}`)
        .join("&");
      console.log("filter", filter);
      router.push(`/product?${qs}`);
    }
  }, [filter]);

  const dispatch = useDispatch();
  const router = useRouter();
  const handleAddToCart = (productId: string, title: string, price: number) => {
    dispatch(
      addProduct({
        productId,
        title,
        price,
      })
    );
  };

  const handleDeleteProduct = (productId: string, title: string) => {
    confirmAlert({
      title: "Confirm to delete",
      message: `Are you sure to delete ${title}`,
      buttons: [
        {
          label: "Delete",
          onClick: async () => {
            const response = await httpClient.delete(`/product/${productId}`);
            console.log(response);
            router.replace(router.asPath);
          },
        },
        {
          label: "Cancel",
        },
      ],
    });
  };

  const handleUpdateFilter = (name: keyof ProductFilter, value: any) => {
    setFilter({
      ...filter,
      [name]: value,
    });
    setIsChangeFilter(true);
  };

  const handleUpdateSorting = (name: string) => {
    setIsChangeFilter(true);
    setFilter({
      ...filter,
      orderBy: name,
      isAscending: !filter.isAscending,
    });
  };

  const handlePageClick = (event: any) => {
    setIsChangeFilter(true);

    setFilter({
      ...filter,
      page: event.selected + 1,
    });
  };

  const handleOnClickButton = (type: string, value: any) => {
    console.log(type, value);
  }

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-2">
        <h3 className="text-3xl">Product list</h3>
        <div className="text-right">
          <Cart />
        </div>
      </div>
      <div className="grid grid-cols-5">
        <div className="col-span-4">
          <label>Search</label>
          <input
            className="border border-solid rounded-sm py-1 px-4 mb-2"
            value={filter.search}
            placeholder="Enter product name"
            onChange={(e) => handleUpdateFilter("search", e.target.value)}
          />

          <label>Price from</label>
          <input
            className="border border-solid rounded-sm py-1 px-4 mb-2"
            value={filter.search}
            placeholder="From..."
            onChange={(e) => handleUpdateFilter("search", e.target.value)}
          />

          <label>Price to</label>
          <input
            className="border border-solid rounded-sm py-1 px-4 mb-2"
            value={filter.search}
            placeholder="To..."
            onChange={(e) => handleUpdateFilter("search", e.target.value)}
          />
        </div>
        <div className="text-right">
          <button onClick={() => router.push("/product/edit/0")}>
            Add new product
          </button>
        </div>
      </div>

      <Table columns={ProductTableColumns} data={products} onClick={handleOnClickButton} />

      {/* <table className="w-full shadow-md p-4">
        <thead>
          <tr>
            <th className="py-2 px-4 border-y">No</th>
            <th className="py-2 px-4 border-y">Image</th>
            <th className="py-2 px-4 border-y text-left">
              <button onClick={() => handleUpdateSorting("title")}>
                Name
                {filter.orderBy === "title" && (
                  <>{filter.isAscending ? <FaArrowUp /> : <FaArrowDown />}</>
                )}
              </button>
            </th>
            <th className="py-2 px-4 border-y text-right">
              <button onClick={() => handleUpdateSorting("price")}>
                Price
                {filter.orderBy === "price" && (
                  <>{filter.isAscending ? <FaArrowUp /> : <FaArrowDown />}</>
                )}
              </button>
            </th>
            <th className="py-2 px-4 border-y text-right">
              <button onClick={() => handleUpdateSorting("date")}>
                Date
                {filter.orderBy === "date" && (
                  <>{filter.isAscending ? <FaArrowUp /> : <FaArrowDown />}</>
                )}
              </button>
            </th>
            <th className="py-2 px-4 border-y text-right">Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product: any, index: number) => {
            return (
              <tr className="mb-2 p-3" key={index}>
                <td className="py-2 px-4 text-center">{index + 1}</td>
                <td className="py-2 px-4">
                  <div className="relative">
                    <Link href={`/product/${product.productId}`}>
                      <Image
                        src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/${product.thumb}`}
                        alt={product.title}
                        layout="responsive"
                        height={1}
                        width={1}
                      />
                    </Link>
                  </div>
                </td>

                <td className="py-2 px-4">
                  <p className="font-bold text-lg">
                    <Link href={`/product/${product.productId}`}>
                      {product.title}
                    </Link>
                  </p>
                </td>
                <td className="py-2 px-4  text-right">
                  <p>${product.price}</p>
                </td>
                <td className="py-2 px-4  text-right">
                  {dayjs(product.date).format("MM-DD-YYYY")}
                </td>
                <td className="py-2 px-4  text-right">
                  <button
                    onClick={() =>
                      handleAddToCart(
                        product.productId,
                        product.title,
                        product.price
                      )
                    }
                    className="py-1 px-3 bg-slate-300 rounded-md mr-1"
                  >
                    <FaCartPlus />
                  </button>

                  <button
                    onClick={() =>
                      router.push(`/product/edit/${product.productId}`)
                    }
                    className="py-1 px-3 bg-slate-300 rounded-md mr-1"
                  >
                    <FaPencilAlt />
                  </button>
                  <button
                    onClick={() =>
                      handleDeleteProduct(product.productId, product.title)
                    }
                    className="py-1 px-3 bg-slate-300 rounded-md"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table> */}
      <div className={styles["pagination"]}>
        {products.length > 0 && (
          <ReactPaginate
            breakLabel="..."
            nextLabel=">"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={props.pageCount}
            previousLabel="<"
            containerClassName="containerClassName"
            className="pagination"
            pageClassName="pagination__page"
            pageLinkClassName="pageLinkClassName"
            activeClassName="pagination__page--active"
          />
        )}
      </div>
    </div>
  );
};

export async function getServerSideProps({ query }: any) {
  const qs = Object.keys(query)
    .map((key) => `${key}=${query[key]}`)
    .join("&");
  const response = await httpClient.get(`/product?${qs}`);
  console.log("qs", qs);
  return {
    props: {
      data: response.data,
      pageCount: Math.ceil(response.data.total / 10),
    }, // will be passed to the page component as props
  };
}

export default Product;
