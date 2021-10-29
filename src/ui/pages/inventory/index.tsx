import { Trans } from '@lingui/macro';
import * as React from 'react';
import PaginationComponent from 'react-reactstrap-pagination';
import { Plus } from 'react-feather';
import { NavLink } from 'react-router-dom';
import { Box, Text } from 'rebass/styled-components';
import { EconomicResource } from 'HOC/pages/inventory/InventoryPage';
import { EconomicResourcesFilteredQuery } from 'HOC/pages/inventory/InventoryPage.generated';
import { InventoryWrapper, InfoWrapper, ImageWrapper, Icon } from 'ui/pages/resource';
import { Wrapper } from 'ui/elements/Layout';
import { PAGE_LIMIT, PAGE_START, MAX_PAGINATION_NUMBERS } from 'util/constants/pagination';
import { typography } from '../../../mn-constants';
import styled from '../../themes/styled';
import { ButtonWrapper, CreateItemButton } from '../community';
import { useMe } from 'fe/session/useMe';
import { useEffect, useState } from 'react';

const BoxIcon = require('react-feather/dist/icons/box').default;
const PenIcon = require('react-feather/dist/icons/edit').default;
const UserIcon = require('react-feather/dist/icons/user').default;

export interface Props {
  done: () => void;
  inventory: EconomicResourcesFilteredQuery['economicResourcesFiltered'] | any;
}

export const Inventory: React.FC<Props> = ({ inventory, done, children }) => {
  const { me } = useMe();
  const currentUser = me?.user?.id;
  const [currentList, setCurrentList] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const handlePagination = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    if (inventory.length) {
      const newList = inventory.slice(
        (currentPage - 1) * PAGE_LIMIT,
        (currentPage - 1) * PAGE_LIMIT + PAGE_LIMIT
      );
      setCurrentList(newList);
    }
  }, [inventory, currentPage]);

  useEffect(() => {
    setCurrentPage(PAGE_START);
  }, [inventory.length]);

  return (
    <>
      <ButtonWrapper>
        <CreateItemButton variant="primary" onClick={done}>
          <Plus size={16} color={'#fff'} />
          <Text variant="button">
            <Trans>Create a new resource</Trans>
          </Text>
        </CreateItemButton>
      </ButtonWrapper>
      <Wrapper>{children}</Wrapper>
      <Wrapper>
        {!!currentList.length &&
          currentList.map(
            ({ id, name, note, image, onhandQuantity, primaryAccountable }: EconomicResource) => (
              <WrapperLink to={`/resource/${id}`} key={id}>
                <InventoryWrapper key={id}>
                  <ImageWrapper>{image && <img src={image} alt={name} />}</ImageWrapper>
                  <InfoWrapper>
                    <Title variant="subhead">{name}</Title>
                    <Box mr={1}>
                      <Text variant="text">
                        <Icon>
                          <PenIcon size="16" />
                        </Icon>
                        <b>
                          <Trans>Note:</Trans>{' '}
                        </b>{' '}
                        <Trans>{note ? note : 'Not provided'}</Trans>
                      </Text>
                    </Box>
                    <Box mr={1}>
                      <Text variant="text">
                        <Icon>
                          <BoxIcon size="16" />
                        </Icon>
                        <b>Quantity in stock:</b>{' '}
                        <span
                          style={{
                            color:
                              onhandQuantity && onhandQuantity.hasNumericalValue < 0
                                ? 'red'
                                : 'inherit'
                          }}
                        >
                          {onhandQuantity
                            ? `${onhandQuantity.hasNumericalValue} ${onhandQuantity.hasUnit.label}`
                            : 'Not provided'}
                        </span>
                      </Text>
                    </Box>
                    <Box mr={1}>
                      <Text variant="text">
                        <Icon>
                          <UserIcon size="16" />
                        </Icon>
                        <b>
                          <Trans>Owner:</Trans>
                        </b>{' '}
                        {primaryAccountable?.id === currentUser ? 'Me' : primaryAccountable?.name}
                      </Text>
                    </Box>
                  </InfoWrapper>
                </InventoryWrapper>
              </WrapperLink>
            )
          )}
        {!!currentList.length && (
          <PaginationWrapper>
            <PaginationComponent
              size="sm"
              totalItems={inventory.length}
              pageSize={PAGE_LIMIT}
              onSelect={handlePagination}
              maxPaginationNumbers={MAX_PAGINATION_NUMBERS}
              defaultActivePage={PAGE_START}
              previousPageText="Prev"
            />
          </PaginationWrapper>
        )}
      </Wrapper>
    </>
  );
};

export default Inventory;

const PaginationWrapper = styled('div')`
  text-align: center;

  ul {
    padding: 10px 0 20px;
    margin: 0;
  }

  .page-link {
    line-height: 30px;
    border: 1px solid #999;
    color: #999;
    background-color: #fff;
    border-radius: 4px;
    margin: 2px;
  }

  .page-item.active .page-link {
    border: 1px solid #02e379;
    color: #02e379;
  }
`;

const WrapperLink = styled(NavLink)`
  text-decoration: none !important;

  * {
    text-decoration: none !important;
  }
`;

const Title = styled(Text)`
  font-size: ${typography.size.m1};
  color: ${props => props.theme.colors.dark};
  text-decoration: none !important;
  margin-bottom: 10px;

  &:hover {
    text-decoration: underline !important;
  }
`;
