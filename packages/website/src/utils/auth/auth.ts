import { getServerSession } from "next-auth";
import { authOptions } from "./authOptions";

async function auth() {
  return getServerSession(authOptions);
}

export { auth };
