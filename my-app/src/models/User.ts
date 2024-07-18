export interface User {
    username: string;
    restaurantName: string;
    location: string;
    phone: number;
    uid: string;
}


export interface UserPropSignup extends User {
    password: string;
}