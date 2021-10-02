import React from "react";
import { FaCheck, FaGlobe, FaThumbtack } from "react-icons/fa";
import styled from "styled-components";
import { STEAM_HEADER_IMAGE } from "../../helper/endpoints";
import {
  _STORAGE_READ,
  COMPLETION_TARGET,
  _STORAGE_CHECK_ARRAY,
  _STORAGE_REMOVE_ARRAY,
  _STORAGE_APPEND_ARRAY,
} from "../../helper/storage";

const CardContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  background-color: rgba(10, 17, 25);
  position: relative;
  justify-content: center;
  border-radius: 4px;
  margin: 4px;
  padding: 0.5rem 1rem;
  border: 1px solid #fefefe00;

  &:hover {
    border: 1px solid #00000044;
  }

  @media only screen and (min-width: 1361px) {
    width: 32%;
  }
  @media only screen and (max-width: 1360px) and (min-width: 1201px) {
    width: 48%;
  }
  @media only screen and (max-width: 1200px) and (min-width: 1061px) {
    width: 48%;
  }
  @media only screen and (max-width: 1060px) and (min-width: 961px) {
    width: 48%;
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

const InnerContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background-image: url("${(props) => props.image}");
  background-repeat: no-repeat;
  background-size: cover;
`;

const InnerContainerBG = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  left: 0;
  border-radius: 3px;
  z-index: 100;
  background-repeat: no-repeat;
  background-size: cover;
`;

const IconContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &:hover {
    cursor: pointer;
  }
`;

const Icon = styled.div`
  width: 55px;
  height: 55px;
  cursor: pointer;
  border-radius: 2px;
  background-image: url("${(props) => props.image}");
  background-repeat: no-repeat;
  background-size: cover;
`;

const PinIcon = styled.div`
  width: 20px;
  height: 20px;
  z-index: 1000;
  color: ${(props) => (props.iconColor ? "#3EB595" : "#333")};

  &:hover {
    cursor: pointer;
  }
`;

const Data = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 0 0.5rem;
`;
const Misc = styled.div`
  display: flex;
  justify-self: flex-start;
  flex-direction: row;
`;

const Title = styled.div`
  font-size: 1rem;
  color: #55aece;
  cursor: pointer;
  z-index: 101;
  font-weight: bold;
  text-shadow: 2px 2px 2px rgb(10 17 25 / 45%);
`;
const Desc = styled.div`
  font-size: 0.85rem;
  color: #d2d2d2;
  z-index: 101;
`;

const GameName = styled.div`
  color: #959da6;
  z-index: 101;
  font-size: 0.8rem;
`;

const Percentage = styled.div`
  color: #959da6;
  margin-left: 0.5rem;
  font-size: 0.8rem;
`;

const PercentageGold = styled.div`
  color: gold;
  margin-left: 0.5rem;
  font-size: 0.8rem;
`;

const Completion = styled.div`
  z-index: 20;
  display: flex;
  align-items: center;
  color: white;
  justify-content: center;
  width: 100%;
  color: #ffffff;
  height: 100%;
  font-size: 1rem;
  background-color: rgba(10, 17, 25, 0.85);
  opacity: ${(props) => (props.completed ? "1" : "0")};
`;

const RemainingAchievements = styled.div`
  position: absolute;
  bottom: 0;
  font-size: 0.8rem;
  padding: 0.5rem;
  right: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: rgba(10, 17, 25, 0.4);
`;

const RemainingIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  color: #959da6;
  margin-right: 0.25rem;
`;
const RemainingData = styled.div`
  display: flex;
  align-items: center;
  font-size: 1rem;
  color: #959da6;
  justify-content: center;
`;

export default function AchievementNormal(props) {
  const {
    icon,
    name,
    description,
    game_name,
    game_id,
    global_percentage,
    unlocked,
    game_completed_count,
    game_total_count,
  } = props.achievement;

  return (
    <CardContainer>
      <InnerContainerBG></InnerContainerBG>
      <InnerContainer image={STEAM_HEADER_IMAGE(game_id)}></InnerContainer>
      <IconContainer>
        <Icon image={icon}>
          {unlocked === 1 && (
            <Completion completed={unlocked}>
              <FaCheck />
            </Completion>
          )}
        </Icon>
        <PinIcon
          iconColor={_STORAGE_CHECK_ARRAY(
            `${game_id}_pinned`,
            `${game_id}_${name}`
          )}
          onClick={() => {
            if (
              _STORAGE_CHECK_ARRAY(`${game_id}_pinned`, `${game_id}_${name}`)
            ) {
              _STORAGE_REMOVE_ARRAY(`${game_id}_pinned`, `${game_id}_${name}`);
            } else {
              _STORAGE_APPEND_ARRAY(`${game_id}_pinned`, `${game_id}_${name}`);
            }
            props.refreshViewWithoutFetch && props.refreshViewWithoutFetch();
          }}
        >
          <FaThumbtack style={{ cursor: "pointer" }} />
        </PinIcon>
      </IconContainer>
      <Data>
        <Title
          onClick={() => {
            window.open(
              `https://www.google.com/search?q=${game_name}+${name}+achievement`,
              "_blank"
            );
          }}
        >
          {name}
        </Title>
        <Desc>{description}</Desc>
        <GameName>{game_name}</GameName>
      </Data>
      <Misc>
        <FaGlobe />{" "}
        {Number(global_percentage) <= 10 && (
          <PercentageGold>
            {Number(global_percentage).toFixed(2)} %
          </PercentageGold>
        )}
        {Number(global_percentage) > 10 && (
          <Percentage>{Number(global_percentage).toFixed(2)} %</Percentage>
        )}
      </Misc>
      <RemainingAchievements>
        <RemainingIcon>
          <FaThumbtack />
        </RemainingIcon>
        <RemainingData>
          {Math.ceil(
            (Number(_STORAGE_READ(COMPLETION_TARGET)) / 100) *
              Number(game_total_count) -
              Number(game_completed_count)
          )}
        </RemainingData>
      </RemainingAchievements>
    </CardContainer>
  );
}
