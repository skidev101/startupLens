import { auth } from "@/auth";
import SearchForm from "@/components/SearchForm";
import StartupCard, { StartupCardType } from "@/components/StartupCard";
import { Button } from "@/components/ui/button";
// import { client } from "@/sanity/lib/client";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";
import Link from "next/link";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query;
  const params = { search: query || null };
  // const posts = await client.fetch(STARTUPS_QUERY);
  // console.log(JSON.stringify(posts));

  // const session = await auth();
  // console.log(session?.id);

  // const { data: posts } = await sanityFetch({ query: STARTUPS_QUERY, params });

  const posts = [{
    _id: "1",
    _createdAt: "12-10-2025",
    views: "42",
    author: "monaski",
    title: "startupLens",
    category: "tech",
    desription: "a really cool stuff",
    image: "/logo.png"
  }]


  return (
    <>
      <section className="blue_container pattern">
        <h1 className="heading">
          Pitch your startup, <br /> Connect with Investors
        </h1>

        <p className="sub-heading">
          Submit Ideas, vote on pitches, and Get noticed in virtual competitions{" "}
        </p>

        <SearchForm query={query} />
      </section>

      <section className="section_container">
        <p className="text-30-semibold">
          {query ? `Search results for "${query}"` : "All Startups"}
        </p>


        <ul className="mt-7 card_grid">
          {posts?.length > 0 ? (
            posts.map((post: any) => <StartupCard key={post?._id} post={post} />) // add appropriate type(StartupCardType) after local testing
          ) : (
            <p className="no-result">No Startups found</p>
          )}
        </ul>
      </section>

      <SanityLive />
    </>
  );
}
