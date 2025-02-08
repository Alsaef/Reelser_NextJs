import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import LogOutBtn from '@/components/LogOutBtn';
import Link from "next/link";
export default async  function Home() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <p>Access Denied. Please sign in.  <Link href='/login'>Login page</Link></p>;
  }
  return (
  <div>
    <h2 className="text-center text-red-500">Hello world</h2>
    <p>{session.user.email}</p>
    <LogOutBtn/>
   
  </div>
  );
}
