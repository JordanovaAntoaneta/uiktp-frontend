export interface Root {
  id: number
  userId: number
  user: User
  quizId: number
  quiz: Quiz
  agreed: boolean
}

export interface User {
  id: number
  userName: string
  normalizedUserName: string
  email: string
  normalizedEmail: string
  emailConfirmed: boolean
  passwordHash: string
  securityStamp: string
  concurrencyStamp: string
  phoneNumber: string
  phoneNumberConfirmed: boolean
  twoFactorEnabled: boolean
  lockoutEnd: string
  lockoutEnabled: boolean
  accessFailedCount: number
  firstName: string
  lastName: string
  lastLoginDate: string
  created: string
  status: number
  uid: string
  media: Media
  passwordResetToken: string
  emailVerificationToken: string
  suspensionReason: string
  refreshTokens: RefreshToken[]
}

export interface Media {
  entityType: number
  items: Item[]
}

export interface Item {
  id: string
  name: string
  isMain: boolean
  sortOrder: number
  size: number
  url: string
  type: number
}

export interface RefreshToken {
  value: string
  userId: number
  expiryTime: string
  user: string
}

export interface Quiz {
  id: number
  title: string
  userCreatorId: number
  userCreator: UserCreator
  createdAt: string
  fileName: string
  questions: Question[]
}

export interface UserCreator {
  id: number
  userName: string
  normalizedUserName: string
  email: string
  normalizedEmail: string
  emailConfirmed: boolean
  passwordHash: string
  securityStamp: string
  concurrencyStamp: string
  phoneNumber: string
  phoneNumberConfirmed: boolean
  twoFactorEnabled: boolean
  lockoutEnd: string
  lockoutEnabled: boolean
  accessFailedCount: number
  firstName: string
  lastName: string
  lastLoginDate: string
  created: string
  status: number
  uid: string
  media: Media2
  passwordResetToken: string
  emailVerificationToken: string
  suspensionReason: string
  refreshTokens: RefreshToken2[]
}

export interface Media2 {
  entityType: number
  items: Item2[]
}

export interface Item2 {
  id: string
  name: string
  isMain: boolean
  sortOrder: number
  size: number
  url: string
  type: number
}

export interface RefreshToken2 {
  value: string
  userId: number
  expiryTime: string
  user: string
}

export interface Question {
  id: number
  text: string
  choiceA: string
  choiceB: string
  choiceC: string
  correctAnswer: string
  points: number
  quizId: number
  quiz: string
}
