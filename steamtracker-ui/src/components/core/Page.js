import React, { useContext } from "react";
import styled from "styled-components";
import { GameContext } from "../../context/GameContext";
import LoadingIcons from "react-loading-icons";

const PageContainer = styled.div`
  display: flex;
  flex-direction: row;
  min-height: 100vh;
  max-height: 100vh;
  padding-top: 64px;

  @media only screen and (min-width: 841px) {
    padding-bottom: 0px;
    padding-top: 0px;
  }
`;

const SidebarLeftContainer = styled.div`
  display: flex;
  width: ${(props) => props.leftSidebarWidth ?? "200px"};
  min-height: 100vh;
  max-height: 100vh;
  background-color: rgba(10, 17, 25, 1);
  z-index: 1000;

  align-items: center;
  flex-direction: column;
  transition: all 0.2s;

  @media only screen and (max-width: 840px) {
    position: fixed;
    left: ${(props) => (props.navLeftOpen ? "0" : "-100%")};
    top: 60px;
  }
  @media only screen and (min-width: 841px) {
    display: flex;
  }
`;

const SidebarRightContainer = styled.div`
  display: flex;
  width: ${(props) => props.rightSidebarWidth ?? "200px"};
  min-height: 100vh;
  max-height: 100vh;
  z-index: 1000;

  background-color: rgba(10, 17, 25, 1);
  align-items: center;
  flex-direction: column;
  transition: all 0.2s;

  @media only screen and (max-width: 840px) {
    position: fixed;
    right: ${(props) => (props.navRightOpen ? "0" : "-100%")};
    top: 60px;
  }
  @media only screen and (min-width: 841px) {
    display: flex;
  }
`;

const ContentContainer = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  flex-direction: column;

  @media only screen and (max-width: 841px) {
    padding-bottom: 2rem;
  }
`;

const ContentContainerLoading = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export default function Page(props) {
  const { navLeftOpen, navRightOpen } = useContext(GameContext);
  return (
    <PageContainer>
      <SidebarLeftContainer
        leftSidebarWidth={props.leftSidebarWidth}
        navLeftOpen={navLeftOpen}
      >
        {props.leftSidebar}
      </SidebarLeftContainer>
      {!props.loading && (
        <ContentContainer page={props.page} moveToPage={props.moveToPage}>
          {props.content}
        </ContentContainer>
      )}
      {props.loading && (
        <ContentContainerLoading>
          <LoadingIcons.Audio />
        </ContentContainerLoading>
      )}
      <SidebarRightContainer
        rightSidebarWidth={props.rightSidebarWidth}
        navRightOpen={navRightOpen}
      >
        {props.rightSidebar}
      </SidebarRightContainer>
    </PageContainer>
  );
}
