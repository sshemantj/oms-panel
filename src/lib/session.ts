// this file is a wrapper with defaults to be used in both API routes and `getServerSideProps` functions

import { withIronSessionApiRoute, withIronSessionSsr } from "iron-session/next";

import { sessionOptions } from "./authSessionConfig";
import { User } from "@/types/User";

// eslint-disable-next-line import/prefer-default-export

// This is where we specify the typings of req.session.*
declare module "iron-session" {
  interface IronSessionData {
    user?: User;
  }
}

export default function withSession(route: any) {
  return withIronSessionApiRoute(route, sessionOptions);
}
export function withSessionSsr(handler: any) {
  return withIronSessionSsr(handler, sessionOptions);
}
