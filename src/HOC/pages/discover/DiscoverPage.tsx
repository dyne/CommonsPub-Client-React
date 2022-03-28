import { FeaturedCollections } from 'HOC/modules/FeaturedCollections/featuredCollections';
import React, { FC, useMemo } from 'react';
import { Discover, Props } from 'ui/pages/discover';
import { useInstanceOutboxActivities } from 'fe/activities/outbox/instance/useInstanceOutboxActivities';
import { ActivityPreviewHOC } from 'HOC/modules/previews/activity/ActivityPreview';
import { FeaturedCommunities } from 'HOC/modules/FeaturedCommunities/featuredCommunities';
import { useAllCommunities } from 'fe/community/all/useAllCommunities';
import { CommunityPreviewHOC } from 'HOC/modules/previews/community/CommunityPreview';
import { CollectionPreviewHOC } from 'HOC/modules/previews/collection/CollectionPreview';
import { useAllCollections } from 'fe/collection/all/useAllCollections';
import { Box } from 'rebass';
import { t } from '@lingui/macro';
import { usePageTitle } from 'context/global/pageCtx';
import { discoverLocation } from 'routes/DiscoverPageRoute';

export enum DiscoverPageTabs {
  Activities,
  Communities,
  Collections
}

export interface DiscoverPage {
  tab: DiscoverPageTabs;
  basePath: string;
}

const discoverActivitiesPageTitle = t`Discover Activities`;
const discoverCollectionsPageTitle = t`Discover Collections`;
const discoverCommunitiesPageTitle = t`Discover Communities`;

export const DiscoverPage: FC<DiscoverPage> = ({ basePath, tab }) => {
  const discovberPageTitle =
    tab === DiscoverPageTabs.Collections
      ? discoverCollectionsPageTitle
      : tab === DiscoverPageTabs.Communities
      ? discoverCommunitiesPageTitle
      : tab === DiscoverPageTabs.Activities
      ? discoverActivitiesPageTitle
      : discoverActivitiesPageTitle; //never
  usePageTitle(discovberPageTitle);

  const { activitiesPage } = useInstanceOutboxActivities();
  const [activitiesPageNext /* , activitiesPagePrevious */] = activitiesPage.formiks;

  const { allCommunitiesPage } = useAllCommunities();
  const [allCommunitiesPageNext /* , allCommunitiesPagePrevious */] = allCommunitiesPage.formiks;

  const { allCollectionsPage } = useAllCollections();
  const [allCollectionsPageNext /* , allCollectionsPagePrevious */] = allCollectionsPage.formiks;

  const propsUI = useMemo<Props>(() => {
    const FeaturedCollectionsBox = <FeaturedCollections />;
    const FeaturedCommunitiesBox = <FeaturedCommunities />;
    const ActivitiesBox = (
      <>
        {activitiesPage.edges.map(activity => (
          <ActivityPreviewHOC activityId={activity.id} key={activity.id} />
        ))}
      </>
    );

    const CollectionsBoxes = (
      <>
        {allCollectionsPage.edges.map(collection => (
          <Box m={2} key={collection.id}>
            <CollectionPreviewHOC collectionId={collection.id} />
          </Box>
        ))}
      </>
    );
    const CommunitiesBoxes = (
      <>
        {allCommunitiesPage.edges.map(community => (
          <Box m={2} key={community.id}>
            <CommunityPreviewHOC communityId={community.id} />
          </Box>
        ))}
      </>
    );
    const LoadMoreFormik =
      tab === DiscoverPageTabs.Activities
        ? activitiesPageNext
        : tab === DiscoverPageTabs.Collections
        ? allCollectionsPageNext
        : tab === DiscoverPageTabs.Communities
        ? allCommunitiesPageNext
        : null;

    const tabPaths: Props['tabPaths'] = {
      collections: discoverLocation.getPath({ tab: 'collections' }, undefined),
      communities: discoverLocation.getPath({ tab: 'communities' }, undefined),
      timeline: discoverLocation.getPath({ tab: undefined }, undefined)
    };

    const props: Props = {
      tabPaths,
      ActivitiesBox,
      FeaturedCollectionsBox,
      FeaturedCommunitiesBox,
      CollectionsBoxes,
      CommunitiesBoxes,
      LoadMoreFormik
    };

    return props;
  }, [
    activitiesPage.edges,
    activitiesPageNext,
    allCollectionsPage.edges,
    allCollectionsPageNext,
    allCommunitiesPage.edges,
    allCommunitiesPageNext,
    tab
  ]);

  return <Discover {...propsUI} />;
};
