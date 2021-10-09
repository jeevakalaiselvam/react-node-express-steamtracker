import React from "react";
import styled from "styled-components";
import AchievementSidebarNormal from "../components/card/AchievementSidebarNormal";

const AchievementContainer = styled.div`
  width: 100%;
  overflow: scroll;
  display: flex;
  max-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-bottom: 4rem;
  justify-content: flex-start;
`;

export default function HistoryPageRight(props) {
  const achievements = props.achievements;
  return (
    <AchievementContainer>
      {achievements.length &&
        achievements.map((achievement) => (
          <AchievementSidebarNormal
            achievement={achievement}
            key={`${achievement.unlocked_time_desc}${achievement.id}`}
          />
        ))}
    </AchievementContainer>
  );
}
