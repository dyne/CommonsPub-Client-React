import { useCommunityPreview } from 'fe/community/preview/useCommunityPreview';
import { Community } from 'graphql/types.generated';
import React, { FC, useMemo } from 'react';
import {
  Community as CommunityPreviewUI,
  Props as CommunityPreviewProps
} from 'ui/modules/Previews/Community';
import { useFormik } from 'formik';

export interface Props {
  communityId: Community['id'];
}

export const CommunityPreviewHOC: FC<Props> = ({ communityId }) => {
  const { community, toggleFollow } = useCommunityPreview(communityId);

  const toggleJoinFormik = useFormik({
    initialValues: {},
    onSubmit: toggleFollow
  });
  const communityPreviewProps = useMemo<CommunityPreviewProps | null>(() => {
    if (!community) {
      return null;
    }

    const {
      icon,
      name,
      summary,
      myFollow,
      collectionCount,
      followerCount,
      threads
    } = community;

    const props: CommunityPreviewProps = {
      icon: icon || '',
      name,
      summary: summary || '',
      collectionsCount: collectionCount || 0,
      followed: !!myFollow,
      followersCount: followerCount || 0,
      threadsCount: threads?.totalCount || 0,
      toggleJoinFormik
    };
    return props;
  }, [community, toggleJoinFormik]);

  return (
    communityPreviewProps && <CommunityPreviewUI {...communityPreviewProps} />
  );
};
