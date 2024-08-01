import { NEXT_SECRET_COOKIE_PASSWORD } from "@/constant/env";
import type { IronSessionOptions } from "iron-session";
import type { IronSessionOptions as IronSessionOptionsEdge } from "iron-session/edge";

// eslint-disable-next-line import/prefer-default-export
export const sessionOptions: IronSessionOptions | IronSessionOptionsEdge = {
  password: NEXT_SECRET_COOKIE_PASSWORD as string,
  cookieName: "WFSESSION",
  cookieOptions: {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 30,

    secure: process.env.NODE_ENV === "production",
  },
};
