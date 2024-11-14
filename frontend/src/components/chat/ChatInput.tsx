import styled, { css } from 'styled-components';
import SpeechBubbleIcon from '@assets/icons/speech-bubble.svg';
import QuestionIcon from '@assets/icons/question.svg';
import SendIcon from '@assets/icons/send.svg';
import { useRef, useEffect, useState } from 'react';

interface ChatInputProps {
  type: 'normal' | 'question';
}

export const ChatInput = ({ type }: ChatInputProps) => {
  const [hasInput, setHasInput] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    const handleResize = () => {
      if (textareaRef.current) {
        textareaRef.current.style.height = '14px';
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight - 5}px`;
      }
    };

    if (textareaRef.current) {
      textareaRef.current.addEventListener('input', handleResize);
      handleResize();
    }

    return () => {
      if (textareaRef.current) {
        textareaRef.current.removeEventListener('input', handleResize);
      }
    };
  }, []);

  const handleBlur = () => {
    if (textareaRef.current) {
      setHasInput(textareaRef.current.value.length > 0);
      setIsFocused(false);
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  return (
    <ChatInputWrapper $hasInput={hasInput} $isFocused={isFocused}>
      <InputBtn aria-label={type}>
        {type === 'normal' ? <StyledIcon as={SpeechBubbleIcon} /> : <StyledIcon as={QuestionIcon} />}
      </InputBtn>
      <ChatInputArea
        ref={textareaRef}
        placeholder={`${type === 'normal' ? '채팅' : '질문'}을 입력해주세요`}
        onBlur={handleBlur}
        onFocus={handleFocus}
      />
      <InputBtn aria-label="전송">
        <StyledIcon as={SendIcon} />
      </InputBtn>
    </ChatInputWrapper>
  );
};
export default ChatInput;

const ChatInputWrapper = styled.div<{ $hasInput: boolean; $isFocused: boolean }>`
  min-height: 20px;
  display: flex;
  padding: 5px 10px;
  gap: 10px;
  border: 3px solid ${({ theme }) => theme.tokenColors['text-weak']};
  border-radius: 7px;
  background-color: transparent;

  ${({ $isFocused, $hasInput }) =>
    !$hasInput &&
    !$isFocused &&
    css`
      border: 3px solid transparent;
      background-color: #373a3f;
    `}
`;

const ChatInputArea = styled.textarea`
  width: 100%;
  max-height: 40px;
  overflow-y: auto;
  resize: none;
  border: none;
  outline: none;
  color: ${({ theme }) => theme.tokenColors['text-strong']};
  ${({ theme }) => theme.tokenTypographys['display-medium16']}
  background-color: transparent;
`;

const InputBtn = styled.button`
  display: flex;
  height: 25px;
  align-items: center;
  color: ${({ theme }) => theme.tokenColors['text-strong']};
  cursor: pointer;
`;

const StyledIcon = styled.svg`
  width: 20px;
  height: 20px;
  cursor: pointer;
`;