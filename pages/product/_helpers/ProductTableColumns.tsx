import Link from "next/link";
import Image from "next/image";

import {
  OnClickType,
  TableColumn,
} from "../../../components/Table/Table.interface";
import dayjs from "dayjs";
import { FaCartPlus, FaPencilAlt, FaTrash } from "react-icons/fa";

export enum OnClickButton {
  ADD_TO_CART = "add_to_cart",
  EDIT_PRODUCT = "edit_product",
  DELETE_PRODUCT = "delete_product",
}
export const ProductTableColumns: TableColumn[] = [
  {
    id: "product_id",
    label: "Id",
    render: (product: any) => <>{product.productId}</>,
  },
  {
    id: "product_image",
    label: "Image",
    render: (product: any) => (
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
    ),
  },
  {
    id: "product_name",
    label: "Name",
    render: (product: any) => (
      <p className="font-bold text-lg">
        <Link href={`/product/${product.productId}`}>{product.title}</Link>
      </p>
    ),
    sortable: true
  },
  {
    id: "product_price",
    label: "Price",
    render: (product: any) => <>{product.price}</>,
  },
  {
    id: "product_date",
    label: "Updated At",
    render: (product: any) => <>{dayjs(product.date).format("MM-DD-YYYY")}</>,
  },
  {
    id: "product_action",
    label: "",
    render: (product: any, onClick?: OnClickType) => (
      <>
        <button
          onClick={() => onClick && onClick(OnClickButton.ADD_TO_CART, product)}
          className="py-1 px-3 bg-slate-300 rounded-md mr-1"
        >
          <FaCartPlus />
        </button>

        <button
          onClick={() =>
            onClick && onClick(OnClickButton.EDIT_PRODUCT, product)
          }
          className="py-1 px-3 bg-slate-300 rounded-md mr-1"
        >
          <FaPencilAlt />
        </button>
        <button
          onClick={() =>
            onClick && onClick(OnClickButton.DELETE_PRODUCT, product)
          }
          className="py-1 px-3 bg-slate-300 rounded-md"
        >
          <FaTrash />
        </button>
      </>
    ),
  },
];
