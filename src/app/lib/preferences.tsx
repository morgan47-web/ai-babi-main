import { Preferences } from "./generated/models/Preferences"

export enum Preference {
  girls = "girls",
  anime = "anime",
}

export function getMainPreference(preferences?: Preferences) {
  if (!preferences) {
    return Preference.anime
  }
  return preferences.displayAnime
    ? Preference.anime
    : preferences.displayGirls
      ? Preference.girls
      : Preference.anime
}
