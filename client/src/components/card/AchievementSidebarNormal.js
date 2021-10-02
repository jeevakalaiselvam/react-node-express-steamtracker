import React from "react";
import { FaCheck, FaGlobe } from "react-icons/fa";
import styled from "styled-components";
import { STEAM_HEADER_IMAGE } from "../../helper/endpoints";

const CardContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 1rem;
  align-items: center;
  background-color: rgba(122, 132, 148, 0.05);
  position: relative;
  justify-content: center;
  align-self: center;
  border-radius: 4px;
  margin: 4px;
  padding: 0.5rem 1rem;
  border: 1px solid #fefefe00;

  &:hover {
    border: 1px solid #00000044;
  }
  width: 100%;
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

const Icon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 2px;
  background-image: url("${(props) => props.image}");
  background-repeat: no-repeat;
  background-size: cover;
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
  align-self: flex-start;
  justify-self: flex-start;
  flex-direction: row;
`;

const Title = styled.div`
  font-size: 1rem;
  color: #55aece;
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
  font-size: 1rem;
  background-color: rgba(10, 17, 25, 0.6);
  height: 100%;
  opacity: ${(props) => (props.completed ? "1" : "0")};
  opacity: 0;
`;

export default function AchievementSidebarNormal(props) {
  const {
    icon,
    name,
    description,
    game_name,
    game_id,
    global_percentage,
    unlocked,
  } = props.achievement;

  return (
    <CardContainer>
      <InnerContainerBG></InnerContainerBG>
      <InnerContainer image={STEAM_HEADER_IMAGE(game_id)}></InnerContainer>
      <Icon image={icon}>
        {unlocked === 1 && (
          <Completion completed={unlocked}>
            <FaCheck />
          </Completion>
        )}
      </Icon>
      <Data>
        <Title>{name}</Title>
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
    </CardContainer>
  );
}
