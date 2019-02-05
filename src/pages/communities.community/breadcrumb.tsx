import * as React from 'react';
import { SFC } from 'react';

import { Trans } from '@lingui/macro';

import Link from '../../components/elements/Link/Link';
import styled from '../../themes/styled';

interface Props {
  name: string;
}

const Breadcrumb: SFC<Props> = ({ name }) => (
  <Main>
    <Link to="/communities">
      <Trans>Communities</Trans>
    </Link>
    {' > '}
    <span>{name}</span>
  </Main>
);

const Main = styled.div`
  font-size: 12px;
  font-weight: 700;
  text-decoration: none;
  text-transform: uppercase;
  height: 30px;
  line-height: 30px;
  background: #fff;
  padding: 0 8px;
  & a {
    font-size: 12px;
    font-weight: 700;
    text-decoration: none;
    text-transform: uppercase;
    margin-right: 6px;
  }
  & span {
    font-size: 12px;
    font-weight: 500;
    text-decoration: none;
    text-transform: uppercase;
    margin-left: 6px;
  }
`;

export default Breadcrumb;
