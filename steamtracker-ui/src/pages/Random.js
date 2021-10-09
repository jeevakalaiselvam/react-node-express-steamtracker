import React, { useEffect } from "react";
import styled from "styled-components";
import Page from "../components/core/Page";
import Header from "../components/core/Header";
import AllPageLeft from "../sidebar/AllPageLeft";
import { useState } from "react";
import { fetchGameRandom } from "../action/games";
import {
  CURRENT_PAGE,
  GAMES_PAGE_INDEX,
  _STORAGE_WRITE,
} from "../helper/storage";
import RandomContent from "../content/RandomContent";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  max-height: 100vh;
`;

export default function Random() {
  const [game, setGame] = useState({});
  const [loading, setLoading] = useState(true);
  const [hardReset, setHardReset] = useState(false);
  const [resetNeeded, setResetNeeded] = useState(false);

  useEffect(() => {
    const getGame = async () => {
      const game = await fetchGameRandom(hardReset);
      setGame((old) => game);
      setLoading((old) => false);
    };
    setLoading((old) => true);
    getGame();
    _STORAGE_WRITE(CURRENT_PAGE, GAMES_PAGE_INDEX);
  }, [resetNeeded, hardReset]);

  const hardResetGame = () => {
    setHardReset((old) => true);
    setResetNeeded((old) => !resetNeeded);
  };

  return (
    <PageContainer>
      <Header />
      <Page
        leftSidebar={<AllPageLeft />}
        rightSidebar={<></>}
        content={<RandomContent game={game} hardResetGame={hardResetGame} />}
        leftSidebarWidth={"180px"}
        rightSidebarWidth={"0px"}
        loading={loading}
      />
    </PageContainer>
  );
}
