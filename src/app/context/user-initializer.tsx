"use client"

import { useEffect } from "react"
import { UserState, useUser } from "../context/user"
import { validateJWT } from "../lib/server/actions/actions"
import Cookies from "js-cookie"
import { useLingui } from "@lingui/react/macro"
import { getMainPreference, Preference } from "../lib/preferences"

export const uninitializedUser: UserState = {
  initialized: false,
  id: "",
  role: "user",
  email: "",
  oauth: false,
  username: "",
  isFirstLogin: false,
  feedback_given: false,
  subscription: {
    price: 0,
    status: null,
    tokens: 0,
    termEnd: new Date(),
  },
  preferences: {
    displayAnime: false,
    displayGirls: false,
    displayUnlockWarning: true,
    usernameUpdated: false,
  },
  mainPreference: Preference.anime,
  hasUnseenImages: false,
}

export default function UserInitializer() {
  const { setUser } = useUser()
  const { i18n } = useLingui()

  const getDefaultPreferences = () => {
    return {
      ...uninitializedUser.preferences,
      displayAnime: true,
    }
  }

  useEffect(() => {
    async function fetchUser() {
      const response = await validateJWT()
      if (response.ok && response.data) {
        setUser((userData) => ({
          ...userData,
          initialized: true,
          id: response.data?.userId ?? "",
          email: response.data?.email ?? "",
          role: response.data?.role ?? "user",
          username: response.data?.username ?? "",
          oauth: response.data?.oauth ?? false,
          feedback_given: response.data?.feedbackGiven ?? false,
          isFirstLogin: response.data?.firstLogin ?? false,
          subscription:
            response.data?.subscription ?? uninitializedUser.subscription,
          preferences: response.data?.preferences ?? getDefaultPreferences(),
          mainPreference: getMainPreference(response.data?.preferences),
          hasUnseenImages: response.data?.hasUnseenImages ?? false,
        }))
        Cookies.set("user_id", response.data.userId)
      } else {
        setUser({
          ...uninitializedUser,
          initialized: true,
          preferences: getDefaultPreferences(),
        })
      }
    }

    fetchUser()
  }, [setUser])

  useEffect(() => {
    Cookies.set("NEXT_LOCALE", i18n.locale)
  }, [i18n.locale])

  return null
}
