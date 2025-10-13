// import "server-only"

import { createClient } from 'next-sanity'

// import { apiVersion, dataset, projectId } from '../env'

const token = process.env.SANITY_WRITE_TOKEN;
console.log("sanity write token:", token);

export const writeClient = createClient({
  projectId: "zwxyfbzw",
  dataset: "production",
  apiVersion: "2025-10-10",
  useCdn: false, // Set to false if statically generating pages, using ISR or tag-based revalidation
  token
})

if (!writeClient.config().token) {
    throw new Error("Write token not found");
}