/* eslint-disable @typescript-eslint/no-explicit-any */
export interface FavoriteResponse {
    user: User
    post: Post
  }
  
  export interface User {
    id: number
    email: string
    fullName: string
    phoneNumber: string
    avatar: any
    isAdmin: boolean
    wallet: number
    roles: any
    createdAt: any
  }
  
  export interface Post {
    id: number
    contactName: string
    email: string
    phoneNumber: string
    demand: string
    numberOfBedrooms: number
    numberOfBathrooms: number
    arena: number
    price: number
    unit: string
    title: string
    description: string
    images: Image[]
    videoUrl: string
    linkMap: string
    province: Province
    district: District
    ward: Ward
    street: string
    status: string
    createdAt: number
    updatedAt: number
    isDeleted: boolean
    entrance: number
    front: number
    user: User2
    residentialProperty: ResidentialProperty
    propertyLegalDocument: PropertyLegalDocument
    interior: Interior
    houseDirection: HouseDirection
    balconyDirection: BalconyDirection
    packagePriceTransaction: PackagePriceTransaction
    codePlant: string
  }
  
  export interface Image {
    url: string
  }
  
  export interface Province {
    code: string
    name: string
    nameEn: string
    fullName: string
    fullNameEn: string
    codeName: string
  }
  
  export interface District {
    code: string
    name: string
    nameEn: string
    fullName: string
    fullNameEn: string
    codeName: string
  }
  
  export interface Ward {
    code: string
    name: string
    nameEn: string
    fullName: string
    fullNameEn: string
    codeName: string
  }
  
  export interface User2 {
    id: number
    phoneNumber: string
    email: string
    password: string
    fullName: string
    avatar: any
    code: string
    isBlocked: boolean
    isAdmin: boolean
    isDeleted: boolean
    wallet: number
    createdAt: number
    enabled: boolean
    authorities: Authority[]
    username: string
    accountNonExpired: boolean
    accountNonLocked: boolean
    credentialsNonExpired: boolean
  }
  
  export interface Authority {
    authority: string
  }
  
  export interface ResidentialProperty {
    id: number
    name: string
    createdAt: number
    updatedAt: number
    isDeleted: boolean
  }
  
  export interface PropertyLegalDocument {
    id: number
    name: string
    createdAt: number
    updatedAt: number
    isDeleted: boolean
  }
  
  export interface Interior {
    id: number
    name: string
    createdAt: number
    updatedAt: number
    isDeleted: boolean
  }
  
  export interface HouseDirection {
    id: number
    name: string
    createdAt: number
    updatedAt: number
    isDeleted: boolean
  }
  
  export interface BalconyDirection {
    id: number
    name: string
    createdAt: number
    updatedAt: number
    isDeleted: boolean
  }
  
  export interface PackagePriceTransaction {
    id: number
    postId: number
    packagePrice: PackagePrice
    startDate: number[]
    endDate: number[]
    startTime: number[]
    status: string
    isDeleted: boolean
  }
  
  export interface PackagePrice {
    id: number
    price: number
    unit: string
    validity: number
    isEnable: boolean
    isDeleted: boolean
    createdAt: number
    updatedAt: number
    apackage: Apackage
  }
  
  export interface Apackage {
    id: number
    name: string
    createdAt: number
    updatedAt: number
    code: string
    level: number
    description: string
    isDeleted: boolean
  }
  