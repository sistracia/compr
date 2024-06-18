import { logout } from "@/action/auth";
import { FormAction } from "@/components/form-action";
import { validateRequest } from "@/lib/auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Home() {
  const { user } = await validateRequest();
  if (!user) {
    return redirect("/login");
  }

  return (
    <>
      <Link href="/login">Sign In</Link>
      <br />
      <Link href="/signup">Sign Up</Link>
      <br />
      <FormAction action={logout.bind(null, "/")}>
        <button>Sign out</button>
      </FormAction>
    </>
  );
}
