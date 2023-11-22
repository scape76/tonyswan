import Link from "next/link";
import { ProfilePageProps } from "../page";

export default async function DietPage({ params }: ProfilePageProps) {
  const { userId } = params;

  return (
    <div>
      <h1 className="text-xl md:text-3xl mt-4 text-center">Track your diet</h1>
      <p className="mt-6 text-lg">
        You can adjust your weight and calories
        <Link href={`/profile/${userId}/biodata`} className="ml-2 underline">
          here
        </Link>
      </p>
    </div>
  );
}
