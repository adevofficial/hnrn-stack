import NhostClient from './NhostClient';
import { UserConfig, User, Session } from './types';
import Auth from './Auth';

const createClient = (config: UserConfig) => {
  return new NhostClient(config);
};

export { NhostClient, createClient, User, Session, UserConfig, Auth };
