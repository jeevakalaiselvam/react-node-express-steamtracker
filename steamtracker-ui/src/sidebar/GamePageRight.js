import React from "react";
import {
  FaArrowRight,
  FaClock,
  FaFilter,
  FaGripHorizontal,
  FaMedal,
  FaPercentage,
  FaSortAlphaDown,
  FaSortAlphaDownAlt,
  FaThumbtack,
  FaTrophy,
} from "react-icons/fa";
import styled from "styled-components";
import { getModeAchivementsToAttainTarget } from "../helper/other";
import { _STORAGE_CHECK_ARRAY } from "../helper/storage";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  cursor: pointer;
`;

const Subheader = styled.div`
  color: #fefefe;
  font-size: 0.6rem;
  align-self: flex-start;
  margin: 0.5rem 1rem;
  text-align: left;
`;

const RightMenuItem = styled.div`
  display: flex;
  width: 100%;
  padding: 0.5rem 1rem;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  color: ${(props) => (props.selected ? "#55aece" : "#959da6")};
  background-color: ${(props) =>
    props.selected ? "rgba(122, 132, 148, 0.26)" : "rgba(122, 132, 148, 0)"};

  &:hover {
    background-color: rgba(122, 132, 148, 0.26);
    color: #f5f5f5;
  }
`;
const Icon = styled.div`
  font-size: 1rem;
  transform: translateY(-1px);
`;
const Title = styled.div`
  display: flex;
  font-size: 0.9rem;
  margin-left: 1rem;
  align-items: center;
  flex-direction: row;
`;

const ToGet = styled.div`
  padding: 1rem;
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const IconAndText = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex: 1;
  align-items: center;
  color: #55aece;
`;

const Data = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-left: 0.5rem;
  font-size: 1.1rem;
  align-items: center;
`;

const Arrow = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 0.5rem;
  justify-content: center;
  color: #a5c93a;
  flex: 1;
  align-items: center;
`;

const Trophy = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 1.35rem;
  justify-content: center;
  align-items: center;
`;

const Medal = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  color: gold;
  margin-left: 0.5rem;
  justify-content: center;
  align-items: center;
`;

export default function GamePageRight(props) {
  const achievements = props.achievements;
  const toGet = getModeAchivementsToAttainTarget(achievements);

  const getPinnedAchievementsCount = (tmpAchievements) => {
    const pinnedAchievements = [];

    tmpAchievements.length &&
      tmpAchievements.forEach((achievement) => {
        if (
          _STORAGE_CHECK_ARRAY(
            `${achievement.game_id}_pinned`,
            `${achievement.game_id}_${achievement.name}`
          )
        ) {
          pinnedAchievements.push(achievement);
        }
      });
    return pinnedAchievements.length;
  };

  const pinnedCount = getPinnedAchievementsCount(achievements);

  return (
    <Container>
      {toGet > 0 && (
        <ToGet>
          <IconAndText>
            <Trophy>
              <FaTrophy />
            </Trophy>
            <Data>{toGet}</Data>
          </IconAndText>
          <Arrow>
            <FaArrowRight />
          </Arrow>
          <Medal>
            <FaMedal />
          </Medal>
        </ToGet>
      )}
      {toGet <= 0 && (
        <ToGet>
          <Medal>
            <FaMedal />
          </Medal>
        </ToGet>
      )}
      {pinnedCount > 0 && (
        <ToGet>
          <IconAndText>
            <Trophy>
              <FaThumbtack />
            </Trophy>
            <Data>{pinnedCount}</Data>
          </IconAndText>
        </ToGet>
      )}
      {pinnedCount <= 0 && (
        <ToGet>
          <IconAndText>
            <Trophy>
              <FaThumbtack />
            </Trophy>
            <Data>{pinnedCount}</Data>
          </IconAndText>
        </ToGet>
      )}

      <Subheader>SELECT OPTIONS</Subheader>
      <RightMenuItem
        onClick={() => props.selectHandler(0)}
        selected={props.selectIndex === 0}
      >
        <Icon>
          <FaFilter />
        </Icon>
        <Title>All</Title>
      </RightMenuItem>
      <RightMenuItem
        onClick={() => props.selectHandler(1)}
        selected={props.selectIndex === 1}
      >
        <Icon>
          <FaFilter />
        </Icon>
        <Title>Unlocked</Title>
      </RightMenuItem>
      <RightMenuItem
        onClick={() => props.selectHandler(2)}
        selected={props.selectIndex === 2}
      >
        <Icon>
          <FaFilter />
        </Icon>
        <Title>Not Unlocked</Title>
      </RightMenuItem>
      <RightMenuItem
        onClick={() => props.selectHandler(3)}
        selected={props.selectIndex === 3}
      >
        <Icon>
          <FaFilter />
        </Icon>
        <Title>Pinned</Title>
      </RightMenuItem>
      <Subheader>SORT OPTIONS</Subheader>
      <RightMenuItem
        onClick={() => props.sortHandler(0)}
        selected={props.sortIndex === 0}
      >
        <Icon>
          <FaClock />
        </Icon>
        <Title>Recent</Title>
      </RightMenuItem>
      <RightMenuItem
        onClick={() => props.sortHandler(1)}
        selected={props.sortIndex === 1}
      >
        <Icon>
          <FaPercentage />
        </Icon>
        <Title>Rarity Easy</Title>
      </RightMenuItem>
      <RightMenuItem
        onClick={() => props.sortHandler(2)}
        selected={props.sortIndex === 2}
      >
        <Icon>
          <FaPercentage />
        </Icon>
        <Title>Rarity Hard</Title>
      </RightMenuItem>

      <RightMenuItem
        onClick={() => props.sortHandler(3)}
        selected={props.sortIndex === 3}
      >
        <Icon>
          <FaSortAlphaDown />
        </Icon>
        <Title>Name A-Z</Title>
      </RightMenuItem>
      <RightMenuItem
        onClick={() => props.sortHandler(4)}
        selected={props.sortIndex === 4}
      >
        <Icon>
          <FaSortAlphaDownAlt />
        </Icon>
        <Title>Name Z-A</Title>
      </RightMenuItem>
      <RightMenuItem
        onClick={() => props.sortHandler(5)}
        selected={props.sortIndex === 5}
      >
        <Icon>
          <FaSortAlphaDownAlt />
        </Icon>
        <Title>Hidden</Title>
      </RightMenuItem>

      <Subheader>VIEW OPTIONS</Subheader>
      <RightMenuItem
        onClick={() => props.viewHandler(0)}
        selected={props.viewIndex === 0}
      >
        <Icon>
          <FaGripHorizontal />
        </Icon>
        <Title>Minimal</Title>
      </RightMenuItem>
      <RightMenuItem
        onClick={() => props.viewHandler(1)}
        selected={props.viewIndex === 1}
      >
        <Icon>
          <FaGripHorizontal />
        </Icon>
        <Title>Normal</Title>
      </RightMenuItem>
    </Container>
  );
}
