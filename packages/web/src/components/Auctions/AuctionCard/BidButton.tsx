import { useMutation } from '@apollo/client';
import { BID_AUCTION } from '../queries';
import { LoadingButton } from '@mui/lab';
import React, { useCallback, useContext, useMemo, useState } from 'react';
import { AuctionType } from '@zigraffle/shared/types';
import useCurrentUser from '../../../hooks/useCurrentUser';
import { useTranslation } from 'react-i18next';
import { styled } from '@mui/material/styles';
import useBalance from '../../../hooks/useBalance';
import { BigNumber } from 'ethers';
import { getWinningLosingStatus } from './util';
import useAuthenticate from '../../../hooks/useAuthenticate';
import { onboardingContext } from '../../../contexts/Onboarding';

const Button = styled(LoadingButton, {
  shouldForwardProp: (p) => p !== 'state',
})<{ state: BidButtonState }>`
  flex: 1;
  min-height: 50px;
`;

enum BidButtonState {
  NotLoggedIn,
  NotEnoughFunds,
  Default,
  Winning,
  Losing,
}

// Smarted button in the history of buttons, maybe ever
const BidButton: React.FC<{ auction: AuctionType }> = ({ auction }) => {
  const [bid, { loading: isBidding }] = useMutation(BID_AUCTION);
  const { balance } = useBalance();
  const { user } = useCurrentUser();
  const { balanceOnboarding } = useContext(onboardingContext);
  const authenticate = useAuthenticate();
  const [showTrueSelf, setShowTrueSelf] = useState(false);
  const { t } = useTranslation('auction');

  const state = useMemo(() => {
    if (!user) return BidButtonState.NotLoggedIn;
    if (
      BigNumber.from(balance).lt(
        BigNumber.from(auction.minimalBid).add(auction.bidFee),
      )
    )
      return BidButtonState.NotEnoughFunds;
    const winState = getWinningLosingStatus(auction);
    if (winState.isWinning) return BidButtonState.Winning;
    if (winState.isLosing) return BidButtonState.Losing;
    return BidButtonState.Default;
  }, [user, balance, auction]);

  const buttonColor = useMemo(() => {
    if (state === BidButtonState.NotLoggedIn) return 'prettyPink';
    if (state === BidButtonState.NotEnoughFunds) return 'greedyGreen';
    return 'primary';
  }, [state]);

  const customButtonText = useMemo(() => {
    if (state === BidButtonState.NotLoggedIn) return t('global:log-in');
    if (state === BidButtonState.NotEnoughFunds) return t('global:get-funds');
  }, [state]);

  const bidClickHandler = useCallback(() => {
    if (state === BidButtonState.NotLoggedIn) {
      authenticate();
    } else if (state === BidButtonState.NotEnoughFunds) {
      balanceOnboarding();
    } else {
      bid({
        variables: {
          id: auction.id,
          value: auction.minimalBid,
        },
      }).catch((e) => {
        // TODO: better alerts
        alert(e.toString());
      });
    }
  }, [state, authenticate, balanceOnboarding]);

  return (
    <Button
      state={state}
      variant={'contained'}
      loading={isBidding}
      color={showTrueSelf ? buttonColor : 'primary'}
      disabled={isBidding}
      onMouseEnter={() => setShowTrueSelf(true)}
      onMouseLeave={() => setShowTrueSelf(false)}
      size='large'
      onClick={bidClickHandler}
    >
      {(showTrueSelf && customButtonText) ||
        t('make-bid', { bid: auction.minimalBid })}
    </Button>
  );
};

export default BidButton;
