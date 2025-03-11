import React from 'react'

function PostCard(props: any) {
  const {post} = props;
  return (
    <div>Author {post.authorId}</div>
  )
}

export default PostCard