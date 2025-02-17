"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function NavigationTestPage() {
  // Client side components
  const router = useRouter();
  const pathName = usePathname();
  console.log(pathName);

  const searchParams = useSearchParams();
  const q = searchParams.get("q");
  console.log(q);

  const handleRouterPush = () => {
    console.log("pushed");
    router.push("/");
  };

  const handleRouterReplace = () => {
    console.log("replaced");
    router.replace("/about");
  };

  const handleRouterRefresh = () => {
    console.log("referesh");
    router.refresh();
  };
  const handleRouterBack = () => {
    console.log("back");
    router.back();
    // router.forward();
  };

  return (
    <section className="flex gap-2">
      <Link href={"/"} prefetch={false}>
        click me
      </Link>
      <button onClick={handleRouterPush} title="push()">
        Go to Home
      </button>
      <button onClick={handleRouterReplace} title="replace()">
        Go to About
      </button>
      <button onClick={handleRouterRefresh} title="refresh()">
        Go to Contact
      </button>
      <button onClick={handleRouterBack} title="refresh()">
        back
      </button>
    </section>
  );
}
