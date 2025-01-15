// src/auth/application/dtos/auth.dtos.ts
export interface RegisterUserDTO {
  email: string;
  password: string;
  name: string;
}

export interface LoginUserDTO {
  email: string;
  password: string;
}

export interface AuthResponseDTO {
  accessToken: string;
  user: {
    id: number;
    email: string;
    name: string;
  };
}
