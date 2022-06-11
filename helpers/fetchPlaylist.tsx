import { ApolloClient, gql, InMemoryCache } from "@apollo/client";

export async function fetchPlaylist() {
  const client = new ApolloClient({
    uri: 'https://spotify-graphql.shotgun.live/api',
    cache: new InMemoryCache()
  });

  const { data } = await client.query({
    query: gql`
          query getUrl {
            playlist {
              name
              images {
                url
              }
              tracks {
                added_at
                track {
                  id
                  name
                  preview_url
                }
              }
            }
          }
          `
  })

  return data
}