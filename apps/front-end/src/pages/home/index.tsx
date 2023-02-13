import React, { useEffect } from 'react'
import moment from 'moment'
import {
  CardContent, Card, CardHeader, Grid,
} from '@mui/material'

import { PostDTO } from '@dashboard/dtos'
import { api } from 'src/hooks/useApi'

/**
 * Given a date, return a string that displays the date in a human readable format
 * @param myDate - the date to convert
 * @returns a string that displays the date in a human readable format (ie: Today, Yesterday, Last Week, etc)
 */
function dateToFromNowDaily(myDate: string): string {
  const fromNow = moment(myDate).fromNow()

  return moment(myDate).calendar(null, {
    lastWeek: '[Last] dddd',
    lastDay: '[Yesterday]',
    sameDay: '[Today]',
    nextDay: '[Tomorrow]',
    nextWeek: 'dddd',
    // when the date is further away, use from-now functionality
    sameElse() {
      return `[${fromNow}]`
    },
  })
}

function Home() {
  const [posts, setPosts] = React.useState<PostDTO[] | undefined>(undefined)

  useEffect(() => {
    const fetchPosts = async () => {
      const postList = await api.posts.getPosts()
      setPosts(postList)
    }
    fetchPosts().catch(console.error)
  }, [])

  if (!posts) {
    return <div>Loading...</div>
  }

  return (
    <Grid container spacing={3}>
      {posts
        && posts.map((post) => (
          <Grid key={post.id} item xs={3}>
            <Card>
              <CardHeader
                title={`Post from ${post.author.fullName} ${dateToFromNowDaily(
                  post.createdAt,
                )}`}
              />
              {post.imageURL && (
                <CardContent
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <img
                    style={{ maxWidth: '10rem', maxHeight: '10rem' }}
                    alt='A post with a meme in it'
                    src={post.imageURL}
                  />
                </CardContent>
              )}
              {post.content && <CardContent>{post.content}</CardContent>}
            </Card>
          </Grid>
        ))}
    </Grid>
  )
}

export default Home
