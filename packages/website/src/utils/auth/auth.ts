import { getServerSession } from "next-auth";
import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";
import { authOptions } from "./authOptions";

async function auth(
  ...args:
    | [
        GetServerSidePropsContext["req"],
        GetServerSidePropsContext["res"]
      ]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return getServerSession(...args, authOptions);
}

export { auth };
