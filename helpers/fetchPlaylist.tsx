import { ApolloClient, gql, InMemoryCache } from "@apollo/client";

export async function fetchPlaylist() {
  try {
    const client = new ApolloClient({
      uri: 'https://spotify-graphql.shotgun.live/api',
      cache: new InMemoryCache()
    });


    const { data } = await client.query({
      query: gql`
            query getUrl {
              playlist {
                name
                images {url}
                tracks {
                  added_at
                  track {
                    id
                    name
                    preview_url
                    artists {
                      id
                      name
                      images {
                        url
                      }
                    }
                    album {
                      id
                      images {
                        url
                      }
                      name
                    }
                  }
                }
              }
            }
            `
    })

    return data.playlist
  }
  catch (e) {
    console.log("Could not retrieve graphQL data: ", e)
    return {}
  }
}