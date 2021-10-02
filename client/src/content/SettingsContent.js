import React, { useState } from 'react';
import { FaSyncAlt } from 'react-icons/fa';
import styled from 'styled-components';
import {
  COMPLETION_TARGET,
  TARGET_DEFAULT_COMPLETION,
  _STORAGE_READ,
  _STORAGE_WRITE,
} from '../helper/storage';

const ContentContainer = styled.div`
  display: flex;
  width: 100%;
  min-height: 100vh;
  justify-content: space-between;
  flex-direction: column;
  overflow: scroll;
  scrollbar-width: thin;
  align-items: flex-start;
  flex-wrap: wrap;
`;

const ContainerInner = styled.div`
  display: flex;
  width: 100%;
  justify-self: flex-start;
  justify-content: flex-start;
  overflow: scroll;
  height: 100%;
  padding: 3rem;
  flex-direction: column;
  background-color: rgba(10, 17, 25, 0.4);
  flex-wrap: wrap;
`;

const MainTitle = styled.div`
  font-size: 2rem;
  color: #55aece;
  text-align: center;
`;

const Label = styled.div`
  font-size: 1.5rem;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: center;
`;

const Bottom = styled.div`
  font-size: 1rem;
  color: #959da6;
`;

const Input = styled.input`
  font-size: 1.2rem;
  border: none;
  padding: 1rem;
  width: 100%;
  height: 100%;
  background-color: rgba(10, 17, 25, 0.8);
  height: 3rem;

  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
  color: #fefefe;

  &:focus {
    outline: none;
  }
`;

const Button = styled.button`
  font-size: 1.2rem;
  border: none;
  padding: 1rem;
  height: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #55aece;
  border: 1px solid #55aeae;
  color: #fefefe;
  transform: all 0.5s;

  &:focus {
    outline: none;
  }

  &:active {
    transform: scale(0.9);
  }
`;

const ButtonRefresh = styled.button`
  font-size: 1.2rem;
  border: none;
  padding: 1rem;
  align-self: center;
  justify-self: center;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #55aece;
  border: 1px solid #55aeae;
  color: #fefefe;
  transform: all 0.5s;

  &:focus {
    outline: none;
  }

  &:active {
    transform: scale(0.9);
  }
`;

const Per = styled.div`
  margin-left: 0.5rem;
`;

const IconRefreshRotate = styled.div`
  margin: 0;
  padding: 0;
  margin-left: 1rem;
  font-size: 1rem;
  transform-origin: 50% 50%;
  animation: 0.5s linear infinite running spin;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const IconRefresh = styled.div`
  margin: 0;
  padding: 0;
  margin-left: 1rem;
  font-size: 1rem;
  transform-origin: 50% 50%;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const Row = styled.div`
  width: 100%;
  padding: 2rem;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const Column = styled.div`
  width: 30%;
  padding: 1rem 0.5rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  @media only screen and (min-width: 1361px) {
    width: 30%;
  }
  @media only screen and (max-width: 1360px) and (min-width: 1201px) {
    width: 30%;
  }
  @media only screen and (max-width: 1200px) and (min-width: 1061px) {
    width: 30%;
  }
  @media only screen and (max-width: 1060px) and (min-width: 961px) {
    width: 30%;
  }
  @media only screen and (max-width: 960px) and (min-width: 769px) {
    width: 96%;
  }
  @media only screen and (max-width: 768px) and (min-width: 631px) {
    width: 96%;
  }
  @media only screen and (max-width: 630px) and (min-width: 481px) {
    width: 96%;
  }
  @media only screen and (max-width: 480px) {
    width: 96%;
  }
`;

export default function SettingsContent(props) {
  let targetPercentage = 80;
  const [rotate, setRotate] = useState(false);

  const refreshDatabase = () => {
    setRotate((old) => true);
    props.refreshDatabase();
  };

  return (
    <ContentContainer>
      <ContainerInner>
        <MainTitle>Settings</MainTitle>
        <Row>
          <Column>
            <Label>
              <Bottom>Target percentage for achieving a medal in a game</Bottom>
            </Label>
          </Column>
          <Column>
            <Input
              type='number'
              min='0'
              max='100'
              onChange={(e) => {
                targetPercentage = e.target.value;
              }}
              placeholder={
                _STORAGE_READ(COMPLETION_TARGET) ?? TARGET_DEFAULT_COMPLETION
              }
            />
            <Per>%</Per>
          </Column>
          <Column>
            <Button
              onClick={(e) => {
                _STORAGE_WRITE(COMPLETION_TARGET, targetPercentage);
              }}
            >
              SAVE
            </Button>
          </Column>
        </Row>

        <ButtonRefresh
          onClick={(e) => {
            refreshDatabase();
          }}
        >
          {!rotate && 'Sync Database'}
          {rotate && 'Syncing Database, Please wait...'}
          {rotate && (
            <IconRefreshRotate>
              <FaSyncAlt />
            </IconRefreshRotate>
          )}
          {!rotate && (
            <IconRefresh>
              <FaSyncAlt />
            </IconRefresh>
          )}
        </ButtonRefresh>
      </ContainerInner>
    </ContentContainer>
  );
}
