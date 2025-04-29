"use server";

import { connectToDB } from "@/utils/mongodb";
import { ObjectId } from "mongodb";
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

export async function updateProducts(formData: FormData) {
    try {
        const client = await connectToDB();
        const db = client.db("practice");
        const products = db.collection("products");

        const title = formData.get("title") as string;
        const details = formData.get("details") as string;
        const _id = formData.get("_id") as string;

        if(!title || !details) {
            throw new Error(`title or details missing ${JSON.stringify(formData)}`);
        }
        console.log(`title: ${title} details: ${details}`);

        const isUpdated = await products.updateOne({_id: new ObjectId(_id)}, {$set: {title: title ,details: details}});

        if(isUpdated.matchedCount == 0) {
            console.log("no matching document found for title ", title);
        } else if(isUpdated.modifiedCount == 0) {
            console.log("Doc matched but no fields changed");
        } else {
            console.log("Doc successfully updated", isUpdated);
        }
    } catch (err) {
        console.log(err);
    }
    redirect("/concepts/server-actions/products");
}