"use client";

import { useEffect, useState } from "react";

export default function IDPage({ params }) {
  const [paramsState, setParamsState] = useState(null);

  useEffect(function getParams() {
    params.then(setParamsState);
  }, []);

  return <section>
    <p>the dynamic value is {paramsState ? paramsState.id : "loading..."}.</p>
  </section>;
}
