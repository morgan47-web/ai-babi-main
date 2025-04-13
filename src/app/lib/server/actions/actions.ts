"use server"

import { getZpps } from "../zpps"

import * as client from "../../generated"
import { UnlockResponse } from "../../generated/models/UnlockResponse"
import { v4 as uuidv4 } from "uuid"
import { ResponseError } from "../../generated/runtime"
import {
  DeleteUserRequest,
  MemoracekType,
  UserClaimType,
} from "../../generated"

export interface APIResponse<T> {
  ok: boolean
  code: number
  headers: Headers
  data?: T | undefined
  error?: string | undefined
}

async function callAPI<T>(api: () => Promise<client.ApiResponse<T>>) {
  const response = await api()
  return {
    ok: response.raw.ok,
    code: response.raw.status,
    headers: response.raw.headers,
    data: response.raw.ok ? await response.value() : undefined,
  }
}

async function handleErrorResponse<T>(e: unknown): Promise<APIResponse<T>> {
  console.error(e)
  if (e instanceof ResponseError) {
    return {
      ok: e.response.ok,
      code: e.response.status,
      headers: e.response.headers,
      error: await e.response.text(),
    }
  } else {
    return {
      ok: false,
      code: 500,
      headers: new Headers(),
      error: `Unknown error: ${e}`,
    }
  }
}

export async function login(params: { email: string; password: string }) {
  try {
    const zpps = await getZpps()
    const response = await callAPI<client.UserInfoResponse>(() =>
      zpps.auth.loginAuthLoginPostRaw({
        postLogin: {
          email: params.email,
          password: params.password,
        },
      }),
    )
    return response
  } catch (e: unknown) {
    return handleErrorResponse<client.UserInfoResponse>(e)
  }
}

export async function register(
  params: client.PostUserRequest,
): Promise<APIResponse<client.UserInfoResponse>> {
  try {
    const zpps = await getZpps()
    const response = await callAPI<client.UserInfoResponse>(() =>
      zpps.auth.createUserAuthUserPostRaw({ postUserRequest: params }),
    )
    return response
  } catch (e: unknown) {
    return handleErrorResponse<client.UserInfoResponse>(e)
  }
}

export async function resendEmail(email: string): Promise<APIResponse<void>> {
  try {
    const zpps = await getZpps()
    const response = await callAPI<void>(() =>
      zpps.auth.resendVerificationEmailAuthUserVerifyResendEmailPostRaw({
        postResendEmailRequest: { email },
      }),
    )
    return response
  } catch (e: unknown) {
    return handleErrorResponse<void>(e)
  }
}

export async function validateJWT(): Promise<
  APIResponse<client.UserInfoResponse>
> {
  try {
    const zpps = await getZpps()
    const response = await callAPI<client.UserInfoResponse>(() =>
      zpps.auth.jwtAuthJwtPostRaw(),
    )
    return response
  } catch (e: unknown) {
    return handleErrorResponse<client.UserInfoResponse>(e)
  }
}

// Chat Actions
export async function sendMessage({
  chatbotId,
  clientId,
  message,
}: {
  chatbotId: string
  clientId: string
  message: string
}): Promise<APIResponse<client.ChatReponse>> {
  try {
    const requestId = uuidv4()

    const postChatRequest: client.PostChatRequest = {
      query: message,
      clientId: clientId,
      requestId,
      debug: false,
    }

    const zpps = await getZpps()
    return await callAPI<client.ChatReponse>(() =>
      zpps.chat.chatChatChatbotIdPostRaw({
        chatbotId,
        postChatRequest,
      }),
    )
  } catch (e: unknown) {
    return handleErrorResponse<client.ChatReponse>(e)
  }
}

export async function getConversation(
  chatbotId: string,
): Promise<APIResponse<client.GetConversationResponse>> {
  try {
    const zpps = await getZpps()
    return await callAPI<client.GetConversationResponse>(() =>
      zpps.chat.conversationChatChatbotIdGetRaw({
        chatbotId,
      }),
    )
  } catch (e: unknown) {
    return handleErrorResponse<client.GetConversationResponse>(e)
  }
}

export async function getConversations(): Promise<
  APIResponse<client.ListConversationsResponse>
> {
  try {
    const zpps = await getZpps()
    return await callAPI<client.ListConversationsResponse>(() =>
      zpps.chat.conversationsChatGetRaw(),
    )
  } catch (e: unknown) {
    return handleErrorResponse<client.ListConversationsResponse>(e)
  }
}

// Chatbot Actions
export async function getChatbot(
  chatbotId: string,
): Promise<APIResponse<client.GetChatbotResponse>> {
  try {
    const zpps = await getZpps()
    return await callAPI<client.GetChatbotResponse>(() =>
      zpps.chatbot.getChatbotChatbotIdGetRaw({
        chatbotId,
      }),
    )
  } catch (e: unknown) {
    return handleErrorResponse(e)
  }
}

export async function getChatbots(): Promise<
  APIResponse<client.GetChatbotListResponse>
> {
  try {
    const zpps = await getZpps()
    return await callAPI<client.GetChatbotListResponse>(() =>
      zpps.chatbot.listChatbotGetRaw(),
    )
  } catch (e: unknown) {
    return handleErrorResponse<client.GetChatbotListResponse>(e)
  }
}

export async function unlockChatbot(
  chatbotId: string,
  displayWarning?: boolean,
): Promise<APIResponse<client.UnlockChatbotResponse>> {
  try {
    const zpps = await getZpps()
    return await callAPI<client.UnlockChatbotResponse>(() =>
      zpps.chatbot.unlockChatbotChatbotIdUnlockPutRaw({
        chatbotId,
        unlockChatbotRequest: {
          displayWarning,
        },
      }),
    )
  } catch (e: unknown) {
    return handleErrorResponse<client.UnlockChatbotResponse>(e)
  }
}

// Posts
export async function getPosts(
  paginationToken?: string,
): Promise<APIResponse<client.GetPostsResponse>> {
  try {
    const zpps = await getZpps()
    return await callAPI<client.GetPostsResponse>(() =>
      zpps.post.listPostGetRaw({ paginationToken }),
    )
  } catch (e: unknown) {
    return handleErrorResponse<client.GetPostsResponse>(e)
  }
}

export async function likePost(postId: string): Promise<APIResponse<void>> {
  try {
    const zpps = await getZpps()
    return await callAPI<void>(() =>
      zpps.post.likePostPostIdLikePutRaw({
        postId,
      }),
    )
  } catch (e: unknown) {
    return handleErrorResponse<void>(e)
  }
}

export async function unlockPost(
  postId: string,
): Promise<APIResponse<UnlockResponse>> {
  try {
    const zpps = await getZpps()
    return await callAPI<UnlockResponse>(() =>
      zpps.post.unlockPostPostIdUnlockPutRaw({
        postId,
      }),
    )
  } catch (e: unknown) {
    return handleErrorResponse<UnlockResponse>(e)
  }
}

export async function unlockGallery(
  galleryId: string,
): Promise<APIResponse<UnlockResponse>> {
  try {
    const zpps = await getZpps()
    return await callAPI<UnlockResponse>(() =>
      zpps.post.unlockGalleryPostGalleryGalleryIdUnlockPutRaw({
        galleryId,
      }),
    )
  } catch (e: unknown) {
    return handleErrorResponse<UnlockResponse>(e)
  }
}

export async function oauthLogin(
  payload: client.PostOAuth,
): Promise<APIResponse<client.OAuthResponse>> {
  try {
    const zpps = await getZpps()
    return await callAPI<client.OAuthResponse>(() =>
      zpps.auth.oauthLoginAuthOauthAuthorizationPostRaw({
        postOAuth: payload,
      }),
    )
  } catch (e: unknown) {
    return handleErrorResponse<client.OAuthResponse>(e)
  }
}

export async function getChatImages(
  chatbotId: string,
): Promise<APIResponse<client.ChatImagesResponse>> {
  try {
    const zpps = await getZpps()
    return await callAPI<client.ChatImagesResponse>(() =>
      zpps.chat.getImagesChatImagesChatbotIdGetRaw({
        chatbotId: chatbotId,
      }),
    )
  } catch (e: unknown) {
    return handleErrorResponse<client.ChatImagesResponse>(e)
  }
}

export async function downloadChatbotImage(
  chatbotId: string,
  imageName: string,
  contentType?: client.ContentType,
): Promise<APIResponse<void>> {
  try {
    const zpps = await getZpps()
    return await callAPI<void>(() =>
      zpps.chatbot.attachmentChatbotChatbotIdAttachmentGetRaw({
        chatbotId,
        imageName,
        contentType: contentType ?? null,
      }),
    )
  } catch (e: unknown) {
    return handleErrorResponse<void>(e)
  }
}

export async function getGenerationTags(
  chatbotId: string,
  imageName: string,
): Promise<APIResponse<client.GetGenerationTagsResponse>> {
  try {
    const zpps = await getZpps()
    return await callAPI<client.GetGenerationTagsResponse>(() =>
      zpps.chatbot.generationTagsChatbotChatbotIdTagsGetRaw({
        chatbotId,
        imageName,
      }),
    )
  } catch (e: unknown) {
    return handleErrorResponse<client.GetGenerationTagsResponse>(e)
  }
}

export async function deleteChatImage(
  chatbotId: string,
  imageId: string,
): Promise<APIResponse<void>> {
  try {
    const zpps = await getZpps()
    return await callAPI<void>(() =>
      zpps.post.deleteChatImagePostPrivateChatChatbotIdPictureIdDeleteRaw({
        chatbotId: chatbotId,
        pictureId: imageId,
      }),
    )
  } catch (e: unknown) {
    return handleErrorResponse<void>(e)
  }
}

export async function patchChatImage(
  chatbotId: string,
  imageId: string,
  request: client.PatchChatImageRequest,
): Promise<APIResponse<void>> {
  try {
    const zpps = await getZpps()
    return await callAPI<void>(() =>
      zpps.post.patchChatImagePostPrivateChatChatbotIdPictureIdPatchRaw({
        chatbotId: chatbotId,
        pictureId: imageId,
        patchChatImageRequest: request,
      }),
    )
  } catch (e: unknown) {
    return handleErrorResponse<void>(e)
  }
}

export async function generateImage(
  chatbotId: string,
  request: client.PostImagenRequest,
): Promise<APIResponse<client.PostImagenResponse>> {
  try {
    const zpps = await getZpps()
    return await callAPI<client.PostImagenResponse>(() =>
      zpps.imagen.userGenerateImageImagenGenerateChatbotIdPostRaw({
        chatbotId: chatbotId,
        postImagenRequest: request,
      }),
    )
  } catch (e: unknown) {
    return handleErrorResponse<client.PostImagenResponse>(e)
  }
}

export async function createCustomChatbot(
  request: client.PostCustomChatBotPayload,
): Promise<APIResponse<client.PostCustomChatbotResponse>> {
  try {
    const zpps = await getZpps()
    return await callAPI<client.PostCustomChatbotResponse>(() =>
      zpps.chatbot.createCustomChatbotChatbotCustomPostRaw({
        postCustomChatBotPayload: request,
      }),
    )
  } catch (e: unknown) {
    return handleErrorResponse<client.PostCustomChatbotResponse>(e)
  }
}

export async function getCustomChatbots(): Promise<
  APIResponse<client.GetCustomChatbotListResponse>
> {
  try {
    const zpps = await getZpps()
    return await callAPI<client.GetCustomChatbotListResponse>(() =>
      zpps.chatbot.listCustomChatbotChatbotCustomGetRaw(),
    )
  } catch (e: unknown) {
    return handleErrorResponse<client.GetCustomChatbotListResponse>(e)
  }
}

export async function getCustomChatbot(
  chatbotID: string,
): Promise<APIResponse<client.GetCustomChatbotResponse>> {
  try {
    const zpps = await getZpps()
    return await callAPI<client.GetCustomChatbotResponse>(() =>
      zpps.chatbot.getCustomChatbotChatbotCustomChatbotIdGetRaw({
        chatbotId: chatbotID,
      }),
    )
  } catch (e: unknown) {
    return handleErrorResponse<client.GetCustomChatbotResponse>(e)
  }
}

export async function deleteCustomChatbot(
  chatbotID: string,
): Promise<APIResponse<void>> {
  try {
    const zpps = await getZpps()
    return await callAPI<void>(() =>
      zpps.chatbot.deleteCustomChatbotChatbotCustomChatbotIdDeleteRaw({
        chatbotId: chatbotID,
      }),
    )
  } catch (e: unknown) {
    return handleErrorResponse<void>(e)
  }
}

export async function updateCustomChatbot(
  chatbotID: string,
  request: client.PatchCustomChatbotRequest,
): Promise<APIResponse<void>> {
  try {
    const zpps = await getZpps()
    return await callAPI<void>(() =>
      zpps.chatbot.updateCustomChatbotChatbotCustomChatbotIdPatchRaw({
        chatbotId: chatbotID,
        patchCustomChatbotRequest: request,
      }),
    )
  } catch (e: unknown) {
    return handleErrorResponse<void>(e)
  }
}

export async function patchUser(
  payload: client.PatchUserRequest,
): Promise<APIResponse<void>> {
  try {
    const zpps = await getZpps()
    return await callAPI<void>(() =>
      zpps.user.patchUserPatchRaw({ patchUserRequest: payload }),
    )
  } catch (e: unknown) {
    return handleErrorResponse<void>(e)
  }
}

export async function changePassword(payload: client.PutPasswordRequest) {
  try {
    const zpps = await getZpps()
    return await callAPI(() =>
      zpps.user.updatePasswordUserPasswordPutRaw({
        putPasswordRequest: payload,
      }),
    )
  } catch (e: unknown) {
    return handleErrorResponse(e)
  }
}

export async function getUserGallery(): Promise<
  APIResponse<client.GetGalleryResponse>
> {
  try {
    const zpps = await getZpps()
    return await callAPI<client.GetGalleryResponse>(() =>
      zpps.user.getGalleryUserGalleryGetRaw(),
    )
  } catch (e: unknown) {
    return handleErrorResponse<client.GetGalleryResponse>(e)
  }
}

export async function getPrices(): Promise<
  APIResponse<client.GetPricesResponse>
> {
  try {
    const zpps = await getZpps()
    return await callAPI<client.GetPricesResponse>(() =>
      zpps.subscription.getPricesSubscriptionPricesGetRaw(),
    )
  } catch (e: unknown) {
    return handleErrorResponse<client.GetPricesResponse>(e)
  }
}

export async function deleteUser(
  payload: DeleteUserRequest,
): Promise<APIResponse<client.DeleteUserDeleteRequest>> {
  try {
    const zpps = await getZpps()
    return await callAPI(() =>
      zpps.user.deleteUserDeleteRaw({ deleteUserRequest: payload }),
    )
  } catch (e: unknown) {
    return handleErrorResponse(e)
  }
}

export async function cancelSubscription(
  payload: client.CancelSubscriptionRequest,
): Promise<APIResponse<void>> {
  try {
    const zpps = await getZpps()
    return await callAPI<void>(() =>
      zpps.subscription.cancelSubscriptionCancelPatchRaw({
        cancelSubscriptionRequest: payload,
      }),
    )
  } catch (e: unknown) {
    return handleErrorResponse<void>(e)
  }
}

export async function rateApp(
  payload: client.PostRatingRequest,
): Promise<APIResponse<client.PostRatingResponse>> {
  try {
    const zpps = await getZpps()
    return await callAPI<client.PostRatingResponse>(() =>
      zpps.user.postRatingUserRatingPostRaw({ postRatingRequest: payload }),
    )
  } catch (e: unknown) {
    return handleErrorResponse<client.PostRatingResponse>(e)
  }
}

export async function sendMemoracek(
  type: MemoracekType,
): Promise<APIResponse<void>> {
  try {
    const zpps = await getZpps()
    return await callAPI<void>(() =>
      zpps.utilities.sendMemoracekUtilsSendMemoracekPostRaw({
        sendMemoracekRequest: { type },
      }),
    )
  } catch (e: unknown) {
    return handleErrorResponse<void>(e)
  }
}

export async function sendCustomMemoracek(
  text: string,
): Promise<APIResponse<void>> {
  try {
    const zpps = await getZpps()
    return await callAPI<void>(() =>
      zpps.utilities.sendCustomMemoracekUtilsSendMemoracekCustomPostRaw({
        sendCustomMemoracekRequest: { text },
      }),
    )
  } catch (e: unknown) {
    return handleErrorResponse<void>(e)
  }
}

export async function checkout(
  planID: string,
  successUrl: string,
  declinedUrl: string,
): Promise<APIResponse<client.PostCheckoutResponse>> {
  try {
    const zpps = await getZpps()
    return await callAPI<client.PostCheckoutResponse>(() =>
      zpps.subscription.checkoutSubscriptionCheckoutPostRaw({
        postCheckoutSessionRequest: {
          planId: planID,
          successUrl: successUrl,
          declinedUrl: declinedUrl,
        },
      }),
    )
  } catch (e: unknown) {
    return handleErrorResponse<client.PostCheckoutResponse>(e)
  }
}

export async function checkoutAddon(
  addonID: string,
  successUrl: string,
  declinedUrl: string,
): Promise<APIResponse<client.PostCheckoutResponse>> {
  try {
    const zpps = await getZpps()
    return await callAPI<client.PostCheckoutResponse>(() =>
      zpps.subscription.checkoutAddonSubscriptionCheckoutAddonPostRaw({
        postCheckoutSessionRequest: {
          planId: addonID,
          successUrl: successUrl,
          declinedUrl: declinedUrl,
        },
      }),
    )
  } catch (e: unknown) {
    return handleErrorResponse<client.PostCheckoutResponse>(e)
  }
}

export async function getClaimables(): Promise<
  APIResponse<client.GetClaimablesResponse>
> {
  try {
    const zpps = await getZpps()
    return await callAPI<client.GetClaimablesResponse>(() =>
      zpps.user.getClaimablesUserClaimablesGetRaw(),
    )
  } catch (e: unknown) {
    return handleErrorResponse<client.GetClaimablesResponse>(e)
  }
}

export async function postClaimable(
  userClaim: UserClaimType,
): Promise<APIResponse<void>> {
  try {
    const zpps = await getZpps()
    return await callAPI<void>(() =>
      zpps.user.claimUserClaimPostRaw({
        postClaimRequest: {
          claim: userClaim,
        },
      }),
    )
  } catch (e: unknown) {
    return handleErrorResponse<void>(e)
  }
}
