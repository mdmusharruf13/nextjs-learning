import { addProduct } from "@/actions/product";
import Form from "../form";

export default function AddProduct() {
  return <Form action={addProduct} />;
}
