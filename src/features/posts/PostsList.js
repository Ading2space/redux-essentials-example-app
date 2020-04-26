import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectUserById } from '../users/usersSlice'

import { fetchPosts } from './postsSlice'

const reactionEmoji = {
  thumbsUp: '👍',
  hooray: '🎉',
  heart: '❤️',
  rocket: '🚀',
  eyes: '👀',
}

const PostExcerpt = ({ post }) => {
  const author = useSelector((state) => selectUserById(state, post.user))

  const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
    return (
      <button key={name} className="muted-button reaction-button">
        {emoji} {post.reactions[name]}
      </button>
    )
  })

  return (
    <article className="post-excerpt">
      <h3>{post.title}</h3>
      <span>
        <i>{author.name}</i>
      </span>
      <span> at {post.date}</span>
      <p>{post.content.substring(0, 100)}</p>
      <div>{reactionButtons}</div>
      <Link to={`/posts/${post.id}`} className="button">
        View Post
      </Link>
    </article>
  )
}

export const PostsList = () => {
  const posts = useSelector((state) => state.posts)
  const dispatch = useDispatch()

  // Sort posts in reverse chronological order by datetime string
  const orderedPosts = posts
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date))

  useEffect(() => {
    dispatch(fetchPosts())
  }, [dispatch])

  const renderedPosts = orderedPosts.map((post) => (
    <PostExcerpt key={post.id} post={post} />
  ))

  return (
    <section>
      <h2>Posts</h2>
      {renderedPosts}
    </section>
  )
}
