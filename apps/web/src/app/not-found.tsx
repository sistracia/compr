import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex h-dvh flex-col items-center justify-center">
      <p>404 | This page could not be found.</p>
      <Link href="/">Return Home</Link>
    </div>
  );
}
