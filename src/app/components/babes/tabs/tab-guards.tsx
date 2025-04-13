import { ChatbotType } from "@/app/lib/generated"
import {
  PostCustomChatBotPayloadOptional,
  TABS,
} from "../../../[locale]/babes/create/creator-tabs"

export function artStyleGuard(request: PostCustomChatBotPayloadOptional) {
  return request.type !== undefined
}

export function ethnicityGuard(request: PostCustomChatBotPayloadOptional) {
  return (
    (artStyleGuard(request) && request.animeLora !== undefined) ||
    (request.type !== "anime" && request.type !== undefined)
  )
}

export function bodyGuard(request: PostCustomChatBotPayloadOptional) {
  return (
    ((request.ethnicity !== undefined &&
      request.type !== ChatbotType.Fantasy) ||
      (request.type === ChatbotType.Fantasy &&
        request.fantasyRace !== undefined)) &&
    ethnicityGuard(request)
  )
}

export function hairGuard(request: PostCustomChatBotPayloadOptional) {
  return (
    request.looks?.bodyType !== undefined &&
    request.looks?.breastSize !== undefined &&
    request.looks?.buttSize !== undefined &&
    bodyGuard(request)
  )
}

export function personalityGuard(request: PostCustomChatBotPayloadOptional) {
  return (
    request.looks?.hairStyle !== undefined &&
    request.looks?.hairColor !== undefined &&
    request.looks?.eyeColor !== undefined &&
    hairGuard(request)
  )
}

export function occupationGuard(request: PostCustomChatBotPayloadOptional) {
  return request.personality !== undefined && personalityGuard(request)
}

export function relationshipGuard(request: PostCustomChatBotPayloadOptional) {
  return (
    (request.type === ChatbotType.Fantasy && personalityGuard(request)) ||
    (request.occupation !== undefined &&
      request.hobbies !== undefined &&
      occupationGuard(request))
  )
}

export function summaryGuard(request: PostCustomChatBotPayloadOptional) {
  return request.relationshipStatus !== undefined && relationshipGuard(request)
}

export function testTabGuard(
  currentTab: TABS,
  request: PostCustomChatBotPayloadOptional,
) {
  const tabGuards: Record<
    TABS,
    (request: PostCustomChatBotPayloadOptional) => boolean
  > = {
    [TABS.Style]: () => true,
    [TABS.ArtStyle]: artStyleGuard,
    [TABS.Ethnicity]: ethnicityGuard,
    [TABS.FantasyRace]: ethnicityGuard,
    [TABS.Body]: bodyGuard,
    [TABS.Hair]: hairGuard,
    [TABS.Personality]: personalityGuard,
    [TABS.Occupation]: occupationGuard,
    [TABS.Relationship]: relationshipGuard,
    [TABS.Summary]: summaryGuard,
  }
  const guard = tabGuards[currentTab]
  return guard(request)
}

export function testNextTabGuard(
  currentTab: TABS,
  request: PostCustomChatBotPayloadOptional,
) {
  const tabGuards: Record<
    TABS,
    (request: PostCustomChatBotPayloadOptional) => boolean
  > = {
    [TABS.Style]: artStyleGuard,
    [TABS.ArtStyle]: ethnicityGuard,
    [TABS.Ethnicity]: bodyGuard,
    [TABS.FantasyRace]: bodyGuard,
    [TABS.Body]: hairGuard,
    [TABS.Hair]: personalityGuard,
    [TABS.Personality]: occupationGuard,
    [TABS.Occupation]: relationshipGuard,
    [TABS.Relationship]: summaryGuard,
    [TABS.Summary]: () => true,
  }
  const guard = tabGuards[currentTab]
  return guard(request)
}
