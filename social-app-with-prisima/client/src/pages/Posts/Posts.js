import React from 'react';
import Post from '../../components/Post/Post';
import { gql, useQuery } from '@apollo/client';

const GET_POSTS = gql`
  query {
    posts {
      id
      title
      content
      createdAt
      user {
        id
        name
      }
    }
  }
`;

export default function Posts() {
  const { data, error, loading } = useQuery(GET_POSTS);
  console.log({ data, error, loading });
  if (error) return <div>Error Page</div>;
  if (loading) return <div>Spinner...</div>;
  const { posts } = data;
  return (
    <div>
      {posts.map(({ title, content, createdAt, id, user }) => {
        return (
          <Post
            key={id}
            id={id}
            title={title}
            content={content}
            date={createdAt}
            user={user.name}
          />
        );
      })}
    </div>
  );
}
