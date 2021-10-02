import React, { useEffect } from 'react';
import styled from 'styled-components';
import Page from '../components/core/Page';
import Header from '../components/core/Header';
import AllPageLeft from '../sidebar/AllPageLeft';
import { refreshDatabaseInBackend } from '../action/games';
import {
  CURRENT_PAGE,
  SETTINGS_PAGE_INDEX,
  _STORAGE_WRITE,
} from '../helper/storage';
import SettingsContent from '../content/SettingsContent';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  max-height: 100vh;
`;

export default function Settings() {
  useEffect(() => {
    _STORAGE_WRITE(CURRENT_PAGE, SETTINGS_PAGE_INDEX);
  }, []);

  const refreshDatabase = async () => {
    console.log('Refreshing Database');
    const response = await refreshDatabaseInBackend();
    if (response) {
      setTimeout(() => {
        window.location.href = '/games';
      }, 8000);
    }
  };

  return (
    <PageContainer>
      <Header />
      <Page
        leftSidebar={<AllPageLeft />}
        rightSidebar={''}
        content={<SettingsContent refreshDatabase={refreshDatabase} />}
        leftSidebarWidth={'180px'}
        rightSidebarWidth={'0px'}
      />
    </PageContainer>
  );
}
