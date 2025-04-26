"use client";

import { FormState, submitForm } from "@/actions/User";
import { useActionState } from "react";

export default function Form() {
  const styles = {
    input: {
      border: "1px solid black",
    },
  };

  const initialState: FormState = {
    error: {},
  };

  const [state, formAction, isPending] = useActionState(
    submitForm,
    initialState
  );

  return (
    <form action={formAction}>
      <section>
        <label htmlFor="name">Name: </label>
        <input type="text" name="name" id="name" style={styles.input} />
        {state?.error?.name && (
          <p className="text-red-500">{state.error?.name}</p>
        )}
      </section>

      <section>
        <label htmlFor="pswd">Password: </label>
        <input type="password" name="pswd" id="pswd" style={styles.input} />
        {state?.error?.pswd && (
          <p className="text-red-500">{state.error?.pswd}</p>
        )}
      </section>

      <button
        type="submit"
        className="text-white bg-blue-500 rounded disabled:bg-gray-500 p-2 cursor-pointer"
        disabled={isPending}
      >
        Submit
      </button>
    </form>
  );
}
