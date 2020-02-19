import * as Types from '../../../graphql/types.generated';

import { ActivityPreviewCommentCtxBaseFragment } from '../../../HOC/modules/ActivityPreview/getActivityPreview.generated';
import gql from 'graphql-tag';
import { ActivityPreviewCommentCtxBaseFragmentDoc } from '../../../HOC/modules/ActivityPreview/getActivityPreview.generated';
import * as ApolloReactCommon from '@apollo/react-common';
import * as React from 'react';
import * as ApolloReactComponents from '@apollo/react-components';
import * as ApolloReactHoc from '@apollo/react-hoc';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;


export type ReplyMutationVariables = {
  comment: Types.CommentInput,
  inReplyToCommentId: Types.Scalars['String'],
  threadId: Types.Scalars['String']
};


export type ReplyMutation = (
  { __typename: 'RootMutationType' }
  & { createReply: Types.Maybe<(
    { __typename: 'Comment' }
    & ActivityPreviewCommentCtxBaseFragment
  )> }
);


export const ReplyDocument = gql`
    mutation reply($comment: CommentInput!, $inReplyToCommentId: String!, $threadId: String!) {
  createReply(comment: $comment, inReplyToId: $inReplyToCommentId, threadId: $threadId) {
    ...ActivityPreviewCommentCtxBase
  }
}
    ${ActivityPreviewCommentCtxBaseFragmentDoc}`;
export type ReplyMutationFn = ApolloReactCommon.MutationFunction<ReplyMutation, ReplyMutationVariables>;
export type ReplyComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<ReplyMutation, ReplyMutationVariables>, 'mutation'>;

    export const ReplyComponent = (props: ReplyComponentProps) => (
      <ApolloReactComponents.Mutation<ReplyMutation, ReplyMutationVariables> mutation={ReplyDocument} {...props} />
    );
    
export type ReplyProps<TChildProps = {}> = ApolloReactHoc.MutateProps<ReplyMutation, ReplyMutationVariables> & TChildProps;
export function withReply<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  ReplyMutation,
  ReplyMutationVariables,
  ReplyProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, ReplyMutation, ReplyMutationVariables, ReplyProps<TChildProps>>(ReplyDocument, {
      alias: 'reply',
      ...operationOptions
    });
};

/**
 * __useReplyMutation__
 *
 * To run a mutation, you first call `useReplyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReplyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [replyMutation, { data, loading, error }] = useReplyMutation({
 *   variables: {
 *      comment: // value for 'comment'
 *      inReplyToCommentId: // value for 'inReplyToCommentId'
 *      threadId: // value for 'threadId'
 *   },
 * });
 */
export function useReplyMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ReplyMutation, ReplyMutationVariables>) {
        return ApolloReactHooks.useMutation<ReplyMutation, ReplyMutationVariables>(ReplyDocument, baseOptions);
      }
export type ReplyMutationHookResult = ReturnType<typeof useReplyMutation>;
export type ReplyMutationResult = ApolloReactCommon.MutationResult<ReplyMutation>;
export type ReplyMutationOptions = ApolloReactCommon.BaseMutationOptions<ReplyMutation, ReplyMutationVariables>;


export interface ReplyMutationOperation {
  operationName: 'reply'
  result: ReplyMutation
  variables: ReplyMutationVariables
  type: 'mutation'
}
