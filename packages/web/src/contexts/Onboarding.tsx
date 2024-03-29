import React, { createContext, useCallback, useState } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import DepositInput from '../components/Onboarding/DepositInput';
import { useTranslation } from 'react-i18next';
import Typography from '@mui/material/Typography';
import Onboarding from '../components/Onboarding/Onboarding';

type OnboardingType = {
  closeOnboarding: () => void;
  startOnboarding: () => void;
  balanceOnboarding: () => void;
};

export const onboardingContext = createContext<OnboardingType>(
  {} as OnboardingType,
);

const { Provider } = onboardingContext;

export const OnboardingProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [isMoneyModalOpen, setIsMoneyModalOpen] = useState(false);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const startOnboarding = useCallback(() => setIsOnboardingOpen(true), []);
  const balanceOnboarding = useCallback(() => setIsMoneyModalOpen(true), []);
  const { t } = useTranslation('global');
  useTranslation('balance');
  return (
    <Provider
      value={{
        closeOnboarding: () => {
          setIsOnboardingOpen(false);
          setIsOnboardingOpen(false);
        },
        startOnboarding,
        balanceOnboarding,
      }}
    >
      <Dialog
        open={isMoneyModalOpen}
        onClose={() => setIsMoneyModalOpen(false)}
      >
        <DialogTitle>{t('balance:buy-bids')}</DialogTitle>
        <DialogContent>
          <Typography marginBottom={2}>
            {t('balance:buy-bids-explainer')}
          </Typography>
          <DepositInput />
        </DialogContent>
      </Dialog>

      <Dialog
        scroll={'paper'}
        fullWidth
        maxWidth={'sm'}
        open={isOnboardingOpen}
        onClose={() => setIsOnboardingOpen(false)}
      >
        <DialogContent>
          <Onboarding />
        </DialogContent>
      </Dialog>

      {children}
    </Provider>
  );
};
