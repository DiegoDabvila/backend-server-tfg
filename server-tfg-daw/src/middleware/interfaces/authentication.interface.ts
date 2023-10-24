  export interface IJWT {
    user: {
      username: string;
      name: string;
      surnames: string;
      isAdmin: boolean;
    };
    iat: string;
    exp: string;
  }