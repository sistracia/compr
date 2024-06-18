import { signup } from "@/action/auth";
import { EmailFormAction } from "@/components/email-form-action";
import { SignInGitHubButton } from "@/components/signin-github-button";
import { validateRequest } from "@/lib/auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Page() {
  const { user } = await validateRequest();
  if (user) {
    return redirect("/");
  }
  return (
    <>
      <h1>Create an account</h1>
      <EmailFormAction action={signup.bind(null, "/")} />
      <Link href="/login">Sign in</Link>
      <br />
      <SignInGitHubButton />
    </>
  );
}
