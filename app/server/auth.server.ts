import type { User } from "~/models";

import { Authenticator } from "remix-auth";
import { GoogleStrategy, SocialsProvider } from "remix-auth-socials";

import { createUser, findUserByEmail } from "~/services/user.server";

import { sessionStorage } from "./session.server";

import { getDomain } from "~/utils";

export const authenticator = new Authenticator<User>(sessionStorage);

const getCallback = (provider: SocialsProvider) => {
  return `${getDomain()}/auth/${provider}/callback`;
};

authenticator.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      callbackURL: getCallback(SocialsProvider.GOOGLE),
    },
    async ({ profile }) => {
      const data = profile._json;
      const { email } = data;

      let user = findUserByEmail(email);

      if (!user) {
        user = createUser({
          email: data.email,
        });
      }

      return user as unknown as User; // TODO: fix
    }
  )
);
