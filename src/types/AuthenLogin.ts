/* eslint-disable @typescript-eslint/no-explicit-any */

export interface LoginResponse {
    authResponse: AuthResponse
    userResponse: UserResponse
}

export interface LoginRequest {
    phoneNumber: string
    password: string
}

export interface AuthResponse {
    accessToken: string
    refreshToken: string
}

export interface UserResponse {
    id: number
    email: string
    fullName: string
    phoneNumber: string
    avatar: any
    isAdmin: boolean
    wallet: number
    roles: any
}
