export interface Config {
  nest: {
    port: number;
  };
  cors: { enabled: boolean };
  swagger: {
    enabled: true;
    title: string;
    description: string;
    version: string;
    path: string;
  };
  security: {
    expiresIn: number;
    bcryptSaltOrRound: number;
  };
}
