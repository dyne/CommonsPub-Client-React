import * as React from 'react';
import Alert from 'ui/elements/Alert/index';
import { X } from 'react-feather';
import styled from 'ui/themes/styled';
import { Box } from 'rebass';
import media from 'styled-media-query';

export const TopMessage: React.FC = () => {
  const [show, setShow] = React.useState(true);
  return show ? (
    <AlertWrap>
      <Alert variant="warning">
        <div style={{ textAlign: 'center' }}>
          This site is currently in active development. We are looking forward to reading your
          feedback and ideas in our issue tracker
          <span
            style={{
              cursor: 'pointer',
              position: 'absolute',
              top: '2px',
              right: '2px'
            }}
            onClick={() => setShow(false)}
          >
            <X size={16} />
          </span>
        </div>
      </Alert>
    </AlertWrap>
  ) : null;
};

const AlertWrap = styled(Box)`
  position: absolute;
  z-index: 9;
  left: 50%;
  width: 250px;
  margin-left: -125px !important;
  ${media.greaterThan('medium')`
    top 10px;
  `}
  ${media.lessThan('medium')`
    top 50%;
  `}
`;
