import React from "react";
import { FaCheck } from "react-icons/fa";
import styled from "styled-components";
import BlackToolTip from "../other/BlackToolTip";
import { STEAM_HEADER_IMAGE } from "../../helper/endpoints";

const Card = styled.div`
  background-color: rgba(10, 17, 25, 0.4);
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  justify-content: center;
  margin: 6px;
  background-image: url("${(props) => props.image}");
  background-repeat: no-repeat;
  background-size: cover;
  cursor: pointer;
  width: 50px;
  height: 50px;
`;

const ToolTipContent = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  padding: 1rem;
  align-items: center;
  justify-content: center;
`;

const Completion = styled.div`
  z-index: 20;
  display: flex;
  align-items: center;
  color: white;
  justify-content: center;
  width: 100%;
  font-size: 1rem;
  background-color: rgba(10, 17, 25, 0.85);
  height: 100%;
  opacity: ${(props) => (props.completed ? "1" : "0")};
`;

const Title = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 1rem;
  color: #55aece;
  margin-top: 0.5rem;
  justify-content: center;
`;

const Desc = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 0.9rem;
  justify-content: center;
`;

const Game = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: gray;
  padding: 0.5rem;
  font-size: 0.8rem;
  justify-content: center;
`;

const GameImage = styled.div`
  display: flex;
  background-image: url("${(props) => props.image}");
  background-repeat: no-repeat;
  background-size: cover;
  flex-direction: column;
  align-items: center;
  color: gray;
  width: 200px;
  height: 100px;
  justify-content: center;
`;

const Icon = styled.div`
  display: flex;
  width: 40px;
  height: 40px;
  flex-direction: column;
  background-image: url("${(props) => props.image}");
  background-size: cover;
  align-items: center;
  justify-content: center;
`;

export default function AchievementMinimal(props) {
  const { icon, name, description, game_name, game_id, unlocked } =
    props.achievement;

  const toolTipContent = (
    <ToolTipContent>
      <Icon image={icon}></Icon>
      <Title>{name}</Title>
      <Desc>{description}</Desc>
      <Game>{game_name}</Game>
      <GameImage image={STEAM_HEADER_IMAGE(game_id)}></GameImage>
    </ToolTipContent>
  );

  return (
    <BlackToolTip content={toolTipContent}>
      <Card
        image={icon}
        onClick={() => {
          window.open(
            `https://www.google.com/search?q=${game_name}+${name}+achievement`,
            "_blank"
          );
        }}
      >
        {unlocked === 1 && (
          <Completion completed={unlocked}>
            <FaCheck />
          </Completion>
        )}
      </Card>
    </BlackToolTip>
  );
}
