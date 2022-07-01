import React, { useRef } from 'react';
import ReactDOM from 'react-dom';
import { useClickAway } from 'react-use';
import useAuthenticate from '../../../hooks/useAuthenticate';
import ConnectWalletModal from '../ConnectWallet';
import { Backdrop } from './styles';

const SuperModal = ({
  modalId,
  showModal,
  toggle,
}: {
  modalId: string;
  showModal: boolean;
  toggle: Function;
}) => {
  const modalRef = useRef(null);
  const authenticate = useAuthenticate();

  useClickAway(modalRef, () => {
    if (showModal) {
      toggle();
    }
  });

  return showModal
    ? ReactDOM.createPortal(
        <Backdrop>
          <div ref={modalRef}>
            {modalId === 'connectWallet' && (
              <ConnectWalletModal
                onClickClose={toggle}
                metaMaskOnClick={authenticate}
                walletConnectOnClick={undefined}
              />
            )}
          </div>
        </Backdrop>,
        document.getElementById('modal-root'),
      )
    : null;
};

export default SuperModal;
