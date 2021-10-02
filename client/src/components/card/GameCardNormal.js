import React from "react";
import { FaCheck, FaHourglass, FaMedal, FaTrophy } from "react-icons/fa";
import styled from "styled-components";
import {
  COMPLETION_TARGET,
  SELECTED_GAME,
  SELECTED_GAME_COMPLETED,
  SELECTED_GAME_COMPLETED_PERCETAGE,
  SELECTED_GAME_TOTAL,
  TARGET_DEFAULT_COMPLETION,
  _STORAGE_READ,
  _STORAGE_WRITE,
} from "../../helper/storage";

const CardContainer = styled.div`
  background-color: rgba(10, 17, 25, 0.4);
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  justify-content: center;
  margin: 4px;
  background-image: url("${(props) => props.image}");
  background-repeat: no-repeat;
  background-size: cover;
  cursor: pointer;

  @media only screen and (min-width: 1361px) {
    width: 30%;
    height: 20vh;
  }
  @media only screen and (max-width: 1360px) and (min-width: 1201px) {
    width: 30%;
    height: 20vh;
  }
  @media only screen and (max-width: 1200px) and (min-width: 1061px) {
    width: 45%;
    height: 20vh;
  }
  @media only screen and (max-width: 1060px) and (min-width: 961px) {
    width: 45%;
    height: 20vh;
  }
  @media only screen and (max-width: 960px) and (min-width: 769px) {
    width: 45%;
    height: 20vh;
  }
  @media only screen and (max-width: 768px) and (min-width: 631px) {
    width: 45%;
    height: 20vh;
  }
  @media only screen and (max-width: 630px) and (min-width: 481px) {
    width: 96%;
    height: 25vh;
  }
  @media only screen and (max-width: 480px) {
    width: 96%;
    height: 25vh;
  }
`;

const Title = styled.div`
  width: 100%;
  padding: 0.5rem;
  background-color: rgba(10, 17, 25, 0.6);
  color: #fefefe;
  display: flex;
  flex-direction: column;
`;

const Card = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const IconInner = styled.div`
  font-size: 1rem;
  color: #fefefe;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const InnerContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  background-color: rgba(10, 17, 25, 0.8);
  display: flex;
  width: 100%;
  flex-direction: row;
`;

const AchievementData = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  flex-direction: row;
  color: #fefefe;
  justify-content: flex-start;
  padding: 0.25rem 0.5rem;
`;

const Medal = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  color: gold;
  justify-content: flex-end;
  margin-right: 0.5rem;
`;

const IconStarted = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  color: #fefefe;
  font-size: 0.8rem;
  justify-content: flex-end;
  margin-right: 0.5rem;
`;

const AchievementCount = styled.div`
  margin-left: 0.25rem;
  font-size: 0.9rem;
`;

export default function GameCardNormal(props) {
  const {
    name,
    image,
    completion_percentage,
    completed_achievements_count,
    total_achievements_count,
  } = props.game.game;

  const getRemainingForTarget = () => {
    const completionTarget =
      _STORAGE_READ(COMPLETION_TARGET) ?? TARGET_DEFAULT_COMPLETION;

    return Math.ceil(
      (completionTarget / 100) * total_achievements_count -
        completed_achievements_count
    );
  };

  return (
    <CardContainer
      image={image}
      onClick={() => {
        _STORAGE_WRITE(SELECTED_GAME, props.game.id);
        _STORAGE_WRITE(
          SELECTED_GAME_COMPLETED_PERCETAGE,
          props.game.completion_percentage
        );
        _STORAGE_WRITE(
          SELECTED_GAME_TOTAL,
          props.game.total_achievements_count
        );
        _STORAGE_WRITE(
          SELECTED_GAME_COMPLETED,
          props.game.completed_achievements_count
        );
        window.location.href = "/game";
      }}
    >
      <Title>{name}</Title>
      <Card>
        <InnerContainer>
          <AchievementData>
            <IconInner>
              <FaTrophy />
            </IconInner>
            <AchievementCount>
              {+completion_percentage <
                Number(
                  _STORAGE_READ(COMPLETION_TARGET) ?? TARGET_DEFAULT_COMPLETION
                ) && getRemainingForTarget()}

              {+completion_percentage >=
                Number(
                  _STORAGE_READ(COMPLETION_TARGET) ?? TARGET_DEFAULT_COMPLETION
                ) && <FaCheck />}
            </AchievementCount>
          </AchievementData>
          {+completion_percentage >=
            Number(
              _STORAGE_READ(COMPLETION_TARGET) ?? TARGET_DEFAULT_COMPLETION
            ) && (
            <Medal>
              <FaMedal />
            </Medal>
          )}
          {+completion_percentage <
            Number(
              _STORAGE_READ(COMPLETION_TARGET) ?? TARGET_DEFAULT_COMPLETION
            ) &&
            +completion_percentage > 0 && (
              <IconStarted>
                <FaHourglass />
              </IconStarted>
            )}
        </InnerContainer>
      </Card>
    </CardContainer>
  );
}
