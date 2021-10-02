import React, { useEffect } from "react";
import styled from "styled-components";
import Page from "../components/core/Page";
import AllPageLeft from "../sidebar/AllPageLeft";
import { useState } from "react";
import { fetchAchievementMilestones } from "../action/games";
import {
  CURRENT_PAGE,
  MILESTONE_PAGE_INDEX,
  _STORAGE_WRITE,
} from "../helper/storage";
import HeaderHistory from "../components/core/HeaderHistory";
import MilestoneContent from "../content/MilestoneContent";
import MilestoneRightPage from "../sidebar/MilestoneRightPage";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  max-height: 100vh;
`;

export default function Milestone() {
  const [achievements, setAchievements] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAchievementsMilestones = async (year) => {
      const achievementMilestones = await fetchAchievementMilestones(year);
      console.log(achievementMilestones);
      setAchievements((old) => achievementMilestones);
      setLoading((old) => false);
    };
    setLoading((old) => true);
    getAchievementsMilestones();
    _STORAGE_WRITE(CURRENT_PAGE, MILESTONE_PAGE_INDEX);
  }, []);

  return (
    <PageContainer>
      <HeaderHistory />
      <Page
        leftSidebar={<AllPageLeft />}
        rightSidebar={<MilestoneRightPage />}
        content={<MilestoneContent achievements={achievements} />}
        leftSidebarWidth={"180px"}
        rightSidebarWidth={"0px"}
        loading={loading}
      />
    </PageContainer>
  );
}
