import React from "react";
import styled from "styled-components";

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

export default function MilestoneRightPage(props) {
  return <AchievementContainer>Milestone Right</AchievementContainer>;
}
