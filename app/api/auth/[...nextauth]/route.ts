import FacebookProvider from "next-auth/providers/facebook";
import NextAuth, { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
      authorization: {
        params: {
          scope:
            "email pages_show_list manage_pages pages_messaging pages_manage_metadata pages_read_engagement",
        },
      },
    }),
  ],
  secret: "SecRet",
};

// email,pages_show_list,pages_messaging,pages_manage_metadata,pages_read_engagement

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
