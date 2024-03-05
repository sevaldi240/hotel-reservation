'use client';

import { updateBooking } from "@/libs/apis";
import { getStripe } from "@/libs/stripe";
import axios from "axios";
import { Dispatch, FC, SetStateAction } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import toast from "react-hot-toast";

type Props = {
   _id: string;
  isOpen: boolean;
  checkinDate: Date | null;
  setCheckinDate: Dispatch<SetStateAction<Date | null>>;
  checkoutDate: Date | null;
  setCheckoutDate: Dispatch<SetStateAction<Date | null>>;
  setAdults: Dispatch<SetStateAction<number>>;
  setNoOfChildren: Dispatch<SetStateAction<number>>;
  calcMinCheckoutDate?: () => Date | null;
  price: number;
  discount: number;
  adults: number;
  hotelRoom: {
    _id: string;
    name: string;
    slug: { current: string };
    price: number;
  };
  noOfChildren: number;
  specialNote: string;
  isBooked: boolean;
  bookingSubmitHandler: () => Promise<string | undefined>;
  isSubmittingBooking:boolean;
  //handleBookNowClick: () => void;
  toggleBookingModal: () => void;
};

const BookRoomCtaModal: FC<Props> = props => {
  const {
     _id,
    isOpen,
    price,
    discount,
    specialNote,
    checkinDate,
    setCheckinDate,
    checkoutDate,
    setCheckoutDate,
    setAdults,
    setNoOfChildren,
    adults,
    noOfChildren,
    isBooked,
    hotelRoom,
    bookingSubmitHandler,
    isSubmittingBooking,
    toggleBookingModal
  } = props;

  const handleBookNowClicks = async () => {
    if (!checkinDate || !checkoutDate)
      return toast.error("Porfavor Ingresa un fecha de checkin / checkout");

    if (checkinDate > checkoutDate)
      return toast.error("Porfavor seleccionaun periodo valido de checkin");

    const numberOfDays = calcNoOfDays();

    // const hotelRoomSlug = room.slug.current;

    const stripe = await getStripe();

    try {
      const { data: stripeSession } = await axios.post("/api/stripe", {
        checkinDate,
        checkoutDate,
        adults,
        children: noOfChildren,
        numberOfDays,
        //hotelRoomSlug,
      });

      if (stripe) {
        const result = await stripe.redirectToCheckout({
          sessionId: stripeSession.id,
        });

        if (result.error) {
          toast.error("Pago Fallado");
        }
      }
    } catch (error) {
      console.log("Error: ", error);
      toast.error("An error occured");
    }
  };


  const calcNoOfDays = () => {
    if (!checkinDate || !checkoutDate) return 0;
    const timeDiff = checkoutDate.getTime() - checkinDate.getTime();
    const noOfDays = Math.ceil(timeDiff / (24 * 60 * 60 * 1000));
    return noOfDays;
  };
  
  const discountPrice = price - (price / 100) * discount;
  const calculateTotalPrice = () => {
    const numberOfDays = calcNoOfDays();
    // Implementa la lógica para calcular el precio total según tu negocio
    return price * numberOfDays * (1 - discount / 100);
  };
  const bookingDetails = {
     _id,
    adults,
    checkinDate,
    checkoutDate,
    children: noOfChildren, // Assuming you have a variable named noOfChildren
    discount,
    numberOfDays: calcNoOfDays(), // You need to implement this function
    totalPrice: calculateTotalPrice(), // You need to implement this function
    user: hotelRoom?._id, // Assuming user information is present in hotelRoom
  };

  const handleUpdateBooking = async () => {
    try {
      // Aquí obtienes los datos necesarios de la reserva para pasar a la función updateBooking
      const {  _id,adults, checkinDate, checkoutDate, children, discount, numberOfDays, totalPrice, user } = bookingDetails;

      // Llamas a la función updateBooking con los datos de la reserva
      await updateBooking({  _id,adults, checkinDate, checkoutDate, children, hotelRoom,discount, numberOfDays, totalPrice, user });

      // Aquí podrías actualizar el estado local o realizar otras acciones después de la actualización exitosa
      console.log('Reserva actualizada correctamente');
    } catch (error) {
      console.error('Error al actualizar la reserva:', error);
      alert('Error al actualizar la reserva');
    }
  };

  return (
    <div
      className={`fixed z-[61] inset-0 flex items-center justify-center ${
        isOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="px-7 py-6">


      <div className="w-full border-b-2 border-b-secondary my-2" />

      <h4 className="my-8">{specialNote}</h4>

      <div className="flex">
        <div className="w-1/2 pr-2">
          <label
            htmlFor="check-in-date"
            className="block text-sm font-medium text-gray-900 dark:text-gray-400"
          >
            Check In date
          </label>
          <DatePicker
            selected={checkinDate}
            onChange={date => setCheckinDate(date)}
            dateFormat="dd/MM/yyyy"
            minDate={new Date()}
            id="check-in-date"
            className="w-full border text-black border-gray-300 rounded-lg p-2.5 focus:ring-primary focus:border-primary"
          />
        </div>
        <div className="w-1/2 pl-2">
          <label
            htmlFor="check-out-date"
            className="block text-sm font-medium text-gray-900 dark:text-gray-400"
          >
            Check Out date
          </label>
          <DatePicker
            selected={checkoutDate}
            onChange={date => setCheckoutDate(date)}
            dateFormat="dd/MM/yyyy"
            disabled={!checkinDate}
            id="check-out-date"
            className="w-full border text-black border-gray-300 rounded-lg p-2.5 focus:ring-primary focus:border-primary"
          />
        </div>
      </div>

      <div className="flex mt-4">
        <div className="w-1/2 pr-2">
          <label
            htmlFor="adults"
            className="block text-sm font-medium text-gray-900 dark:text-gray-400"
          >
            Adults
          </label>
          <input
            type="number"
            id="adults"
            value={adults}
            onChange={e => setAdults(+e.target.value)}
            min={1}
            max={5}
            className="w-full border border-gray-300 rounded-lg p-2.5"
          />
        </div>
        <div className="w-1/2 pl-2">
          <label
            htmlFor="children"
            className="block text-sm font-medium text-gray-900 dark:text-gray-400"
          >
            Children
          </label>
          <input
            type="number"
            id="children"
            value={noOfChildren}
            onChange={e => setNoOfChildren(+e.target.value)}
            min={0}
            max={3}
            className="w-full border border-gray-300 rounded-lg p-2.5"
          />
        </div>
      </div>

      {calcNoOfDays() > 0 ? (
        <p className="mt-3">Total Price: $ {calcNoOfDays() }</p>
      ) : (
        <></>
      )}
      {/* <button
            onClick={bookingSubmitHandler}
            className="px-4 py-2 bg-primary text-white rounded-md"
            disabled={isSubmittingBooking}
          >
            {isSubmittingBooking ? "Submitting" : "Submit"}
      </button> */}
      <button
            onClick={toggleBookingModal}
            className="ml-2 px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
          >
            Cancel
      </button>
      <button
        onClick={async () => {handleBookNowClicks();
          handleUpdateBooking();
          const res = await fetch('/api/sendt', 
          {
            method: 'POST',
          });
          const data = await res.json();
        }}     
        className="btn-primary w-full mt-6 disabled:bg-gray-500 disabled:cursor-not-allowed"
      >
        {isBooked ? "Modificar" : "Reserva Ahora"}
      </button>
      </div>
    </div>
  );
};

export default BookRoomCtaModal;
