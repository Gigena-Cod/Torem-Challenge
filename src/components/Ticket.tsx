import styled from 'styled-components';
import { TicketData, TicketStatus } from '../types/chat';

const TicketContainer = styled.div`
  position: relative;
  color: white;
  max-width: 35rem;
  margin: auto;
  padding: 1rem;
`;
const TicketSectionOne = styled.div`
  width: 75%;
  padding-right: 2rem;
`;
const TicketSectionTwo = styled.div`
  width: 25%;
  display: flex;
  align-items: flex-end;
  flex-direction: column;
  border-left: 0.125rem;
  border-left-style: dashed;
`;

const TicketTitle = styled.div`
  font-weight: 800;
  font-size: 1rem; /* 16px */
  line-height: 1.5rem; /* 24px */
`;
const TicketDescription = styled.div`
  overflow: hidden;
  margin-top: 0.25rem;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 0.875rem; /* 14px */
  line-height: 1.25rem; /* 20px */
`;
const TicketContent = styled.div<{ statusTicket: TicketStatus }>`
  padding: 1rem 1.25rem;
  display: flex;
  background-color: ${(props) => (props.statusTicket ? '#36dd81' : '#DB0000')};
`;
const TicketSpecific = styled.div`
  display: flex;
  margin-top: 1.5rem;
  align-items: center;
  gap: 0.75rem;
  text-transform: uppercase;
`;
const TicketUser = styled.span<{ statusTicket: TicketStatus }>`
  color: ${(props) => (props.statusTicket ? '#36dd81' : '#DB0000')};
  border-radius: 1rem;
  background-color: white;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
`;
const Bar = styled.span`
  height: 1.125rem;
  width: 1px;
  background-color: white;
`;
const TicketType = styled.span``;
const TicketDate = styled.span``;

const Status = styled.span<{ statusTicket: TicketStatus }>`
  margin-top: 0.25rem;
  color: ${(props) => (props.statusTicket ? '#36dd81' : '#DB0000')};
  border-radius: 1rem;
  background-color: white;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
`;
const TicketCode = styled.span`
  margin-top: 1.5rem;
`;
const CorteTop = styled.span`
  width: 2rem;
  height: 1.25rem;
  background: white;
  -moz-border-radius: 100px 100px 0 0;
  -webkit-border-radius: 100px 100px 0 0;
  border-radius: 0 0 100px 100px;
  position: absolute;
  top: 1rem;
  right: 25%;
`;
const CorteBottom = styled.span`
  width: 2rem;
  height: 1.25rem;
  background: white;
  -moz-border-radius: 100px 100px 0 0;
  -webkit-border-radius: 100px 100px 0 0;
  border-radius: 100px 100px 0 0;
  position: absolute;
  bottom: 1rem;
  right: 25%;
`;
const Ticket = ({ title, description, brand, tag, id, date, priority, status }: TicketData) => {
  const fomatterDate = () => `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;

  return (
    <TicketContainer className="ticket">
      <TicketContent statusTicket={status}>
        <TicketSectionOne>
          <TicketTitle>{title}</TicketTitle>
          <TicketDescription>{description}</TicketDescription>
          <TicketSpecific>
            <TicketUser statusTicket={status}>{brand}</TicketUser>
            <Bar></Bar>
            <TicketType>{tag}</TicketType>
          </TicketSpecific>
        </TicketSectionOne>
        <TicketSectionTwo>
          <TicketDate>{fomatterDate()}</TicketDate>
          <Status statusTicket={status}>{priority}</Status>
          <TicketCode>#{id}</TicketCode>
        </TicketSectionTwo>
        <CorteTop />
        <CorteBottom />
      </TicketContent>
    </TicketContainer>
  );
};

export default Ticket;
