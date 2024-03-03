export type Booking = {
    _id: string;
    hotelRoom: {
      _id: string;
      name: string;
      slug: { current: string };
      price: number;
    };
    checkinDate: string;
    checkoutDate: string;
    numberOfDays: number;
    adults: number;
    children: number;
    totalPrice: number;
    discount: number;
  };

  export type updateBookingDto={
    _id: string;
    adults: number;
    checkinDate: string;
    checkoutDate: string;
    children: number;
    discount: number;
    hotelRoom: {
      _id: string;
      name: string;
      slug: { current: string };
      price: number;
    };
    numberOfDays:number,
    totalPrice:number,
    user:string,
  };
  