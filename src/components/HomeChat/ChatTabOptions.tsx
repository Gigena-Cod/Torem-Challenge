import * as Menu from '@radix-ui/react-context-menu';
import { useEffect } from 'react';
import styled from 'styled-components';

const Container = styled.div<{ isOpen: boolean }>`
  background-color: #fff;
  border: 1px solid #eee;
  padding: 5px;
  position: absolute;
  right: 0;
  z-index: 10;
  display: ${(props) => (props.isOpen ? 'block' : 'none')}; ;
`;

const Item = styled.div`
  color: #000;
  padding: 3px;
  cursor: pointer;
  transition: 0.3s ease;

  &:hover {
    color: #fff;
    background-color: #36dd81;
  }
`;

interface ChatTabOptionsProps {
  isOpen: boolean;
  handleDeleteChat: () => void;
  handleShowTickets: (ticketOpen: boolean) => void;
}

const ChatTabOptions = ({
  isOpen,
  handleShowTickets,
  handleDeleteChat
}: ChatTabOptionsProps) => {
  return (
    <Container isOpen={isOpen}>
      <Item onClick={() => handleShowTickets(true)}>Ver ticket abierto</Item>
      <Menu.Separator />
      <Item onClick={() => handleShowTickets(false)}>Ver ticket cerrado</Item>
      <Menu.Separator />
      <Item onClick={handleDeleteChat}>Eliminar Chats</Item>
    </Container>
  );
};

export default ChatTabOptions;
