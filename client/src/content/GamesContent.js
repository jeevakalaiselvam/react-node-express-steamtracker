import React from "react";
import styled from "styled-components";
import GameCardNormal from "../components/card/GameCardNormal";
import GameCardMinimal from "../components/card/GameCardMinimal";
import { FaBackward, FaForward } from "react-icons/fa";
import { PAGINATION_TOTAL_COUNT, _STORAGE_READ } from "../helper/storage";
import { PAGINATION_GAMES_PER_PAGE } from "../helper/pagination";

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

const Pagination = styled.div`
  display: flex;
  padding: 0.25rem;
  width: 100%;
  justify-content: center;
  position: fixed;
  background-color: rgba(10, 17, 25, 1);
  padding: 0.25rem 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
`;

const Page = styled.div`
  background-image: url("./images/bgcard.png");
  padding: 0.25rem 0.75rem;
  cursor: pointer;
  margin: 0 1rem;
  border: 1px solid #ffffff00;
  &:hover {
    color: #f5f5f5;
    border: 1px solid #f5f5f5;
  }
`;
const PageCount = styled.div`
  padding: 0.25rem 0.75rem;
`;

export default function GamesContent(props) {
  const games = props.games;

  return (
    <ContentContainer>
      <ContainerInner>
        {games.map((game) =>
          props.viewIndex === 0 ? (
            <GameCardMinimal game={game} key={game.id} />
          ) : (
            <GameCardNormal game={game} key={game.id} />
          )
        )}
      </ContainerInner>
      <Pagination>
        <Page onClick={props.moveToPageLeft}>
          <FaBackward />
        </Page>
        <PageCount>
          {props.page} /{" "}
          {Math.ceil(
            _STORAGE_READ(PAGINATION_TOTAL_COUNT) / PAGINATION_GAMES_PER_PAGE
          )}
        </PageCount>
        <Page onClick={props.moveToPageRight}>
          <FaForward />
        </Page>
      </Pagination>
    </ContentContainer>
  );
}
