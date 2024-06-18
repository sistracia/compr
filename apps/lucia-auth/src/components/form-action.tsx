"use client";

import { ActionResult } from "@/types/action";
import { useFormState } from "react-dom";

export function FormAction({
  children,
  action,
}: {
  children: React.ReactNode;
  action: (prevState: unknown, formData: FormData) => Promise<ActionResult>;
}) {
  const [state, formAction] = useFormState(action, {
    error: null,
  });
  return (
    <form action={formAction}>
      {children}
      <p>{state.error}</p>
    </form>
  );
}
