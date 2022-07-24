import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type CreateImpressionInput = {
  comment?: InputMaybe<Scalars['String']>;
  postId: Scalars['String'];
  sticker: Scalars['String'];
  twitterId?: InputMaybe<Scalars['String']>;
};

export type ImpressionModel = {
  __typename?: 'ImpressionModel';
  comment?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  postId: Scalars['String'];
  sticker: Scalars['String'];
  twitterId?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addImpressions?: Maybe<ImpressionModel>;
};


export type MutationAddImpressionsArgs = {
  input: CreateImpressionInput;
};

export type PostModel = {
  __typename?: 'PostModel';
  contentPath: Scalars['String'];
  emoji?: Maybe<Scalars['String']>;
  excerpt?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  impressions: Array<ImpressionModel>;
  like: Scalars['Int'];
  md5Hash: Scalars['String'];
  publishDate?: Maybe<Scalars['DateTime']>;
  published?: Maybe<Scalars['Boolean']>;
  thumbNailUrl?: Maybe<Scalars['String']>;
  title: Scalars['String'];
  type: PostType;
};

export enum PostType {
  Article = 'article',
  Diary = 'diary'
}

export type Query = {
  __typename?: 'Query';
  envs: Scalars['String'];
  findPost: PostModel;
  fixedPosts: Array<PostModel>;
  impressions?: Maybe<Array<ImpressionModel>>;
  port: Scalars['Int'];
  posts?: Maybe<Array<PostModel>>;
};


export type QueryFindPostArgs = {
  contentPath?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
};


export type QueryImpressionsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  postId?: InputMaybe<Scalars['String']>;
  sortAs?: InputMaybe<SortAs>;
};


export type QueryPostsArgs = {
  type?: InputMaybe<Array<PostType>>;
};

export enum SortAs {
  Asc = 'asc',
  Desc = 'desc'
}

export type PostFragment = { __typename?: 'PostModel', id: string, title: string, type: PostType, publishDate?: any | null, emoji?: string | null };

export type PostIndexPageQueryVariables = Exact<{ [key: string]: never; }>;


export type PostIndexPageQuery = { __typename?: 'Query', articles?: Array<{ __typename?: 'PostModel', id: string, title: string, type: PostType, publishDate?: any | null, emoji?: string | null }> | null, diaries?: Array<{ __typename?: 'PostModel', id: string, title: string, type: PostType, publishDate?: any | null, emoji?: string | null }> | null };

export type ImpressionFragment = { __typename?: 'ImpressionModel', id: string, comment?: string | null, createdAt?: any | null, sticker: string, twitterId?: string | null, postId: string };

export type PostDetailPageQueryVariables = Exact<{
  contentPath?: InputMaybe<Scalars['String']>;
}>;


export type PostDetailPageQuery = { __typename?: 'Query', post: { __typename?: 'PostModel', id: string, title: string, type: PostType, publishDate?: any | null, emoji?: string | null, impressions: Array<{ __typename?: 'ImpressionModel', id: string, comment?: string | null, createdAt?: any | null, sticker: string, twitterId?: string | null, postId: string }> } };

export const PostFragmentDoc = gql`
    fragment Post on PostModel {
  id
  title
  type
  publishDate
  emoji
}
    `;
export const ImpressionFragmentDoc = gql`
    fragment Impression on ImpressionModel {
  id
  comment
  createdAt
  sticker
  twitterId
  postId
}
    `;
export const PostIndexPageDocument = gql`
    query PostIndexPage {
  articles: posts(type: [article]) {
    ...Post
  }
  diaries: posts(type: [diary]) {
    ...Post
  }
}
    ${PostFragmentDoc}`;

export function usePostIndexPageQuery(options?: Omit<Urql.UseQueryArgs<PostIndexPageQueryVariables>, 'query'>) {
  return Urql.useQuery<PostIndexPageQuery>({ query: PostIndexPageDocument, ...options });
};
export const PostDetailPageDocument = gql`
    query PostDetailPage($contentPath: String) {
  post: findPost(contentPath: $contentPath) {
    ...Post
    impressions {
      ...Impression
    }
  }
}
    ${PostFragmentDoc}
${ImpressionFragmentDoc}`;

export function usePostDetailPageQuery(options?: Omit<Urql.UseQueryArgs<PostDetailPageQueryVariables>, 'query'>) {
  return Urql.useQuery<PostDetailPageQuery>({ query: PostDetailPageDocument, ...options });
};