import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import Page from "../components/core/Page";
import AllPageLeft from "../sidebar/AllPageLeft";
import { useState } from "react";
import { fetchAchievementsForGame } from "../action/games";
import { GameContext } from "../context/GameContext";
import {
  ACHIEVEMENTGAMEPAGE_SELECT,
  ACHIEVEMENTGAMEPAGE_SORT,
  ACHIEVEMENTGAMEPAGE_VIEW,
  GAMEPAGE_HEADER_COMPLETED,
  GAMEPAGE_HEADER_REMAINING,
  GAMEPAGE_HEADER_TOTAL,
  PAGINATION_TOTAL_COUNT,
  SELECTED_GAME,
  _STORAGE_CHECK_ARRAY,
  _STORAGE_READ,
  _STORAGE_WRITE,
} from "../helper/storage";
import { PAGINATION_ACHIEVEMENTS_PER_PAGE } from "../helper/pagination";
import GameContent from "../content/GameContent";
import GamePageRight from "../sidebar/GamePageRight";
import HeaderGameProgress from "../components/core/HeaderGameProgress";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  max-height: 100vh;
`;

export default function Game() {
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
      const achievementsResponse = await fetchAchievementsForGame(
        sortOrder,
        viewOrder,
        achievementsPage,
        selectIndex,
        _STORAGE_READ(SELECTED_GAME)
      );

      _STORAGE_WRITE(GAMEPAGE_HEADER_TOTAL, achievementsResponse.total);
      _STORAGE_WRITE(GAMEPAGE_HEADER_COMPLETED, achievementsResponse.completed);
      _STORAGE_WRITE(GAMEPAGE_HEADER_REMAINING, achievementsResponse.remaining);
      if (selectIndex === 3) {
        const pinnedAchievements = getPinnedAchievements(
          achievementsResponse.achievements
        );
        setAchievements((old) => pinnedAchievements);
      } else {
        setAchievements((old) => achievementsResponse.achievements);
      }

      setLoading((old) => false);
    };
    setLoading((old) => true);
    getAllAchievements(sortIndex, viewIndex, selectIndex);
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

  const getPinnedAchievements = (tmpAchievements) => {
    const pinnedAchievements = [];

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
    return pinnedAchievements;
  };

  const updatePinnedCount = () => {
    setAchievements((old) => old.slice());
  };

  return (
    <PageContainer>
      <HeaderGameProgress achievements={achievements} />
      <Page
        leftSidebar={<AllPageLeft />}
        rightSidebar={
          <GamePageRight
            sortHandler={sortHandler}
            viewHandler={viewHandler}
            selectHandler={selectHandler}
            viewIndex={viewIndex}
            sortIndex={sortIndex}
            selectIndex={selectIndex}
            achievements={achievements}
          />
        }
        content={
          <GameContent
            achievements={achievements}
            viewType={viewIndex}
            page={achievementsPage}
            updatePinnedCount={updatePinnedCount}
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
