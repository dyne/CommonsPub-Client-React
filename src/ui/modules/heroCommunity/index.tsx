import React, { SFC } from 'react';
import { Box, Text, Flex, Button } from 'rebass/styled-components';
import styled from 'ui/themes/styled';
import { clearFix } from 'polished';
import { Settings } from 'react-feather';
import media from 'styled-media-query';
import { Trans } from '@lingui/react';
import { throwUnimplementedFn } from 'common/util/ctx-mock/throwUnimplementedFn';
import EditCommunityModal from 'ui/modules/EditCommunityModal';
import { FormikHook } from 'common/types';

interface Props {
  communityId: string;
}

export interface HeroContextData {
  community: {
    icon: string;
    name: string;
    summary?: string;
    preferredUsername: string;
    totalMembers: number;
    following: boolean;
    canModify: boolean;
    joinFormik: FormikHook<{}>;
  } | null;
}

export type HeroContext = (cfg: { communityId: string }) => HeroContextData;

export const HeroContext = React.createContext<HeroContext>(
  throwUnimplementedFn<HeroContext>('HeroContext')
);

export const HeroCommunity: SFC<Props> = ({ communityId }) => {
  const [, setOpenMembers] = React.useState(false);
  const [isOpenSettings, setOpenSettings] = React.useState(false);
  const { community: c } = React.useContext(HeroContext)({ communityId });
  return !c ? (
    <Text>Loading...</Text>
  ) : (
    <Box p={1} mb={2}>
      <Hero>
        <Background
          id="header"
          style={{
            backgroundImage: `url(${c.icon})`
          }}
        />
        <HeroInfo>
          <Title variant="heading" mt={0}>
            {c.name}
          </Title>
          <Username mt={2} fontSize={2}>
            @{c.preferredUsername}
          </Username>
          {c.summary && (
            <Summary variant="text" mt={2}>
              {c.summary}
            </Summary>
          )}
          <Flex mt={3}>
            <MembersTot onClick={() => setOpenMembers(true)}>
              <Text>
                {c.totalMembers} <Trans>Members</Trans>
              </Text>
            </MembersTot>
            <Actions>
              {c.canModify ? (
                <EditButton onClick={() => setOpenSettings(true)}>
                  <Settings size={18} color={'#f98012'} />
                </EditButton>
              ) : null}
              <Button
                disabled={c.joinFormik.isSubmitting}
                onClick={c.joinFormik.submitForm}
              >
                {c.following ? <Trans>Leave</Trans> : <Trans>Join</Trans>}
              </Button>
            </Actions>
          </Flex>
        </HeroInfo>
      </Hero>
      {isOpenSettings && (
        <EditCommunityModal
          communityId={communityId}
          closeModal={() => setOpenSettings(false)}
        />
      )}
    </Box>
  );
};
const Title = styled(Text)`
  ${media.lessThan('medium')`
font-size: 20px !important;
`};
`;

const Summary = styled(Text)`
  ${media.lessThan('medium')`
    display: none;
`};
`;
const Actions = styled(Flex)`
  align-items: center;
`;

const Username = styled(Text)`
  color: ${props => props.theme.colors.gray};
  font-weight: 500;
`;

const MembersTot = styled.div`
  margin-top: 0px;
  font-size: 12px;
  cursor: pointer;
  cursor: pointer;
  flex: 1;
  ${clearFix()} & span {
    margin-right: 8px;
    float: left;
    height: 32px;
    line-height: 32px;
    & svg {
      vertical-align: middle;
    }
    .--rtl & {
      float: right;
      margin-right: 0px;
      margin-left: 8px;
    }
  }
`;

const EditButton = styled.span`
  height: 40px;
  font-weight: 600;
  font-size: 13px;
  line-height: 38px;
  cursor: pointer;
  display: inline-block;
  width: 40px;
  height: 40px;
  vertical-align: bottom;
  margin-right: 16px;
  border-radius: 40px;
  text-align: center;
  border: 1px solid ${props => props.theme.colors.orange};
  cursor: pointer;
  & svg {
    text-align: center;
    vertical-align: text-bottom;
    color: inherit !important;
  }
  .--rtl & {
    margin-right: 0px;
    margin-left: 16px;
  }
`;

const Hero = styled.div`
  width: 100%;
  position: relative;
`;

const Background = styled.div`
  margin-top: 24px;
  height: 250px;
  background-size: cover;
  background-repeat: no-repeat;
  background-color: ${props => props.theme.colors.gray};
  position: relative;
  margin: 0 auto;
  border-radius: 4px;
  background-position: center center;
  ${media.lessThan('medium')`
    display: none;
`};
`;

const HeroInfo = styled.div`
  padding: 16px;
  ${media.lessThan('medium')`
   padding: 8px;
`} & button {
    span {
      vertical-align: sub;
      display: inline-block;
      height: 30px;
      margin-right: 4px;
    }
  }
`;

export default HeroCommunity;
