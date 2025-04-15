"use client";

import { useDialogs } from "@/app/context/dialog";
import { useCallback, useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Preference } from "@/app/components/dialog/preference-dialog";
import { useUser } from "@/app/context/user";

export default function DialogOpener() {
  const { setSignupOpen } = useDialogs();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { setUser } = useUser();

  const removeQueryParam = useCallback(
    (param: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.delete(param);
      router.replace(`${pathname}?${params.toString()}`);
    },
    [router, pathname, searchParams]
  );

  const setPreference = useCallback(
    (cookie: string | undefined, queryParam: string | null) => {
      if (
        !cookie &&
        queryParam &&
        Object.values(Preference).includes(queryParam as Preference)
      ) {
        setUser((prev) => ({
          ...prev,
          preferences: {
            ...prev.preferences,
            displayGirls: queryParam === Preference.girls,
            displayAnime: queryParam === Preference.anime,
          },
        }));
        Cookies.set("preferences", queryParam, {
          expires: 365 * 100,
        });
      } else if (cookie) {
        setUser((prev) => ({
          ...prev,
          preferences: {
            ...prev.preferences,
            displayGirls: cookie === Preference.girls,
            displayAnime: cookie === Preference.anime,
          },
        }));
      }
    },
    [setUser]
  );

  useEffect(() => {
    const isSignup = searchParams.get("signup") === "true";
    const preferencesCookie = Cookies.get("preferences");
    const preferencesQueryParam = searchParams.get("preferences");

    setPreference(preferencesCookie, preferencesQueryParam);

    if (isSignup) {
      removeQueryParam("signup");
      setSignupOpen(true);
    }
  }, [searchParams, setPreference, setSignupOpen, removeQueryParam, setUser]);

  return null;
}
