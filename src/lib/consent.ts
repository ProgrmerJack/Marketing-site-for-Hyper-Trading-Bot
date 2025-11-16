export const CONSENT_STORAGE_KEY = "consent-preferences";
export const CONSENT_VERSION = "1.0.0";

export type ConsentPreferences = {
  marketing: boolean;
  analytics: boolean;
  functional: boolean;
  gpcDetected?: boolean;
  timestamp: string;
  version: string;
};
