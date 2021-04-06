import { Auth } from '@hnrn-stack/hbp-sdk';
import { AuthProvider, UserIdentity } from 'react-admin';
import { getAvatarURL } from '@hnrn-stack/common-helpers';
export class HBPAuthProvider implements AuthProvider {
  hbpProvider: Auth;
  constructor(hbpProvider: Auth) {
    this.hbpProvider = hbpProvider;
  }

  // authentication
  async login({ username, password }) {
    return this.hbpProvider.login({ email: username, password });
  }
  async checkError(error) {
    console.log(error);
    return;
    /* ... */
  }
  async checkAuth() {
    const isAuthenticated = await this.hbpProvider.isAuthenticatedAsync();
    if (!isAuthenticated) throw new Error();
    return;
  }
  async logout() {
    await this.hbpProvider.logout();
    return;
  }
  async getIdentity(): Promise<UserIdentity | null> {
    const user = this.hbpProvider.getUser();
    return {
      id: user.id,
      avatar: getAvatarURL(user.id),
      fullName: user.display_name,
    };
  }
  // authorization
  async getPermissions(params) {
    return null;
  }
}
