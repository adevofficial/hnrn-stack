import { createClient } from '@hnrn-stack/hbp-sdk';
import { HBP_BASE_URL } from '@hnrn-stack/common-configs';

const nhostClient = createClient({
  baseURL: HBP_BASE_URL,
});

export const { auth, storage } = nhostClient;
