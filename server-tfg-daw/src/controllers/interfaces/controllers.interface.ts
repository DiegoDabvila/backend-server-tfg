
export interface UserInterface {
    id: number;
    username: string;
    name: string;
    surnames: string;
    password: string;
    isAdmin: boolean;
  }

 export interface LoginRequestBodyInterface {
    user: string;
    password: string;
  }

  export interface DirectorInterface {
    name: string;
    surnames: string;
    bio: string;
    age: number;
  }