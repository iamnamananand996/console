import { setCookie } from "@/lib/cookie";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, body } = req;

  if (method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${method} Not Allowed`);
  }

  if (!body.token) {
    return res.status(500).end("Token not provided");
  }

  const payload = {
    cookie_token: body.token,
  };

  if (!process.env.NEXT_PUBLIC_CONSOLE_BASE_URL) {
    return res.status(500).end("Env CONSOLE_BASE_URL is not provided");
  }

  const hostname = new URL(process.env.NEXT_PUBLIC_CONSOLE_BASE_URL).hostname;

  setCookie(
    res,
    JSON.stringify(payload),
    "instill-ai-user",
    hostname,
    60 * 60 * 24 * 30,
    process.env.NODE_ENV === "production" ? true : false
  );

  return res.status(200).json({
    status: "ok",
  });
};

export default handler;
