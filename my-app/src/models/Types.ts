export interface Menu {
    name: string;
    price: number;
    qty: number;
    type: 'veg' | 'non-veg',
    imageUrl: string;
    restaurant_id: string;
    menu_id: string;
}


export interface Coupons {
    coupon_id: string;
    coupon_code: string;
    discount_percentage: string;
    validity_type: 'SPECIFIC_DATE' | 'WEEKDAYS' | 'WEEKENDS' | 'SPECIFIC_DAYS';
    start_date: Date |null | undefined;
    end_date: Date | null | undefined;
    comment: string;
    valid_days: Days[];
    restaurant_id: string;
}


export interface Days {
    day: 'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY' | 'SATURDAY' | 'SUNDAY';
}