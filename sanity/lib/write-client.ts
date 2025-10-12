// import "server-only"

import { createClient } from 'next-sanity'

// import { apiVersion, dataset, projectId } from '../env'

export const writeClient = createClient({
  projectId: "zwxyfbzw",
  dataset: "production",
  apiVersion: "2025-10-10",
  useCdn: false, // Set to false if statically generating pages, using ISR or tag-based revalidation
  token: "pskN1cF2ghaBlrKx8oaO1bTB5tAzW2c4vZjGTNV4FgVDtILgAxWppBn0WQuLDNAYw614nws26uMpg8prJphdiGIABqSv7K40CVYsKXO48bvorqY4ynIdXuqBvjEW1EUSEmTGJ146N3I6R4X0NyIvwvN83mLV7jSha8TjGT0edljt4jYVnDUuZ"
})

if (!writeClient.config().token) {
    throw new Error("Write token not found");
}