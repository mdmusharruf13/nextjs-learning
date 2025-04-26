"use server";

import { connectToDB } from "@/utils/mongodb";

type Error = {
  name?: string,
  pswd?: string,
};

export type FormState = {
  error: Error,
};

export async function submitForm(
  prevState: FormState | undefined,
  formData: FormData
) {
  const name = formData.get("name");
  const pswd = formData.get("pswd");

  const error: Error = {};

  if (!name) error.name = "name is required";
  if (!pswd) error.pswd = "password is required";

  if (Object.keys(error).length > 0) {
    return { error };
  }

  const client = await connectToDB();
  const db = client.db("practice");
  const forms = db.collection("forms2");
  const result = await forms.insertOne({ name, pswd });

  console.log(result);
}