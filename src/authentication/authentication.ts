import {AbstractResource} from "../client/resource.ts";
import {
  AuthConfirmationStatus,
  AuthenticationModalProvider,
  AuthResult,
  CheckPhoneRequest,
  ConfirmRegistrationRequest,
  DispatchPasswordResetRequest,
  LoginRequest,
  PhoneCheckResult,
  RegistrationRequest,
  ResendAuthConfirmationRequest,
  ResetPasswordRequest,
} from "./types.ts";
import Postmate from 'postmate';
import { PhoneRequest } from "../types.ts";

export class AuthenticationResource extends AbstractResource {
  async checkPhone(storeId: string, request: CheckPhoneRequest): Promise<PhoneCheckResult> {
    const url = this.getStoreUrl(storeId, '/auth/check');

    return this.getResponse<PhoneCheckResult>(await this.client.request('POST', url, request));
  }

  async register(storeId: string, request: RegistrationRequest): Promise<AuthConfirmationStatus> {
    const url = this.getStoreUrl(storeId, '/auth/register');

    return this.getResponse<AuthConfirmationStatus>(await this.client.request('POST', url, request));
  }

  async confirmRegistration(storeId: string, request: ConfirmRegistrationRequest): Promise<AuthResult> {
    const url = this.getStoreUrl(storeId, '/auth/register/confirm');

    return this.getResponse<AuthResult>(await this.client.request('POST', url, request));
  }

  async resendRegistrationConfirmation(storeId: string, request: ResendAuthConfirmationRequest): Promise<AuthConfirmationStatus> {
    const url = this.getStoreUrl(storeId, '/auth/register/resend');

    return this.getResponse<AuthConfirmationStatus>(await this.client.request('POST', url, request));
  }

  async login(storeId: string, request: LoginRequest): Promise<AuthResult> {
    const url = this.getStoreUrl(storeId, '/auth/login');

    return this.getResponse<AuthResult>(await this.client.request('POST', url, request));
  }

  async dispatchPasswordReset(storeId: string, request: DispatchPasswordResetRequest): Promise<AuthConfirmationStatus> {
    const url = this.getStoreUrl(storeId, '/auth/password/request');

    return this.getResponse<AuthConfirmationStatus>(await this.client.request('POST', url, request));
  }

  async resetPassword(storeId: string, request: ResetPasswordRequest): Promise<AuthResult> {
    const url = this.getStoreUrl(storeId, '/auth/password/reset');

    return this.getResponse<AuthResult>(await this.client.request('POST', url, request));
  }

  useAuthenticationModal(
    storeId: string,
    iframeContainer: string|HTMLElement,
    callback: (token: string, phone: PhoneRequest, storeId: string) => void,
    postmateParams: any = {}
  ): AuthenticationModalProvider {
    const url = `${this.client.getBaseAuthUrl()}/?store_id=${storeId}&response_type=post_message`;

    let handshake: any = null;
    let child: any = null;

    const initAuthenticationModal = async (): Promise<boolean> => {
      return new Promise((resolve) => {
        const container = typeof iframeContainer === 'string' ? document.querySelector(iframeContainer) : iframeContainer;
        handshake = new Postmate({
          ...postmateParams,
          container,
          url,
        });

        handshake.then((childFrame: any) => {
          child = childFrame;
          child.on('zenky:auth:token', callback);
          child.on('zenky:auth:resize', (height: number) => {
            child.frame.style.height = `${height}px`;
          });

          resolve(true);
        });
      });
    };

    const destroyAuthenticationModal = () => {
      if (!child) {
        return;
      }

      child.destroy();
    };

    return {
      initAuthenticationModal,
      destroyAuthenticationModal,
    };
  }
}
