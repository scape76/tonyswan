import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LoginButton } from "./LoginButton";
import { auth } from "@/lib/auth/auth";
import { redirect } from "next/navigation";

async function LoginPage() {
  const session = await auth();

  if (session?.user) redirect("/");

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Login using your desirable method</CardDescription>
        </CardHeader>
        <CardContent>
          <LoginButton />
        </CardContent>
      </Card>
    </div>
  );
}

export default LoginPage;
