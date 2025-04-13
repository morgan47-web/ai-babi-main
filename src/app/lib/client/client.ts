import { Configuration } from "../generated/runtime"
import * as Apis from "../generated/apis"

const baseURL = process.env.NEXT_PUBLIC_ZPPS_URL

const commonConfig = {
  credentials: "include" as RequestCredentials,
  headers: {
    "Content-Type": "application/json",
  },
  middleware: [],
  fetchApi: fetch,
  mode: "cors" as RequestMode,
  basePath: baseURL + "/v1",
}

export const AIBabeClient = {
  auth: new Apis.AuthenticationApi(new Configuration(commonConfig)),
  chatbot: new Apis.ChatbotApi(new Configuration(commonConfig)),
  chat: new Apis.ChatApi(new Configuration(commonConfig)),
  subscription: new Apis.SubscriptionsApi(new Configuration(commonConfig)),
  utilities: new Apis.UtilitiesApi(new Configuration(commonConfig)),
  post: new Apis.PostApi(new Configuration(commonConfig)),
  user: new Apis.UserApi(new Configuration(commonConfig)),
}
