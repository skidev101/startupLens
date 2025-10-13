import { defineQuery } from "next-sanity";

export const STARTUPS_QUERY =
  defineQuery(`*[_type == "startup" && defined(slug.current) && !defined($search) || title match $search || category match $search || author->username match $search] | order(_createdAt desc){
  _id,
  author -> {
    _id, username, email, image, bio
  },
  category,
  description,
  image,
  slug,
  title,
  views,
  _createdAt
}`);

export const STARTUPS_BY_ID_QUERY =
  defineQuery(`*[_type == "startup" && _id == $id][0]{
  _id,
  author -> {
    _id, username, email, image, bio
  },
  category,
  description,
  image,
  slug,
  title,
  views,
  _createdAt,
  pitch
}`);

export const STARTUPS_VIEWS_QUERY =
  defineQuery(`*[_type == "startup" && _id == $id][0]{
  _id,
  views
}`);

export const AUTHOR_BY_GITHUB_ID = defineQuery(`
  *[_type == "author" && id == $id][0]{
    _id,
    id,
    name,
    username,
    email,
    image,
    bio
  }
`);
