import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import Page from "../components/core/Page";
import Header from "../components/core/Header";
import AllPageLeft from "../sidebar/AllPageLeft";
import { useState } from "react";
import { fetchAchievementsBacklog } from "../action/games";
import { GameContext } from "../context/GameContext";
import {
  BACKLOGPAGE_SORT,
  BACKLOGPAGE_VIEW,
  BACKLOG_PAGE_INDEX,
  CURRENT_PAGE,
  PAGINATION_TOTAL_COUNT,
  _STORAGE_READ,
  _STORAGE_WRITE,
} from "../helper/storage";
import { PAGINATION_ACHIEVEMENTS_PER_PAGE } from "../helper/pagination";
import BacklogContent from "../content/BacklogContent";
import BacklogPageRight from "../sidebar/BacklogPageRight";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  max-height: 100vh;
`;

export default function Backlog() {
  const { setNavRightOpen } = useContext(GameContext);
  const [achievements, setAchievements] = useState({});
  const [achievementsPage, setAchievementsPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [viewIndex, setViewIndex] = useState(
    Number(_STORAGE_READ(BACKLOGPAGE_VIEW))
  );
  const [sortIndex, setSortIndex] = useState(
    Number(_STORAGE_READ(BACKLOGPAGE_SORT))
  );

  const toggleNavRight = () => {
    setNavRightOpen((navState) => !navState);
  };

  useEffect(() => {
    const getAllAchievements = async (sortOrder, viewOrder) => {
      const achievements = await fetchAchievementsBacklog(
        sortOrder,
        viewOrder,
        achievementsPage
      );
      setAchievements((old) => achievements);
      setLoading((old) => false);
    };
    setLoading((old) => true);
    getAllAchievements(sortIndex, viewIndex);
    _STORAGE_WRITE(CURRENT_PAGE, BACKLOG_PAGE_INDEX);
  }, [sortIndex, viewIndex, achievementsPage]);

  const sortHandler = (sortOption) => {
    _STORAGE_WRITE(BACKLOGPAGE_SORT, sortOption);
    setSortIndex((old) => sortOption);
    setAchievementsPage((old) => 1);
    toggleNavRight();
  };
  const viewHandler = (viewOption) => {
    _STORAGE_WRITE(BACKLOGPAGE_VIEW, viewOption);
    setViewIndex((old) => viewOption);
    setAchievementsPage((old) => 1);
    toggleNavRight();
  };

  const moveToPageRightHandler = () => {
    if (
      Math.ceil(
        _STORAGE_READ(PAGINATION_TOTAL_COUNT) / PAGINATION_ACHIEVEMENTS_PER_PAGE
      ) === achievementsPage
    ) {
      setAchievementsPage((old) => achievementsPage);
    } else {
      setAchievementsPage((old) => achievementsPage + 1);
    }
  };
  const moveToPageLeftHandler = () => {
    if (achievementsPage === 1) {
      setAchievementsPage((old) => 1);
    } else {
      setAchievementsPage((old) => achievementsPage - 1);
    }
  };

  return (
    <PageContainer>
      <Header />
      <Page
        leftSidebar={<AllPageLeft />}
        rightSidebar={
          <BacklogPageRight
            sortHandler={sortHandler}
            viewHandler={viewHandler}
            viewIndex={viewIndex}
            sortIndex={sortIndex}
          />
        }
        content={
          <BacklogContent
            achievements={achievements}
            viewType={viewIndex}
            page={achievementsPage}
            moveToPageRight={moveToPageRightHandler}
            moveToPageLeft={moveToPageLeftHandler}
          />
        }
        leftSidebarWidth={"180px"}
        rightSidebarWidth={"180px"}
        loading={loading}
      />
    </PageContainer>
  );
}
