import React from "react";
import styled from "styled-components";
import { FaBackward, FaForward } from "react-icons/fa";
import { PAGINATION_TOTAL_COUNT, _STORAGE_READ } from "../helper/storage";
import { PAGINATION_ACHIEVEMENTS_PER_PAGE_NEXT } from "../helper/pagination";
import AchievementNext from "../components/card/AchievementNext";

const ContentContainer = styled.div`
  display: flex;
  width: 100%;
  min-height: 100vh;
  justify-content: center;
  flex-direction: column;
  overflow: scroll;
  scrollbar-width: thin;
  align-items: center;
  flex-wrap: wrap;
  padding-bottom: 1rem;

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

const Pagination = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  padding: 0.25rem 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
`;

const Page = styled.div`
  background-image: url("./images/bgcard.png");
  padding: 0.25rem 0.75rem;
  cursor: pointer;
  margin: 0 1rem;
  border: 1px solid #ffffff00;
  &:hover {
    color: #f5f5f5;
    border: 1px solid #f5f5f5;
  }
`;
const PageCount = styled.div`
  padding: 0.25rem 0.75rem;
`;

export default function NextContent(props) {
  const achievements = props.achievements;

  return (
    <ContentContainer>
      <ContainerInner>
        {achievements.map((achievement) => {
          return (
            <AchievementNext
              achievement={achievement}
              key={achievement.game_id + achievement.id}
            />
          );
        })}
      </ContainerInner>
      <Pagination>
        <Page onClick={props.moveToPageLeft}>
          <FaBackward />
        </Page>
        <PageCount>
          {props.page} /{" "}
          {Math.ceil(
            _STORAGE_READ(PAGINATION_TOTAL_COUNT) /
              PAGINATION_ACHIEVEMENTS_PER_PAGE_NEXT
          )}
        </PageCount>
        <Page onClick={props.moveToPageRight}>
          <FaForward />
        </Page>
      </Pagination>
    </ContentContainer>
  );
}
