import styled from '@emotion/styled';
import { IconButton } from '@mui/material';
import { CloseIcon } from 'zignaly-ui';

export const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  margin-bottom: 14px;
  padding: 40px 40px 0px 56px;
`;

export const HeaderButton = styled.button<any>`
  border: 0;
  padding: 0;
  margin: 0;
  height: 32px;
  width: 32px;
  background: transparent;
  border: none;
  cursor: pointer;

  ${({ theme }) => `
    svg { 
      fill: ${theme.neutral300};
      width: 32px;
      height: 32px;
    }
  `}
`;

export const Inline = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 12px;
`;

export const StyledCloseIcon = styled(CloseIcon as any)`
  width: 15px;
  height: 15px;
  color: #65647e;
`;

export const CloseButton = styled(IconButton)`
  position: absolute;
  right: 16px;
`;
