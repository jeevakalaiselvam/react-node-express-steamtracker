import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import Page from "../components/core/Page";
import Header from "../components/core/Header";
import AllPageLeft from "../sidebar/AllPageLeft";
import { useState } from "react";
import { fetchAchievements } from "../action/games";
import { GameContext } from "../context/GameContext";
import {
  ACHIEVEMENTGAMEPAGE_SELECT,
  ACHIEVEMENTGAMEPAGE_SORT,
  ACHIEVEMENTGAMEPAGE_VIEW,
  ACHIEVEMENTS_PAGE_INDEX,
  CURRENT_PAGE,
  PAGINATION_TOTAL_COUNT,
  _STORAGE_READ,
  _STORAGE_WRITE,
} from "../helper/storage";
import { PAGINATION_ACHIEVEMENTS_PER_PAGE } from "../helper/pagination";
import AchievementContent from "../content/AchievementContent";
import AchievementPageRight from "../sidebar/AchievementPageRight";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  max-height: 100vh;
`;

export default function Achievements() {
  const { setNavRightOpen } = useContext(GameContext);
  const [achievements, setAchievements] = useState({});
  const [achievementsPage, setAchievementsPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [viewIndex, setViewIndex] = useState(
    Number(_STORAGE_READ(ACHIEVEMENTGAMEPAGE_VIEW))
  );
  const [sortIndex, setSortIndex] = useState(
    Number(_STORAGE_READ(ACHIEVEMENTGAMEPAGE_SORT))
  );
  const [selectIndex, setSelectIndex] = useState(
    Number(_STORAGE_READ(ACHIEVEMENTGAMEPAGE_SELECT))
  );

  const toggleNavRight = () => {
    setNavRightOpen((navState) => !navState);
  };

  useEffect(() => {
    const getAllAchievements = async (sortOrder, viewOrder) => {
      const achievements = await fetchAchievements(
        sortOrder,
        viewOrder,
        achievementsPage,
        selectIndex
      );
      setAchievements((old) => achievements);
      setLoading((old) => false);
    };
    setLoading((old) => true);
    getAllAchievements(sortIndex, viewIndex, selectIndex);
    _STORAGE_WRITE(CURRENT_PAGE, ACHIEVEMENTS_PAGE_INDEX);
  }, [sortIndex, viewIndex, achievementsPage, selectIndex]);

  const sortHandler = (sortOption) => {
    _STORAGE_WRITE(ACHIEVEMENTGAMEPAGE_SORT, sortOption);
    setSortIndex((old) => sortOption);
    setAchievementsPage((old) => 1);
    toggleNavRight();
  };
  const viewHandler = (viewOption) => {
    _STORAGE_WRITE(ACHIEVEMENTGAMEPAGE_VIEW, viewOption);
    setViewIndex((old) => viewOption);
    setAchievementsPage((old) => 1);
    toggleNavRight();
  };

  const selectHandler = (selectOption) => {
    _STORAGE_WRITE(ACHIEVEMENTGAMEPAGE_SELECT, selectOption);
    setSelectIndex((old) => selectOption);
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
          <AchievementPageRight
            sortHandler={sortHandler}
            viewHandler={viewHandler}
            selectHandler={selectHandler}
            viewIndex={viewIndex}
            sortIndex={sortIndex}
            selectIndex={selectIndex}
          />
        }
        content={
          <AchievementContent
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
