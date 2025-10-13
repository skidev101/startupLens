import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import { AUTHOR_BY_GITHUB_ID } from "./sanity/lib/queries"
import { client } from "./sanity/lib/client"
import { writeClient } from "./sanity/lib/write-client"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub],
  callbacks: {
    async signIn({ user, account, profile }) {
      const { name, email, image } = user
      
      if (!profile?.id) return false
      
      const userExists = await client
        .withConfig({ useCdn: false })
        .fetch(AUTHOR_BY_GITHUB_ID, { id: profile.id })
      
      if (!userExists) {
        await writeClient.create({
          _type: "author",
          id: profile.id,
          name,
          username: (profile as any).login,
          email,
          image,
          bio: (profile as any).bio || ""
        })
      }
      
      return true
    },
    
    async jwt({ token, account, profile }) {
      if (account && profile?.id) {
        const user = await client
          .withConfig({ useCdn: false })
          .fetch(AUTHOR_BY_GITHUB_ID, { id: profile.id })
        
        token.id = user?._id
      }
      
      return token
    },
    
    async session({ session, token }) {
      return {
        ...session,
        id: token.id as string
      }
    }
  }
})