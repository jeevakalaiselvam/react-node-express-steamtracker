export const TARGET_DEFAULT_COMPLETION = 100;
export const CURRENT_PAGE = "CURRENT_PAGE";
export const COMPLETION_TARGET = "COMPLETION_TARGET";
export const STORAGE_HEADER_TOTAL_GAMES = "HEADER_TOTAL_GAMES";
export const STORAGE_HEADER_TOTAL_ACHIEVEMENTS = "HEADER_TOTAL_ACHIEVEMENTS";
export const STORAGE_HEADER_TOTAL_PERFECT_GAMES = "HEADER_TOTAL_PERFECT_GAMES";
export const STORAGE_HEADER_AVERAGE_COMPLETION = "HEADER_AVERAGE_COMPLETION";
export const PAGINATION_TOTAL_COUNT = "PAGINATION_TOTAL_COUNT";
export const SELECTED_GAME = "SELECTED_GAME";
export const SELECTED_GAME_COMPLETED_PERCETAGE =
  "SELECTED_GAME_COMPLETED_PERCETAGE";
export const SELECTED_GAME_TOTAL = "SELECTED_GAME_TOTAL";

export const SELECTED_GAME_COMPLETED = "SELECTED_GAME_COMPLETED";

export const GAMEPAGE_SELECT = "GAMEPAGE_SELECT";
export const GAMEPAGE_SORT = "GAMEPAGE_SORT";
export const GAMEPAGE_VIEW = "GAMEPAGE_VIEW";
export const ACHIEVEMENTSPAGE_SELECT = "ACHIEVEMENTSPAGE_SELECT";
export const ACHIEVEMENTSPAGE_SORT = "ACHIEVEMENTSPAGE_SORT";
export const ACHIEVEMENTSPAGE_VIEW = "ACHIEVEMENTSPAGE_VIEW";
export const ACHIEVEMENTGAMEPAGE_SELECT = "ACHIEVEMENTGAMEPAGE_SELECT";
export const ACHIEVEMENTGAMEPAGE_SORT = "ACHIEVEMENTGAMEPAGE_SORT";
export const ACHIEVEMENTGAMEPAGE_VIEW = "ACHIEVEMENTGAMEPAGE_VIEW";

export const BACKLOGPAGE_SELECT = "BACKLOGPAGE_SELECT";
export const BACKLOGPAGE_SORT = "BACKLOGPAGE_SORT";
export const BACKLOGPAGE_VIEW = "BACKLOGPAGE_VIEW";

export const GAMEPAGE_HEADER_TOTAL = "GAMEPAGE_HEADER_TOTAL";
export const GAMEPAGE_HEADER_COMPLETED = "GAMEPAGE_HEADER_COMPLETED";
export const GAMEPAGE_HEADER_REMAINING = "GAMEPAGE_HEADER_REMAINING";
export const HISTORYPAGE_VIEW = "HISTORYPAGE_VIEW";

//PAGE INDEXES
export const GAMES_PAGE_INDEX = "games";
export const ACHIEVEMENTS_PAGE_INDEX = "achievements";
export const NEXT_PAGE_INDEX = "next";
export const RANDOM_PAGE_INDEX = "random";
export const SETTINGS_PAGE_INDEX = "settings";
export const BACKLOG_PAGE_INDEX = "backlog";
export const MILESTONE_PAGE_INDEX = "milestone";
export const HISTORY_PAGE_INDEX = "history";

export const HISTORY_PAGE_YEAR_SELECTED = "HISTORY_PAGE_YEAR_SELECTED";

export const GAMES_INFO_TOTAL_GAMES = "GAMES_INFO_TOTAL_GAMES";
export const GAMES_INFO_TOTAL_MEDALS = "GAMES_INFO_TOTAL_MEDALS";
export const GAMES_INFO_TOTAL_ACHIEVEMENTS = "GAMES_INFO_TOTAL_ACHIEVEMENTS";

///ALL STORAGE RELATED FUNCTIONS

export const getCompletionTarget = () => {
  const completionTarget = _STORAGE_READ("COMPLETION_TARGET");
  if (completionTarget) return completionTarget;
  else return 80;
};

export const _STORAGE_READ = (key) => {
  return localStorage.getItem(key);
};
export const _STORAGE_WRITE = (key, data) => {
  localStorage.setItem(key, data);
};

export const _STORAGE_APPEND_ARRAY = (key, newItem) => {
  const arrayStored = JSON.parse(localStorage.getItem(key));
  if (arrayStored) {
    arrayStored.push(newItem);
    const newArray = JSON.stringify(arrayStored);
    localStorage.setItem(key, newArray);
  }
};

export const _STORAGE_REMOVE_ARRAY = (key, itemToRemove) => {
  const arrayStored = JSON.parse(localStorage.getItem(key));
  if (arrayStored) {
    const removedArray = arrayStored.filter((item) => item !== itemToRemove);
    const newArray = JSON.stringify(removedArray);
    localStorage.setItem(key, newArray);
  }
};

export const _STORAGE_CHECK_ARRAY = (key, item) => {
  const arrayStored = JSON.parse(localStorage.getItem(key));
  if (!arrayStored) {
    const tmp = [];
    tmp.push(item);
    _STORAGE_WRITE(key, JSON.stringify(tmp));
  }
  if (arrayStored && arrayStored.includes(item)) {
    return true;
  }

  return false;
};

export const storeHeadInfoLocalStorage = (gamesInfo) => {
  const {
    total_games,
    completed_achievements,
    perfect_games_count,
    average_completion,
  } = gamesInfo;

  _STORAGE_WRITE(STORAGE_HEADER_TOTAL_GAMES, total_games);
  _STORAGE_WRITE(STORAGE_HEADER_TOTAL_ACHIEVEMENTS, completed_achievements);
  _STORAGE_WRITE(STORAGE_HEADER_TOTAL_PERFECT_GAMES, perfect_games_count);
  _STORAGE_WRITE(STORAGE_HEADER_AVERAGE_COMPLETION, average_completion);
};

export const addToLocalStorage = (key, data) => {
  _STORAGE_WRITE(key, data);
};
