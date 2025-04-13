import { UserState } from "../context/user"
import { DialogContextValue } from "../context/dialog"
import { PremiumDialogType } from "../components/dialog/dialog-types"

export function signupGuard(
  user: UserState | undefined,
  dialogs: DialogContextValue,
): boolean {
  if (!isSignedUp(user)) {
    dialogs.setSignupOpen(true)
    return false
  }
  return true
}

export function isPremiumGuard(
  user: UserState | undefined,
  dialogs: DialogContextValue,
  premiumDialogType: PremiumDialogType,
): boolean {
  if (!isSignedUp(user)) {
    dialogs.setSignupOpen(true)
    return false
  } else if (!isValidUser(user)) {
    dialogs.setPremiumOpen(true, premiumDialogType)
    return false
  }
  return true
}

export function isSignedUp(user: UserState | undefined): boolean {
  return user != undefined && user.initialized && user.id != ""
}

export function isInitialized(user: UserState | undefined): boolean {
  return user != undefined && user.initialized
}

export function isSubscribedOrTrial(user: UserState | undefined): boolean {
  return (
    user !== undefined &&
    user.initialized &&
    (user.subscription.status === "active" ||
      user.subscription.status === "trial")
  )
}

export function isSubscribed(user: UserState | undefined): boolean {
  return (
    user !== undefined &&
    user.initialized &&
    user.subscription.status === "active"
  )
}

export function isInactiveOrTrial(user: UserState | undefined): boolean {
  return (
    user != undefined &&
    user.initialized &&
    (user.subscription.status === "inactive" ||
      user.subscription.status === "trial")
  )
}

export function isTrial(user: UserState | undefined): boolean {
  return (
    user != undefined &&
    user.initialized &&
    user.subscription.status === "trial"
  )
}

export function isAdmin(user: UserState | undefined): boolean {
  return user != undefined && user.initialized && user.role === "admin"
}

export function isCanceledBeforeTermEnd(user: UserState | undefined): boolean {
  return (
    user != undefined &&
    user.initialized &&
    user.subscription.status === "canceled" &&
    user.subscription.termEnd !== undefined &&
    user.subscription.termEnd > new Date()
  )
}

export function isValidUser(user: UserState | undefined): boolean {
  return (
    user != undefined &&
    user.initialized &&
    (isSubscribedOrTrial(user) ||
      (isTrial(user) && user.subscription.tokens > 0) ||
      isAdmin(user) ||
      isCanceledBeforeTermEnd(user))
  )
}
