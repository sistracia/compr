"use server";

import { lucia, validateRequest } from "@/lib/auth";
import sql, { isPostgresError } from "@/lib/db";
import { ActionResult } from "@/types/action";
import { User } from "@/types/user";
import { generateId } from "lucia";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Argon2id } from "oslo/password";

export async function login(
  redirectUrl: string,
  prevState: unknown,
  formData: FormData,
): Promise<ActionResult> {
  console.log(prevState);
  const username = formData.get("username");
  if (
    typeof username !== "string" ||
    username.length < 3 ||
    username.length > 31 ||
    !/^[a-z0-9_-]+$/.test(username)
  ) {
    return {
      error: "Invalid username",
    };
  }
  const password = formData.get("password");
  if (
    typeof password !== "string" ||
    password.length < 6 ||
    password.length > 255
  ) {
    return {
      error: "Invalid password",
    };
  }

  try {
    const [existingUser] = await sql<[User?]>`
      select * from "user" where username = ${username}
      `;

    if (!existingUser) {
      return {
        error: "Incorrect username or password",
      };
    }

    const validPassword = await new Argon2id().verify(
      existingUser.password,
      password,
    );
    if (!validPassword) {
      return {
        error: "Incorrect username or password",
      };
    }

    const session = await lucia.createSession(existingUser.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );
  } catch (e) {
    if (isPostgresError(e) && e.code === "42703") {
      return {
        error: "Incorrect username or password",
      };
    }
    return {
      error: "An unknown error occurred",
    };
  }
  return redirect(redirectUrl);
}

export async function signup(
  redirectUrl: string,
  prevState: unknown,
  formData: FormData,
): Promise<ActionResult> {
  console.log(prevState);
  const username = formData.get("username");
  // username must be between 4 ~ 31 characters, and only consists of lowercase letters, 0-9, -, and _
  // keep in mind some database (e.g. mysql) are case insensitive
  if (
    typeof username !== "string" ||
    username.length < 3 ||
    username.length > 31 ||
    !/^[a-z0-9_-]+$/.test(username)
  ) {
    return {
      error: "Invalid username",
    };
  }
  const password = formData.get("password");
  if (
    typeof password !== "string" ||
    password.length < 6 ||
    password.length > 255
  ) {
    return {
      error: "Invalid password",
    };
  }

  const hashedPassword = await new Argon2id().hash(password);
  const userId = generateId(15);

  try {
    await sql`
            insert into "user"
                (id, username, password)
            values
                (${userId}, ${username}, ${hashedPassword})
        `;

    const session = await lucia.createSession(userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );
  } catch (e) {
    if (isPostgresError(e) && e.code === "23505") {
      return {
        error: "Username already used",
      };
    }
    return {
      error: "An unknown error occurred",
    };
  }
  return redirect(redirectUrl);
}

export async function logout(redirectUrl: string): Promise<ActionResult> {
  const { session } = await validateRequest();
  if (!session) {
    return {
      error: "Unauthorized",
    };
  }

  await lucia.invalidateSession(session.id);

  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );
  return redirect(redirectUrl);
}
