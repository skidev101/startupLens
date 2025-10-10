import SearchForm from "@/components/SearchForm";
import StartupCard from "@/components/StartupCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query;
  console.log("searchquery:", query);

  const posts = [
    {
      _createdAt: "10/10/2025",
      views: 55,
      author: { _id: 1, name: "Monaski" },
      _id: 1,
      description: "Hello world, this a brief description of the startup we're talking about. so how this is done is special.",
      image: "https://images.unsplash.com/photo-1700427296131-0cc4c4610fc6?q=80&w=876&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "tech",
      title: "Development",
    },
  ];

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
            posts.map((post, i) => <StartupCard key={post?._id} post={post} />) 
          ) : (
            <p className="no-result">No Startups found</p>
          )}
        </ul>
      </section>
    </>
  );
}
