import SearchForm from "@/components/SearchForm";
import StartupCard, { StartupCardType } from "@/components/StartupCard";
import { client } from "@/sanity/lib/client";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { PLAYLIST_BY_SLUG_QUERY, STARTUPS_QUERY } from "@/sanity/lib/queries";

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

  const { data: posts } = await sanityFetch({
    query: STARTUPS_QUERY,
    params,
  });
  const playlists = await client.fetch(PLAYLIST_BY_SLUG_QUERY, {
    prefix: "editor-picks",
  });

  const editorPosts = playlists?.select ?? [];

  // const posts = [{
  //   _id: "1",
  //   _createdAt: "12-10-2025",
  //   views: "42",
  //   author: "monaski",
  //   title: "startupLens",
  //   category: "tech",
  //   desription: "a really cool stuff",
  //   image: "/logo.png"
  // }]

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
            posts.map((post: StartupCardType) => (
              <StartupCard key={post?._id} post={post} />
            ))
          ) : (
            <p className="no-result">No Startups found</p>
          )}
        </ul>

        {editorPosts?.length > 0 && (
          <div className="mx-auto mt-7">
            <p className="text-30-semibold">Editor picks</p>

            <ul className="mt-5 card_grid-sm">
              {editorPosts.map((post: StartupCardType) => (
                <StartupCard key={post._id} post={post} />
              ))}
            </ul>
          </div>
        )}
      </section>

      <SanityLive />
    </>
  );
}
