import { useState } from 'react';
import styled from 'styled-components';

import { IoCheckmarkDoneOutline } from 'react-icons/io5';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { ChatTabProps, TicketData } from '../../types/chat';
import ConfirmDialog from '../ConfirmDialog';
import { DeleteChat } from '../../network/lib/chats';
import { useAppDispatch } from '../../redux/hooks';
import { fetchChats } from '../../redux/chatsSlice';
import ChatOptions from './ChatTabOptions';
import TicketsModal from '../TicketsModal';
import { MockTicketData } from '../../utils/mockData';

const Container = styled.div<{ isSelected: boolean }>`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0px 6px;
  cursor: pointer;
  user-select: none;
  background: ${(props) => (props.isSelected ? '#36dd81' : '#fff')};
  transition: all 0.2s ease;

  &:first-child .chatInfo {
    border-top: none !important;
  }
  &:hover {
    background-color: #dddddd6e;
  }
  &:hover .dots {
    opacity: 50%;
    cursor: pointer;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 7px;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const ChatPhoto = styled.div`
  & .image {
    border-radius: 50%;
    width: 50px;
    height: 50px;
    border: 1px solid #ddd;
  }
`;

const ChatInfo = styled.div`
  display: flex;
  flex-direction: column;
  padding: 4px 0px;
  width: 100%;
  border-top: 1px solid #e9edef;
`;

const ChatInfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Name = styled.div`
  font-weight: 700;
  color: #101111;
`;

const LastMessageTime = styled.div`
  font-size: 12px;
  color: #101111;
  opacity: 50%;
  align-self: end;
`;

const ChatPreview = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2px;
  align-items: center;
`;

const MessagePreview = styled.div`
  font-size: 10px;
  opacity: 50%;
  color: #101111;
`;

const ChatTabDots = styled.div`
  color: #101111;
  display: flex;
  align-items: center;
  opacity: 0%;
`;

function ChatTab(chatTabProps: ChatTabProps) {
  const { name, image: photo, chatId, messages, selectedChat, onClick } = chatTabProps;

  const lastMessage = messages[0]
    ? messages.slice(-1)[0].message.slice(0, 55) + '...'
    : 'No hay mensajes.';

  const lastMessageTime = messages[0] ? messages.slice(-1)[0].timeDate.slice(11, 16) + ' p.m.' : '';

  const dispatch = useAppDispatch();

  const eraseChat = async () => {
    await DeleteChat(chatId);
    dispatch(fetchChats());

    /* 
      TODO: ✔
      1. Delete chat
    */
  };

  // DELETE CHAT MODAL
  const [isConfirmDialog, setIsConfirmDialog] = useState(false);

  const handleDeleteChat = () => {
    setIsConfirmDialog(true);
    setIsOpenChatOptions(false);
  };

  // CHAT OPTION
  const [isOpenChatOptions, setIsOpenChatOptions] = useState(false);
  const handleOpenChatsOptions = () => {
    setIsOpenChatOptions(true);
  };

  // TICKETS
  const [isShowTickets, setIsShowTickets] = useState(false);
  const [ticketSelected, setTicketSelected] = useState<TicketData>(MockTicketData[0]);

  const handleShowTickets = (open: boolean) => {
    open ? setTicketSelected(MockTicketData[0]) : setTicketSelected(MockTicketData[1]);
    setIsShowTickets(true);
    setIsOpenChatOptions(false);
  };

  return (
    <Container id="chatTab" isSelected={selectedChat === chatId} onClick={onClick}>
      <Wrapper>
        <ChatPhoto>
          <img src={`http://localhost:8080/${photo}`} alt="ProfilePhoto" className="image" />
        </ChatPhoto>
        <ChatInfo>
          <ChatInfoWrapper>
            <Name>{name}</Name>
            <LastMessageTime>{lastMessageTime}</LastMessageTime>
          </ChatInfoWrapper>
          <ChatPreview>
            <div>
              <IoCheckmarkDoneOutline />
            </div>
            <MessagePreview>{lastMessage}</MessagePreview>
          </ChatPreview>
        </ChatInfo>
      </Wrapper>
      <ChatTabDots className="dots" onClick={handleOpenChatsOptions}>
        <BsThreeDotsVertical />
      </ChatTabDots>

      <ConfirmDialog
        title="Eliminar chat"
        text="¿Está seguro que desea borrar la conversación?"
        handleOk={eraseChat}
        handleCancel={setIsConfirmDialog}
        isOpen={isConfirmDialog}
      />
      {isShowTickets && (
        <TicketsModal
          handlerCloseModal={setIsShowTickets}
          TicketInformation={ticketSelected}
        />
      )}
      <ChatOptions
        isOpen={isOpenChatOptions}
        handleShowTickets={handleShowTickets}
        handleDeleteChat={handleDeleteChat}
      />
    </Container>
  );
}

export default ChatTab;
