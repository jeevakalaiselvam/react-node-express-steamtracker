import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import {
  FaBars,
  FaEllipsisV,
  FaLongArrowAltRight,
  FaMedal,
  FaTimes,
  FaTrophy,
} from "react-icons/fa";
import { GameContext } from "../../context/GameContext";
import { fetchGameInfo } from "../../action/games";
import {
  COMPLETION_TARGET,
  SELECTED_GAME,
  _STORAGE_READ,
} from "../../helper/storage";

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
  margin-right: 1.5rem;
  text-shadow: 2px 2px 2px rgb(10 17 25 / 45%);
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;
const IconSetGreen = styled.div`
  display: flex;
  align-items: center;
  color: #a5c93a;
  margin-right: 1.5rem;
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

const IconTrophy = styled.div`
  font-size: 1.6rem;
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

export default function HeaderGameProgress(props) {
  const [gameInfo, setGameInfo] = useState({
    playtime_minutes: 0,
    total_achievements_count: 0,
    completed_achievements_count: 0,
    completion_percentage: 0,
  });
  const { navLeftOpen, setNavLeftOpen, navRightOpen, setNavRightOpen } =
    useContext(GameContext);

  //When the header is rendered for the first time, Get info from GAMESINFO backend api
  useEffect(() => {
    const getGameInfo = async () => {
      const gameInfoInnerResponse = await fetchGameInfo(
        _STORAGE_READ(SELECTED_GAME)
      );
      setGameInfo((old) => gameInfoInnerResponse);
    };
    getGameInfo();
  }, []);

  //Toggle left navigation drawer state
  const toggleNavLeft = () => {
    setNavLeftOpen((navState) => !navState);
  };

  //Toggle right navigation drawer state
  const toggleNavRight = () => {
    setNavRightOpen((navState) => !navState);
  };

  const remaining = Math.ceil(
    (_STORAGE_READ(COMPLETION_TARGET) / 100) *
      gameInfo.total_achievements_count -
      gameInfo.completed_achievements_count
  );

  return (
    <HeaderContainer>
      <LeftNav onClick={toggleNavLeft}>
        {!navLeftOpen && <FaBars />}
        {navLeftOpen && <FaTimes />}
      </LeftNav>
      <MiddleNav>
        {remaining > 0 && (
          <IconSetBlue>
            <IconTrophy>
              <FaTrophy />
            </IconTrophy>
            <Data>{remaining}</Data>
          </IconSetBlue>
        )}
        {remaining > 0 && (
          <IconSetGreen>
            <Icon>
              <FaLongArrowAltRight />
            </Icon>
          </IconSetGreen>
        )}
        <IconSetGold>
          <Icon>
            <FaMedal />
          </Icon>
          <Data></Data>
        </IconSetGold>
      </MiddleNav>
      <RightNav onClick={toggleNavRight}>
        {!navRightOpen && <FaEllipsisV />}
        {navRightOpen && <FaTimes />}
      </RightNav>
    </HeaderContainer>
  );
}
