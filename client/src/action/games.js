import axios from "axios";
import {
  COMPLETION_TARGET,
  PAGINATION_TOTAL_COUNT,
  storeHeadInfoLocalStorage,
  TARGET_DEFAULT_COMPLETION,
  _STORAGE_READ,
  _STORAGE_WRITE,
} from "../helper/storage";
import {
  includePageQuery,
  includeSelectQueryAchievements,
  includeSelectQueryAchievementsForGame,
  includeSelectQueryGames,
  includeSortQueryAchievements,
  includeSortQueryAchievementsForGame,
  includeSortQueryGames,
} from "../helper/queryHelper";

export const fetchGames = async (
  sortOrder,
  viewOrder,
  gamesPage,
  selectOrder
) => {
  let gamesResponse = {};

  const mainURL = `${process.env.REACT_APP_API_ENDPOINT}games?`;
  const selectedAddedURL = includeSelectQueryGames(mainURL, selectOrder);
  const sortAddedURL = includeSortQueryGames(selectedAddedURL, sortOrder);
  const pageAddedURL = includePageQuery(sortAddedURL, gamesPage);
  gamesResponse = (await axios.get(pageAddedURL)).data;
  _STORAGE_WRITE(PAGINATION_TOTAL_COUNT, gamesResponse.total);
  return gamesResponse.games ?? {};
};

export const refreshDatabaseInBackend = async () => {
  let refreshInfo = "";
  refreshInfo = (
    await axios.get(`${process.env.REACT_APP_API_ENDPOINT}refresh`)
  ).data.status;

  if (refreshInfo === "success") {
    return true;
  }
};

export const fetchAchievements = async (
  sortOrder,
  viewOrder,
  achievementPage,
  selectOrder
) => {
  let achievementsResponse = {};

  const mainURL = `${process.env.REACT_APP_API_ENDPOINT}achievements?`;
  const selectedAddedURL = includeSelectQueryAchievements(mainURL, selectOrder);
  const sortAddedURL = includeSortQueryAchievements(
    selectedAddedURL,
    sortOrder
  );
  const pageAddedURL = includePageQuery(sortAddedURL, achievementPage);
  achievementsResponse = (await axios.get(pageAddedURL)).data;
  _STORAGE_WRITE(PAGINATION_TOTAL_COUNT, achievementsResponse.total);
  return achievementsResponse.achievements ?? {};
};

export const fetchGamesInfo = async () => {
  let gamesInfo = {};
  gamesInfo = (
    await axios.get(`${process.env.REACT_APP_API_ENDPOINT}games/info`)
  ).data;

  //Store data in local storage
  storeHeadInfoLocalStorage(gamesInfo);

  return gamesInfo;
};

export const fetchGameInfo = async (gameId) => {
  let gamesInfo = {};
  gamesInfo = (
    await axios.get(
      `${process.env.REACT_APP_API_ENDPOINT}game/info?gameid=${gameId}`
    )
  ).data;

  //Store data in local storage
  storeHeadInfoLocalStorage(gamesInfo);

  return gamesInfo;
};

export const fetchRemainingForGame = async () => {
  let gamesInfo = {};
  gamesInfo = (
    await axios.get(`${process.env.REACT_APP_API_ENDPOINT}games/info`)
  ).data;

  //Store data in local storage
  storeHeadInfoLocalStorage(gamesInfo);

  return gamesInfo;
};

export const fetchAchievementsBacklog = async (
  sortOrder,
  viewOrder,
  achievementPage,
  selectOrder = 2
) => {
  let achievementsResponse = {};

  const mainURL = `${process.env.REACT_APP_API_ENDPOINT}backlog?target=${
    _STORAGE_READ(COMPLETION_TARGET) ?? TARGET_DEFAULT_COMPLETION
  }&`;
  const selectedAddedURL = includeSelectQueryAchievements(mainURL, selectOrder);
  const sortAddedURL = includeSortQueryAchievements(
    selectedAddedURL,
    sortOrder
  );
  const pageAddedURL = includePageQuery(sortAddedURL, achievementPage);
  achievementsResponse = (await axios.get(pageAddedURL)).data;
  _STORAGE_WRITE(PAGINATION_TOTAL_COUNT, achievementsResponse.total);

  console.log(_STORAGE_READ(COMPLETION_TARGET));

  const completionFilteredAchievements =
    achievementsResponse.achievements.filter((achievement) => {
      if (
        achievement.game_completion <
        Number(_STORAGE_READ(COMPLETION_TARGET) ?? TARGET_DEFAULT_COMPLETION)
      ) {
        return true;
      } else {
        return false;
      }
    });

  return completionFilteredAchievements ?? {};
};

export const fetchAchievementsNext = async (achievementPage) => {
  let achievementsResponse = {};

  const mainURL = `${process.env.REACT_APP_API_ENDPOINT}next?`;
  const pageAddedURL = includePageQuery(mainURL, achievementPage);
  achievementsResponse = (await axios.get(pageAddedURL)).data;
  _STORAGE_WRITE(PAGINATION_TOTAL_COUNT, achievementsResponse.total);

  return achievementsResponse.achievements ?? {};
};

export const fetchGameRandom = async (force = false) => {
  let gameResponse = {};

  const mainURL = `${
    process.env.REACT_APP_API_ENDPOINT
  }random?force=${force}&target=${_STORAGE_READ(COMPLETION_TARGET)}`;
  console.log(mainURL);
  gameResponse = (await axios.get(mainURL)).data;

  return gameResponse ?? {};
};

export const fetchAchievementsForGame = async (
  sortOrder,
  viewOrder,
  achievementPage,
  selectOrder,
  gameId
) => {
  let achievementsResponse = {};

  const mainURL = `${process.env.REACT_APP_API_ENDPOINT}achievements/game?game=${gameId}&`;

  const selectedAddedURL = includeSelectQueryAchievementsForGame(
    mainURL,
    selectOrder
  );
  const sortAddedURL = includeSortQueryAchievementsForGame(
    selectedAddedURL,
    sortOrder
  );
  const pageAddedURL = includePageQuery(sortAddedURL, achievementPage);
  achievementsResponse = (await axios.get(pageAddedURL)).data;
  _STORAGE_WRITE(PAGINATION_TOTAL_COUNT, achievementsResponse.total);

  const hiddenAchievements = (
    await axios.get(
      `${process.env.REACT_APP_API_ENDPOINT}achievements/hidden?gameid=${gameId}`
    )
  ).data;

  const allAchievements = achievementsResponse;
  allAchievements.achievements.forEach((achievement) => {
    if (achievement.hidden === 1) {
      const hiddenSelectedAchievement = hiddenAchievements.find(
        (hiddenAchievement) => {
          if (
            hiddenAchievement.name.trim().toLowerCase() ===
            achievement.name.trim().toLowerCase()
          )
            return true;
          else return false;
        }
      );
      achievement.description = hiddenSelectedAchievement.description;
    }
  });

  return allAchievements ?? {};
};

export const fetchOverlayImages = async (
  gamesCount = 10,
  perfectGamesCount = 10,
  achievementCount = 20
) => {
  const allImages = (
    await axios.get(
      `${process.env.REACT_APP_API_ENDPOINT}overlay?perfectgames=${perfectGamesCount}&games=${gamesCount}&achievements=${achievementCount}`
    )
  ).data;
  return allImages;
};

export const fetAchievementsForYearRecentSorted = async (year) => {
  const allAchievementsForYear = (
    await axios.get(
      `${process.env.REACT_APP_API_ENDPOINT}achievements/history?year=${year}`
    )
  ).data;

  return allAchievementsForYear;
};

export const fetchAchievementMilestones = async (year) => {
  const achievementsMilestones = (
    await axios.get(
      `${process.env.REACT_APP_API_ENDPOINT}achievements/milestones`
    )
  ).data;

  return achievementsMilestones;
};
