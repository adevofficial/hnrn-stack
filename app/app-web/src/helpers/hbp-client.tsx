import { createClient } from "nhost-js-sdk";
import { HBP_BASE_URL } from "configs";

const nhostClient = createClient({
  baseURL: HBP_BASE_URL,
  //    "https://backend-1da3b213.nhost.app",
});

export const { auth, storage } = nhostClient;
