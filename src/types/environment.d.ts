declare global {
  namespace NodeJS {
    interface ProcessEnv {
      BOT_TOKEN: string;
      CLIENT_ID: string;
      GOOGLE_API_KEY: string;
    }
  }
}

export {}; 