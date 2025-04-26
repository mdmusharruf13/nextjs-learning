"use client";

import { useFormStatus } from "react-dom";

export default function Submit() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="text-white bg-blue-500 rounded disabled:bg-gray-500 p-2 cursor-pointer"
      disabled={pending}
    >
      Submit
    </button>
  );
}
