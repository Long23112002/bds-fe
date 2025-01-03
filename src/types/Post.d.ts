/* eslint-disable @typescript-eslint/no-explicit-any */

interface PostResponse {
    id: number;
    contactName: string;
    email: string;
    phoneNumber: string;
    demand: string;
    numberOfBedrooms: number;
    numberOfBathrooms: number;
    arena: number;
    price: number;
    unit: string;
    title: string;
    description: string;
    images: Image[];
    videoUrl?: any;
    linkMap?: any;
    provinceCode: string;
    districtCode: string;
    wardCode: string;
    street: string;
    status: string;
    createdAt: number;
    updatedAt: number;
    isDeleted: boolean;
    entrance: number;
    front: number;
    user: User;
    residentialProperty: ResidentialProperty;
    propertyLegalDocument: ResidentialProperty;
    interior: ResidentialProperty;
    houseDirection: ResidentialProperty;
    balconyDirection: ResidentialProperty;
    packagePriceTransaction: PackagePriceTransaction;
    codePlant: string;
  }
  interface PackagePriceTransaction {
    id: number;
    postId: number;
    packagePrice: PackagePrice;
    startDate: number[];
    endDate: number[];
    startTime: number[];
    status: string;
    isDeleted: boolean;
  }
  interface PackagePrice {
    id: number;
    price: number;
    unit: string;
    validity: number;
    isEnable: boolean;
    isDeleted: boolean;
    createdAt: number;
    updatedAt: number;
    apackage: Apackage;
  }
  interface Apackage {
    id: number;
    name: string;
    createdAt: number;
    updatedAt: number;
    code: string;
    level: number;
    description: string;
    isDeleted: boolean;
  }
  interface ResidentialProperty {
    id: number;
    name: string;
    createdAt: number;
    updatedAt: number;
    isDeleted: boolean;
  }
  interface User {
    id: number;
    phoneNumber: string;
    email: string;
    password: string;
    fullName: string;
    avatar?: any;
    code: string;
    isBlocked: boolean;
    isAdmin: boolean;
    isDeleted: boolean;
    wallet: number;
    createdAt: number;
    enabled: boolean;
    accountNonExpired: boolean;
    accountNonLocked: boolean;
    credentialsNonExpired: boolean;
    authorities: Authority[];
    username: string;
  }
  interface Authority {
    authority: string;
  }
  interface Image {
    url: string;
  }