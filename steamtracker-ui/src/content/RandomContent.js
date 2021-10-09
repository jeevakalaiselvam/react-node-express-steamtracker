import React from "react";
import styled from "styled-components";
import GameCardNormal from "../components/card/GameCardNormal";

const ContentContainer = styled.div`
  display: flex;
  width: 100%;
  min-height: 100vh;
  justify-content: flex-start;
  flex-direction: column;
  overflow: scroll;
  padding: 1rem;
  scrollbar-width: thin;
  align-items: center;
  flex-wrap: wrap;
  padding-bottom: 1rem;

  @media only screen and (max-width: 840px) {
    padding-bottom: 3rem;
  }
`;

const ContainerInner = styled.div`
  display: flex;
  width: 100%;
  justify-self: flex-start;
  justify-content: center;
  overflow: scroll;
  flex-wrap: wrap;
`;

const ResetButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 0.5rem 1rem;
  color: #fefefe;
  z-index: 100;
  background-color: green;

  &:hover {
    transform: scale(0.95);
  }

  &:active {
    transform: scale(0.9);
  }
`;

export default function RandomContent(props) {
  const game = props.game;

  return (
    <ContentContainer>
      <ContainerInner>
        <GameCardNormal game={game} />
      </ContainerInner>
      <ResetButton
        onClick={() => {
          props.hardResetGame();
        }}
      >
        SKIP TO ANOTHER
      </ResetButton>
    </ContentContainer>
  );
}
