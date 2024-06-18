import { ActionResult } from "@/types/action";
import { FormAction } from "./form-action";

export type EmailFormActionProps = {
  action: (prevState: unknown, formData: FormData) => Promise<ActionResult>;
};

export function EmailFormAction({ action }: EmailFormActionProps) {
  return (
    <FormAction action={action}>
      <label htmlFor="username">Username</label>
      <input name="username" id="username" />
      <br />
      <label htmlFor="password">Password</label>
      <input type="password" name="password" id="password" />
      <br />
      <button>Continue</button>
    </FormAction>
  );
}
