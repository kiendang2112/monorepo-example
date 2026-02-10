import { logger } from "@/libs/logger";

class AuthService {
  async login(email: string, password: string) {
    logger.info(`Login request received for email: ${email}, ${password}`);
    return {
      accessToken: "accessToken",
      refreshToken: "refreshToken",
    };
  }
}

export const authService = new AuthService();
