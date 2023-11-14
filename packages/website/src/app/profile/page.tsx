import { auth } from "@/utils/auth/auth";
import { notFound } from "next/navigation";

export default async function Profile() {
  const session = await auth();

  if (!session?.user) notFound();

  const { user } = session;

  return <div>{user.id}</div>;
}
