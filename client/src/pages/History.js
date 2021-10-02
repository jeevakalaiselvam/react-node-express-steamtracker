import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import Page from "../components/core/Page";
import AllPageLeft from "../sidebar/AllPageLeft";
import { useState } from "react";
import { fetAchievementsForYearRecentSorted } from "../action/games";
import { GameContext } from "../context/GameContext";
import {
  CURRENT_PAGE,
  HISTORYPAGE_VIEW,
  HISTORY_PAGE_INDEX,
  _STORAGE_READ,
  _STORAGE_WRITE,
} from "../helper/storage";
import HistoryContent from "../content/HistoryContent";
import HistoryPageRight from "../sidebar/HistoryPageRight";
import HeaderHistory from "../components/core/HeaderHistory";
import { getAllAchievementsObtainedForDate } from "../helper/other";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  max-height: 100vh;
`;

export default function History() {
  const [achievements, setAchievements] = useState({});
  const [achievementsYear, setAchievementsYear] = useState(
    new Date().getFullYear()
  );
  const [rightNavAchievements, setRightNavAchievements] = useState({});
  const [loading, setLoading] = useState(true);
  const { navRightOpen, setNavRightOpen } = useContext(GameContext);
  const [viewIndex, setViewIndex] = useState(
    Number(_STORAGE_READ(HISTORYPAGE_VIEW))
  );

  const openNavRight = () => {
    if (!navRightOpen) {
      setNavRightOpen((old) => true);
    }
  };

  const toggleNavRight = () => {
    setNavRightOpen((navState) => !navState);
  };

  useEffect(() => {
    const getAllAchievementsInYearSortedRecent = async (year) => {
      const achievementsForSaidYear = await fetAchievementsForYearRecentSorted(
        year
      );
      setAchievements((old) => achievementsForSaidYear);
      setLoading((old) => false);
    };
    setLoading((old) => true);
    getAllAchievementsInYearSortedRecent(achievementsYear);
    _STORAGE_WRITE(CURRENT_PAGE, HISTORY_PAGE_INDEX);
  }, [achievementsYear, viewIndex]);

  const viewHandler = (viewOption) => {
    _STORAGE_WRITE(HISTORYPAGE_VIEW, viewOption);
    setViewIndex((old) => viewOption);
    toggleNavRight();
  };

  const yearChangedHandler = (year) => {
    setAchievementsYear((old) => year);
    console.log("YEAR");
  };

  const showAchievementsForDate = (date) => {
    console.log(date);
    const achievementObtainedInDate = getAllAchievementsObtainedForDate(
      achievements,
      date
    );
    if (achievementObtainedInDate.length !== 0) {
      console.log(
        "SETTING STATE ACHIEVEMENTS RIGHT",
        achievementObtainedInDate
      );
      setRightNavAchievements((old) => achievementObtainedInDate);
      openNavRight();
    } else {
    }
  };

  return (
    <PageContainer>
      <HeaderHistory
        yearChangedHandler={yearChangedHandler}
        year={achievementsYear}
      />
      <Page
        leftSidebar={<AllPageLeft />}
        rightSidebar={
          <HistoryPageRight
            viewHandler={viewHandler}
            viewIndex={viewIndex}
            achievements={rightNavAchievements}
          />
        }
        content={
          <HistoryContent
            achievements={achievements}
            yearChangedHandler={yearChangedHandler}
            year={achievementsYear}
            showAchievementsForDate={showAchievementsForDate}
          />
        }
        leftSidebarWidth={"180px"}
        rightSidebarWidth={"400px"}
        loading={loading}
      />
    </PageContainer>
  );
}
