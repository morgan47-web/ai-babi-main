"use client";

import ChangePasswordDialog from "@/app/components/dialog/change-password";
import { Button } from "@/components/ui/button";
import Checkbox from "@/components/ui/check-box";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TabsContent } from "@/components/ui/tabs";
import React, { useState } from "react";
import { CheckedState } from "@radix-ui/react-checkbox";
import { useUser } from "@/app/context/user";
import { patchUser } from "@/app/lib/server/actions/actions";
import { Spinner } from "@/components/ui/spinner";
import { TABS } from "@/app/[locale]/(authenticated)/profile/tabs";
import CharacterAvatar from "@/app/components/character/character-avatar";
import { Trans } from "@lingui/react/macro";
import { getMainPreference } from "@/app/lib/preferences";
import DeleteAccountDialog from "@/app/components/dialog/cancel/delete-account";

export default function SettingsTab() {
  const user = useUser();
  const usernameRef = React.useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [checkedItems, setCheckedItems] = useState({
    girls: user?.user.preferences.displayGirls ?? false,
    anime: user?.user.preferences.displayAnime ?? false,
  });

  const handleCheckboxChange = (name: string, checked: CheckedState) => {
    setCheckedItems((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    await patchUser({
      username: usernameRef.current?.value,
      preferences: {
        displayAnime: checkedItems.anime,
        displayGirls: checkedItems.girls,
        usernameUpdated: true,
      },
    }).then(() => {
      setLoading(false);
      user?.setUser((prevState) => ({
        ...prevState,
        username: usernameRef.current?.value ?? prevState.username,
        preferences: {
          displayAnime: checkedItems.anime,
          displayGirls: checkedItems.girls,
        },
        mainPreference: getMainPreference({
          displayAnime: checkedItems.anime,
          displayGirls: checkedItems.girls,
        }),
      }));
    });
  };

  return (
    <TabsContent value={TABS.Settings.value} className="mx-auto px-2 py-8">
      <form
        className="mx-auto flex max-w-md flex-col space-y-2"
        onSubmit={handleSubmit}
      >
        <div className="space-y-4">
          <div className="mb-8 mt-4 flex w-full justify-center">
            <div className="relative inline-flex">
              <CharacterAvatar
                image={""}
                name={user?.user?.username ?? ""}
                className="h-24 w-24 text-2xl"
              />
            </div>
          </div>
          <div className="space-y-2">
            <div className="space-y-1">
              <Label className="text-sm font-medium">
                <Trans>Username</Trans>
              </Label>
              <Input
                type="text"
                placeholder="username"
                ref={usernameRef}
                defaultValue={user?.user.username}
              />
            </div>
            <div className="space-y-1">
              <Label className="text-sm font-medium">
                <Trans>Email</Trans>
              </Label>
              <Input
                type="email"
                placeholder="email@example.com"
                readOnly={true}
                value={user?.user.email}
              />
            </div>
          </div>
          <div className="space-y-1">
            <Label className="text-sm font-medium">
              <Trans>Preferences</Trans>
            </Label>
            <div className="flex items-center justify-evenly">
              <Checkbox
                name="girls"
                checked={checkedItems.girls}
                onChange={handleCheckboxChange}
                label={<Trans>Realistic</Trans>}
                disabled={loading}
              />
              <Checkbox
                name="anime"
                checked={checkedItems.anime}
                onChange={handleCheckboxChange}
                label={<Trans>Anime</Trans>}
                disabled={loading}
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Button type="submit" size="lg" className="w-full" disabled={loading}>
            {loading ? <Spinner loading={loading} /> : <Trans>Save</Trans>}
          </Button>
          <ChangePasswordDialog />
          <DeleteAccountDialog />
        </div>
      </form>
    </TabsContent>
  );
}
