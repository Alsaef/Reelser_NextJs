import { authOptions } from "@/lib/auth";
import { DBConnection } from "@/lib/db";
import { getServerSession } from "next-auth";
import Image from "next/image";

export default async  function Home() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <p>Access Denied. Please sign in.</p>;
  }
  return (
  <div>
    <h2 className="text-center text-red-500">Hello world</h2>
    <p>{session.user.email}</p>
  </div>
  );
}
