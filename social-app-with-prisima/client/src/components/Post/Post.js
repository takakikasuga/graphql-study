import React from 'react';
import './Post.css';
import { gql, useMutation } from '@apollo/client';

const PUBLISH_POST = gql`
  mutation PublishPost($postId: ID!) {
    postPublish(postId: $postId) {
      userErrors {
        message
      }
      post {
        id
        title
        published
      }
    }
  }
`;

const UNPUBLISH_POST = gql`
  mutation UnpublishPost($postId: ID!) {
    postUnpublish(postId: $postId) {
      userErrors {
        message
      }
      post {
        id
        title
        published
      }
    }
  }
`;

export default function Post({
  title,
  content,
  date,
  user,
  published,
  id,
  isMyProfile
}) {
  const [publishPost, { data: publishedData, loading }] =
    useMutation(PUBLISH_POST);
  const [
    unpublishPost,
    { data: unpublishedData, loading: unpublishedLoading }
  ] = useMutation(UNPUBLISH_POST);
  console.log({ publishedData, loading });
  console.log({ unpublishedData, unpublishedLoading });
  if (loading) return <div>Spinner...</div>;

  const formatedDate = new Date(Number(date));
  return (
    <div
      className='Post'
      style={published === false ? { backgroundColor: 'hotpink' } : {}}>
      {isMyProfile && published === false && (
        <p
          className='Post__publish'
          onClick={() => {
            publishPost({
              variables: {
                postId: id
              }
            });
          }}>
          publish
        </p>
      )}
      {isMyProfile && published === true && (
        <p
          className='Post__publish'
          onClick={() => {
            unpublishPost({
              variables: {
                postId: id
              }
            });
          }}>
          unpublish
        </p>
      )}
      <div className='Post__header-container'>
        <h2>{title}</h2>
        <h4>
          Created At {`${formatedDate}`.split(' ').splice(0, 3).join(' ')} by{' '}
          {user}
        </h4>
      </div>
      <p>{content}</p>
    </div>
  );
}
