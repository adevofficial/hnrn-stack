import { HBP_BASE_URL } from '@hnrn-stack/common-configs';

export const getAvatarURL = (id) => `${HBP_BASE_URL}/storage/o/public/${id}`;
