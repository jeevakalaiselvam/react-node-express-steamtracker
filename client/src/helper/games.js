import { getCompletionTarget } from "./storage";

export const getGamesSortedByCompletion = (games) => {
  let sortedGames = [];
  sortedGames = games
    .sort((game1, game2) => {
      return game2.completion_percentage - game1.completion_percentage;
    })
    .slice();
  return sortedGames;
};

export const getGamesSortedByPlaytime = (games) => {
  let sortedGames = [];
  sortedGames = games
    .sort((game1, game2) => {
      return game2.playtime_minutes - game1.playtime_minutes;
    })
    .slice();
  return sortedGames;
};

export const getAllUnlockedAchievementsCount = (games) => {
  let totalAchievements = 0;

  if (games.length) {
    games.forEach((game) => {
      totalAchievements += game.completed_achievements_count;
    });
  }

  return totalAchievements;
};

export const getPerfectGamesCount = (games) => {
  let perfectGames = 0;

  if (games.length) {
    games.forEach((game) => {
      game.completion_percentage >= getCompletionTarget() &&
        (perfectGames += 1);
    });
  }

  return perfectGames;
};
