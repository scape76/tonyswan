import { ProfilePageProps } from "../page";
import { BiodataForm } from "./BiodataForm";

export default async function BiodataPage({ params }: ProfilePageProps) {
  return (
    <div>
      <h1 className="text-xl md:text-3xl text-center mt-4">Your settings</h1>
      <BiodataForm />
    </div>
  );
}
