import SearchForm from "../components/SearchForm";

export default async function Home({ searchParams }: { searchParams: Promise<{ query?: string }> }) {
  const query = (await searchParams).query;
  console.log("searchquery:", query)

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
          {query ? `Search results for ${query}` : "All Startups"}
        </p>
      </section>
    </>
  );
}
