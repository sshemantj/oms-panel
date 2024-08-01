import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";
import withSession from "@/lib/session";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      req.session.destroy();
      res.status(200).send({ isLoggedIn: false });
    } catch (error: any) {
      return res.json({
        message: new Error(error).message,
        success: false,
      });
    }
  }
}

export default withSession(handler);
