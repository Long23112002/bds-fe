/* eslint-disable @typescript-eslint/no-explicit-any */
import { makeAutoObservable } from "mobx";
import { fetchPackageApi } from "../api/package";

class PackageStore {
    packages: any[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    setPackages(packages: any[]) {
        this.packages = packages;
    }

    async fetchPackage() {
        const packages = await fetchPackageApi();

        if (packages) {
            this.setPackages(packages.data)
        }
    }
}

export const packageStore = new PackageStore();
