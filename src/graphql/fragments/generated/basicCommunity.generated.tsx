import * as Types from '../../types.d';

import gql from 'graphql-tag';

export type BasicCommunityFragment = { __typename?: 'Community' } & Pick<
  Types.Community,
  | 'id'
  | 'canonicalUrl'
  | 'preferredUsername'
  | 'name'
  | 'summary'
  | 'icon'
  | 'image'
  | 'createdAt'
  | 'updatedAt'
  | 'lastActivity'
  | 'isLocal'
  | 'isPublic'
  | 'isDisabled'
> & {
    myFollow: Types.Maybe<{ __typename?: 'Follow' } & Pick<Types.Follow, 'id'>>;
    primaryLanguage: Types.Maybe<
      { __typename?: 'Language' } & Pick<
        Types.Language,
        'id' | 'englishName' | 'localName'
      >
    >;
    followers: Types.Maybe<
      { __typename?: 'FollowsEdges' } & Pick<Types.FollowsEdges, 'totalCount'>
    >;
    threads: Types.Maybe<
      { __typename?: 'ThreadsEdges' } & Pick<Types.ThreadsEdges, 'totalCount'>
    >;
    outbox: Types.Maybe<
      { __typename?: 'ActivitiesEdges' } & Pick<
        Types.ActivitiesEdges,
        'totalCount'
      >
    >;
  };

export const BasicCommunityFragmentDoc = gql`
  fragment BasicCommunity on Community {
    id
    canonicalUrl
    preferredUsername
    name
    summary
    icon
    image
    createdAt
    updatedAt
    lastActivity
    isLocal
    isPublic
    isDisabled
    myFollow {
      id
    }
    primaryLanguage {
      id
      englishName
      localName
    }
    followers {
      totalCount
    }
    threads {
      totalCount
    }
    outbox {
      totalCount
    }
  }
`;

export interface IntrospectionResultData {
  __schema: {
    types: {
      kind: string;
      name: string;
      possibleTypes: {
        name: string;
      }[];
    }[];
  };
}

const result: IntrospectionResultData = {
  __schema: {
    types: [
      {
        kind: 'UNION',
        name: 'ActivityContext',
        possibleTypes: [
          {
            name: 'Collection'
          },
          {
            name: 'Comment'
          },
          {
            name: 'Community'
          },
          {
            name: 'Resource'
          }
        ]
      },
      {
        kind: 'UNION',
        name: 'FlagContext',
        possibleTypes: [
          {
            name: 'Collection'
          },
          {
            name: 'Comment'
          },
          {
            name: 'Community'
          },
          {
            name: 'Resource'
          },
          {
            name: 'User'
          }
        ]
      },
      {
        kind: 'UNION',
        name: 'LikeContext',
        possibleTypes: [
          {
            name: 'Collection'
          },
          {
            name: 'Comment'
          },
          {
            name: 'Resource'
          },
          {
            name: 'User'
          }
        ]
      },
      {
        kind: 'UNION',
        name: 'ThreadContext',
        possibleTypes: [
          {
            name: 'Collection'
          },
          {
            name: 'Community'
          },
          {
            name: 'Flag'
          },
          {
            name: 'Resource'
          }
        ]
      },
      {
        kind: 'UNION',
        name: 'FollowContext',
        possibleTypes: [
          {
            name: 'Collection'
          },
          {
            name: 'Community'
          },
          {
            name: 'Thread'
          },
          {
            name: 'User'
          }
        ]
      }
    ]
  }
};

export default result;
