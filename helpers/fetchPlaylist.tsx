import { ApolloClient, gql, InMemoryCache } from "@apollo/client";
import { PlaylistData } from "./types";
import nookies from 'nookies'

function assignLikes(playlist: PlaylistData, context: any): PlaylistData {
  // playlist.tracks.map()
  var favorites = JSON.parse(nookies.get(context).favorites)
  // playlist.tracks.map((e) => e.track.like = true)
  playlist.tracks[0].track.like = true
  console.log(playlist.tracks)
  // return favorites
  return playlist
}


export async function fetchPlaylist(context: any): Promise<PlaylistData> {
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

    var favList: { [id: string]: boolean } = {}
    favList['pipi'] = true;
    console.log(favList["chien"])

    return data.playlist
  }
  catch (e) {
    console.log("Could not retrieve graphQL data: ", e)
    return Promise.reject()
  }
}