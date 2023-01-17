import { useEffect } from 'react';
import styled from 'styled-components';
import { TicketData } from '../types/chat';
import Ticket from './Ticket';

interface ticketsModalProps {
  TicketInformation: TicketData;
  handlerCloseModal: (value: boolean) => void;
}

const ModalContainer = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  padding: 1rem;
  background-color: rgba(0, 0, 0, 0.25);
  align-items: center;
  justify-content: center;
  z-index: 99999999;
`;

const ModalContent = styled.div`
  padding: 1rem;
  color: black;
  max-width: 60rem;
  width: 100%;
  background-color: white;
  border-radius: 1rem;
`;

const Close = styled.div`
  text-align: end;
  color: black;
  font-size: 1.25rem; /* 20px */
  line-height: 1.75rem; /* 28px */
`;

const TicketsModal = (confirmDialogProps: ticketsModalProps) => {
  const { TicketInformation, handlerCloseModal } = confirmDialogProps;

  const handleClickShowOpenTicket = () => {
    handlerCloseModal(false);
  };

  useEffect(() => {
    console.log(TicketInformation);
  }, []);

  return (
    <ModalContainer>
      <ModalContent>
        <Close onClick={handleClickShowOpenTicket}>X</Close>
        <Ticket {...TicketInformation} />
      </ModalContent>
    </ModalContainer>
  );
};

export default TicketsModal;
