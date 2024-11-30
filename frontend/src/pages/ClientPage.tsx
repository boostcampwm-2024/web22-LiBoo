import styled from 'styled-components';
import { ClientView, Header } from '@components/client';
import { ClientChatRoom } from '@components/chat';
import { AsyncBoundary } from '@components/common/AsyncBoundary';
import { PlayerStreamError } from '@components/error';

export default function ClientPage() {
  return (
    <>
      <Header />
      <ClientContainer>
        <AsyncBoundary pendingFallback={<></>} rejectedFallback={() => <PlayerStreamError />}>
          <ClientView />
          <ClientChatRoom />
        </AsyncBoundary>
      </ClientContainer>
    </>
  );
}

const ClientContainer = styled.div`
  box-sizing: border-box;
  padding-top: 70px;
  height: 100%;
  display: flex;
  background-color: ${({ theme }) => theme.tokenColors['susrface-default']};
`;
