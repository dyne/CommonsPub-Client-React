import * as React from 'react';
import compose from 'recompose/compose';
import { graphql, GraphqlQueryControls, OperationOption } from 'react-apollo';

import { Trans } from '@lingui/macro';

import H4 from '../../components/typography/H4/H4';
import styled from '../../themes/styled';
import Main from '../../components/chrome/Main/Main';
import Collection from '../../types/Collection';
import Loader from '../../components/elements/Loader/Loader';
import CollectionCard from '../../components/elements/Collection/Collection';

const {
  getFollowedCollections
} = require('../../graphql/getFollowedCollections.graphql');

interface Data extends GraphqlQueryControls {
  followingCollections: Collection[];
}

interface Props {
  data: Data;
}

class CommunitiesYours extends React.Component<Props> {
  render() {
    let body;

    if (this.props.data.error) {
      body = (
        <span>
          <Trans>Error loading collections</Trans>
        </span>
      );
    } else if (this.props.data.loading) {
      body = <Loader />;
    } else {
      body = this.props.data.followingCollections.map((comm, i) => (
        <CollectionCard key={i} collection={comm} communityId={comm.localId} />
      ));
    }
    console.log(body);
    return (
      <Main>
        <WrapperCont>
          <Wrapper>
            <H4>
              <Trans>Followed Collections</Trans>
            </H4>
            <List>{body}</List>
          </Wrapper>
        </WrapperCont>
      </Main>
    );
  }
}

const WrapperCont = styled.div`
  max-width: 1040px;
  margin: 0 auto;
  width: 100%;
  background: white;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-bottom: 24px;
  & h4 {
    font-size: 16px !important;
    margin: 0;
    padding-left: 8px;
    border-bottom: 1px solid #dadada;
    line-height: 32px !important;
    margin-block-end: 0;
  }
`;
const List = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-column-gap: 16px;
  grid-row-gap: 16px;
`;

const withGetCommunities = graphql<
  {},
  {
    data: {
      followingCollections: Collection[];
    };
  }
>(getFollowedCollections) as OperationOption<{}, {}>;

export default compose(withGetCommunities)(CommunitiesYours);