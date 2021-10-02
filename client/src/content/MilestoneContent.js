import React from "react";
import styled from "styled-components";
import MilestoneNormal from "../components/card/MilestoneNormal";

const ContentContainer = styled.div`
  display: flex;
  width: 100%;
  min-height: 100vh;
  justify-content: space-between;
  flex-direction: column;
  overflow: scroll;
  scrollbar-width: thin;
  align-items: flex-start;
  flex-wrap: wrap;
  padding-bottom: 0rem;

  @media only screen and (max-width: 840px) {
    padding-bottom: 3rem;
  }
`;

const ContainerInner = styled.div`
  display: flex;
  width: 100%;
  justify-self: flex-start;
  justify-content: center;
  overflow: scroll;
  flex-wrap: wrap;
`;

export default function MilestoneContent(props) {
  const achievements = props.achievements;

  return (
    <ContentContainer>
      <ContainerInner>
        {achievements.map((achievement, index) => {
          return (
            <MilestoneNormal
              achievement={achievement}
              index={index}
              total={achievements.length}
              key={achievement.game_id + achievement.id}
            />
          );
        })}
      </ContainerInner>
    </ContentContainer>
  );
}
