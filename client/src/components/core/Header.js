import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import {
  FaBars,
  FaEllipsisV,
  FaGamepad,
  FaMedal,
  FaTimes,
  FaTrophy,
} from "react-icons/fa";
import { GameContext } from "../../context/GameContext";
import { fetchGamesInfo } from "../../action/games";
import {
  STORAGE_HEADER_AVERAGE_COMPLETION,
  STORAGE_HEADER_TOTAL_ACHIEVEMENTS,
  STORAGE_HEADER_TOTAL_GAMES,
  STORAGE_HEADER_TOTAL_PERFECT_GAMES,
  _STORAGE_READ,
} from "../../helper/storage";
import {
  getMedalCompletedGames,
  getTotalAchievements,
} from "../../helper/other";

// background-image: linear-gradient(
//   180deg,
//   rgba(70, 77, 83, 0.9) 0,
//   rgba(33, 39, 47, 0.9)
// );

const HeaderContainer = styled.div`
  width: 100%;
  padding: 0.5rem;
  z-index: 1000;
  background-color: rgba(10, 17, 25, 1);
  display: flex;
  flex-direction: row;

  @media only screen and (max-width: 840px) {
    min-height: 60px;
    position: fixed;
    max-height: 60px;
  }
  @media only screen and (min-width: 841px) {
    min-height: 0px;
    max-height: 0px;
    display: none;
  }
`;

const LeftNav = styled.div`
  font-size: 1.4rem;
  cursor: pointer;
  display: flex;
  padding: 0.5rem;
  align-items: center;
  justify-content: center;
  height: 100%;
  &:hover {
    color: #f5f5f5;
  }
`;

const RightNav = styled.div`
  font-size: 1.4rem;
  height: 100%;
  display: flex;
  padding: 0.5rem;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  &:hover {
    color: #f5f5f5;
  }
`;

const MiddleNav = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

const IconSetGold = styled.div`
  display: flex;
  align-items: center;
  text-shadow: 0 0 6px #da8c4a;
  color: #fecc09;
  text-shadow: 2px 2px 2px rgb(10 17 25 / 45%);
  justify-content: center;
  flex-direction: row;
`;
const IconSetBlue = styled.div`
  display: flex;
  margin-left: 1.5rem;
  color: #55aece;
  text-shadow: 2px 2px 2px rgb(10 17 25 / 45%);
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;
const IconSetGreen = styled.div`
  display: flex;
  margin-left: 1.5rem;
  align-items: center;
  color: #a5c93a;
  text-shadow: 2px 2px 2px rgb(10 17 25 / 45%);
  justify-content: center;
  flex-direction: row;
`;

const Icon = styled.div`
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Data = styled.div`
  display: flex;
  margin-left: 0.5rem;
  font-size: 1rem;
  align-items: center;
  justify-content: center;
`;

export default function Header() {
  //Show initial header info from local storage
  const [gameInfo, setGameInfo] = useState({
    total_games: _STORAGE_READ(STORAGE_HEADER_TOTAL_GAMES) ?? 0,
    average_completion: _STORAGE_READ(STORAGE_HEADER_AVERAGE_COMPLETION) ?? 0,
    completed_achievements:
      _STORAGE_READ(STORAGE_HEADER_TOTAL_ACHIEVEMENTS) ?? 0,
    perfect_games_count: _STORAGE_READ(STORAGE_HEADER_TOTAL_PERFECT_GAMES) ?? 0,
  });
  const [loading, setLoading] = useState(false);

  const { navLeftOpen, setNavLeftOpen, navRightOpen, setNavRightOpen } =
    useContext(GameContext);

  //When the header is rendered for the first time, Get info from GAMESINFO backend api
  useEffect(() => {
    const getAllGamesInfo = async () => {
      setLoading((old) => true);
      const gameInfoInnerResponse = await fetchGamesInfo();
      setGameInfo((old) => gameInfoInnerResponse);
      setLoading((old) => false);
    };
    getAllGamesInfo();
  }, []);

  //Toggle left navigation drawer state
  const toggleNavLeft = () => {
    setNavLeftOpen((navState) => !navState);
  };

  //Toggle right navigation drawer state
  const toggleNavRight = () => {
    setNavRightOpen((navState) => !navState);
  };

  const totalMedals = getMedalCompletedGames(gameInfo);
  const totalAchievements = getTotalAchievements(gameInfo);

  return (
    <HeaderContainer>
      <LeftNav onClick={toggleNavLeft}>
        {!navLeftOpen && <FaBars />}
        {navLeftOpen && <FaTimes />}
      </LeftNav>
      <MiddleNav>
        {!loading && (
          <>
            <IconSetGold>
              <Icon>
                <FaMedal />
              </Icon>
              <Data>{totalMedals}</Data>
            </IconSetGold>
            <IconSetBlue>
              <Icon>
                <FaTrophy />
              </Icon>
              <Data>{totalAchievements}</Data>
            </IconSetBlue>
            <IconSetGreen>
              <Icon>
                <FaGamepad />
              </Icon>
              <Data>{gameInfo.total_games}</Data>
            </IconSetGreen>
          </>
        )}
      </MiddleNav>
      <RightNav onClick={toggleNavRight}>
        {!navRightOpen && <FaEllipsisV />}
        {navRightOpen && <FaTimes />}
      </RightNav>
    </HeaderContainer>
  );
}
