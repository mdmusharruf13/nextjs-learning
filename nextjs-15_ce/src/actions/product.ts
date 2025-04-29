"use server";

import { connectToDB } from "@/utils/mongodb";
import { redirect } from "next/navigation";

export async function addProduct(formData: FormData) {
    try {
        const client = await connectToDB();
        const db = client.db("practice");
        const products = db.collection("products");

        const title = formData.get("title");
        const details = formData.get("details");

        const isAdded = await products.insertOne({title, details});
        console.log(isAdded);
        console.log(title, details);

    } catch(err) {
        console.log(err);
    }
    redirect("/concepts/server-actions/products");
}

export async function getProducts() {
    try {
        const client = await connectToDB();
        const db = client.db("practice");
        const products = db.collection("products");

        const productList = await products.find({}).toArray();

        return productList.map(product=> (
            {...product, _id: product._id.toString()}
        ));
    } catch(err) {
        console.log(err);
    }
}