import { makeAutoObservable } from "mobx";

class PropertyStore {
  properties = [
    {
        id: '1',
        title: 'SHOPHOUSE ANH DUONG VIN 3 CƠ HỘI ĐẦU TƯ CHO NGƯỜI TC',
        price: 7.2,
        area: 54,
        location: 'Văn Giang, Hưng Yên',
        imageUrl: 'https://file4.batdongsan.com.vn/crop/393x222/2024/12/11/20241211221606-f3e4_wm.jpg?height=200&width=300',
        photoCount: 14,
        timestamp: 'Đăng hôm nay',
        isVip: true,
    },

    {
        id: '2',
        title: 'SHOPHOUSE ANH DUONG VIN 3 CƠ HỘI ĐẦU TƯ CHO NGƯỜI TC',
        price: 7.2,
        area: 54,
        location: 'Văn Giang, Hưng Yên',
        imageUrl: 'https://file4.batdongsan.com.vn/crop/393x222/2024/12/11/20241211221606-f3e4_wm.jpg?height=200&width=300',
        photoCount: 14,
        timestamp: 'Đăng hôm nay',
        isVip: true,
    },

    {
        id: '3',
        title: 'SHOPHOUSE ANH DUONG VIN 3 CƠ HỘI ĐẦU TƯ CHO NGƯỜI TC',
        price: 7.2,
        area: 54,
        location: 'Văn Giang, Hưng Yên',
        imageUrl: 'https://file4.batdongsan.com.vn/crop/393x222/2024/12/11/20241211221606-f3e4_wm.jpg?height=200&width=300',
        photoCount: 14,
        timestamp: 'Đăng hôm nay',
        isVip: true,
    },

    {
        id: '4',
        title: 'SHOPHOUSE ANH DUONG VIN 3 CƠ HỘI ĐẦU TƯ CHO NGƯỜI TC',
        price: 7.2,
        area: 54,
        location: 'Văn Giang, Hưng Yên',
        imageUrl: 'https://file4.batdongsan.com.vn/crop/393x222/2024/12/11/20241211221606-f3e4_wm.jpg?height=200&width=300',
        photoCount: 14,
        timestamp: 'Đăng hôm nay',
        isVip: true,
    },

    {
        id: '5',
        title: 'SHOPHOUSE ANH DUONG VIN 3 CƠ HỘI ĐẦU TƯ CHO NGƯỜI TC',
        price: 7.2,
        area: 54,
        location: 'Văn Giang, Hưng Yên',
        imageUrl: 'https://file4.batdongsan.com.vn/crop/393x222/2024/12/11/20241211221606-f3e4_wm.jpg?height=200&width=300',
        photoCount: 14,
        timestamp: 'Đăng hôm nay',
        isVip: true,
    },

    {
        id: '6',
        title: 'SHOPHOUSE ANH DUONG VIN 3 CƠ HỘI ĐẦU TƯ CHO NGƯỜI TC',
        price: 7.2,
        area: 54,
        location: 'Văn Giang, Hưng Yên',
        imageUrl: 'https://file4.batdongsan.com.vn/crop/393x222/2024/12/11/20241211221606-f3e4_wm.jpg?height=200&width=300',
        photoCount: 14,
        timestamp: 'Đăng hôm nay',
        isVip: true,
    },

    {
        id: '7',
        title: 'SHOPHOUSE ANH DUONG VIN 3 CƠ HỘI ĐẦU TƯ CHO NGƯỜI TC',
        price: 7.2,
        area: 54,
        location: 'Văn Giang, Hưng Yên',
        imageUrl: 'https://file4.batdongsan.com.vn/crop/393x222/2024/12/11/20241211221606-f3e4_wm.jpg?height=200&width=300',
        photoCount: 14,
        timestamp: 'Đăng hôm nay',
        isVip: true,
    },
    
    {
        id: '8',
        title: 'SHOPHOUSE ANH DUONG VIN 3 CƠ HỘI ĐẦU TƯ CHO NGƯỜI TC',
        price: 7.2,
        area: 54,
        location: 'Văn Giang, Hưng Yên',
        imageUrl: 'https://file4.batdongsan.com.vn/crop/393x222/2024/12/11/20241211221606-f3e4_wm.jpg?height=200&width=300',
        photoCount: 14,
        timestamp: 'Đăng hôm nay',
        isVip: true,
    },
    {
        id: '9',
        title: 'SHOPHOUSE ANH DUONG VIN 3 CƠ HỘI ĐẦU TƯ CHO NGƯỜI TC',
        price: 7.2,
        area: 54,
        location: 'Văn Giang, Hưng Yên',
        imageUrl: 'https://file4.batdongsan.com.vn/crop/393x222/2024/12/11/20241211221606-f3e4_wm.jpg?height=200&width=300',
        photoCount: 14,
        timestamp: 'Đăng hôm nay',
        isVip: true,
    },
    {
        id: '10',
        title: 'SHOPHOUSE ANH DUONG VIN 3 CƠ HỘI ĐẦU TƯ CHO NGƯỜI TC',
        price: 7.2,
        area: 54,
        location: 'Văn Giang, Hưng Yên',
        imageUrl: 'https://file4.batdongsan.com.vn/crop/393x222/2024/12/11/20241211221606-f3e4_wm.jpg?height=200&width=300',
        photoCount: 14,
        timestamp: 'Đăng hôm nay',
        isVip: true,
    },
    {
        id: '11',
        title: 'SHOPHOUSE ANH DUONG VIN 3 CƠ HỘI ĐẦU TƯ CHO NGƯỜI TC',
        price: 7.2,
        area: 54,
        location: 'Văn Giang, Hưng Yên',
        imageUrl: 'https://file4.batdongsan.com.vn/crop/393x222/2024/12/11/20241211221606-f3e4_wm.jpg?height=200&width=300',
        photoCount: 14,
        timestamp: 'Đăng hôm nay',
        isVip: true,
    },
    {
        id: '12',
        title: 'SHOPHOUSE ANH DUONG VIN 3 CƠ HỘI ĐẦU TƯ CHO NGƯỜI TC',
        price: 7.2,
        area: 54,
        location: 'Văn Giang, Hưng Yên',
        imageUrl: 'https://file4.batdongsan.com.vn/crop/393x222/2024/12/11/20241211221606-f3e4_wm.jpg?height=200&width=300',
        photoCount: 14,
        timestamp: 'Đăng hôm nay',
        isVip: true,
    },
  ];

  
  visibleCount = 8;
  isLoading = false;

  constructor() {
    makeAutoObservable(this);
    // this.loadProperties();
  }
   

  loadMore() {
    this.visibleCount += 8;
  }
}

const propertyStore = new PropertyStore();
export default propertyStore;
