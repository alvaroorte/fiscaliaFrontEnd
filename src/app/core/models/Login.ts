export class LoginRequest  {
    email: string | null = null;
    password: string | null = null;
}

export class LoginResponse  {
    message: string | null = null;
    token: string | null = null;
    username: string | null = null;
}