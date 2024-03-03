'use client';

import { Dispatch, FC, SetStateAction } from "react";
import { useRouter } from "next/navigation";

import { Booking } from "@/models/booking";

type Props = {
  bookingDetails: Booking[];
  setRoomId: Dispatch<SetStateAction<string | null>>;
  toggleRatingModal: () => void;
  handleBookNowClick: () => void;
};

const Table: FC<Props> = ({ bookingDetails, setRoomId, toggleRatingModal, handleBookNowClick }) => {
  const router = useRouter();

   // Función para manejar la eliminación de un booking
   const handleDelete = async (bookingId: string) => {
    if (!confirm('Are you sure you want to delete this booking?')) {
      return;
    }
    
    try {
      const response = await fetch('/api/users', { // Asegúrate de que la ruta sea correcta
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ bookingId }),
      });

      if (response.ok) {
        alert('Booking deleted successfully');
        // Actualizar el estado para reflejar la eliminación
        // Esto podría implicar una nueva llamada a la API para obtener los bookings actualizados
        // o simplemente eliminar el booking del estado local
      } else {
        throw new Error('Failed to delete the booking');
      }
    } catch (error) {
      console.error('Error deleting booking:', error);
      alert('Error deleting booking');
    }
  };

  const handleUpdate = async (bookingId: string) => {
    if (!confirm('Are you sure you want to update this booking?')) {
      return;
    }
    
    try {
      const response = await fetch('/api/users', { // Asegúrate de que la ruta sea correcta
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ bookingId }),
      });

      if (response.ok) {
        alert('Booking Update successfully');
        // Actualizar el estado para reflejar la eliminación
        // Esto podría implicar una nueva llamada a la API para obtener los bookings actualizados
        // o simplemente eliminar el booking del estado local
      } else {
        throw new Error('Failed to update the booking');
      }
    } catch (error) {
      console.error('Error deleting booking:', error);
      alert('Error deleting booking');
    }
  };

  return (
    <div className="overflow-x-auto max-w-[340px] rounded-lg mx-auto md:max-w-full shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th className="px-6 py-3">Nombre de Servicio</th>
            <th className="px-6 py-3">Precio unitario</th>
            <th className="px-6 py-3">Precio</th>
            <th className="px-6 py-3">Descuentos</th>
            <th className="px-6 py-3">No. Días Reservados</th>
            <th className="px-6 py-3">Dias Faltantes</th>
            <th className="px-6 py-3"></th>
          </tr>
        </thead>
        <tbody>
          {bookingDetails.map(booking => (
            <tr
              key={booking._id}
              className="bg-white border-b hover:bg-gray-50"
            >
              <th
                onClick={() =>
                  router.push(`/rooms/${booking.hotelRoom.slug.current}`)
                }
                className="px-6 underline text-blue-600 cursor-pointer py-4 font-medium whitespace-nowrap"
              >
                {booking.hotelRoom.name}
              </th>
              <td className="px-6 py-4">{booking.hotelRoom.price}</td>
              <td className="px-6 py-4">{booking.totalPrice}</td>
              <td className="px-6 py-4">{booking.discount}</td>
              <td className="px-6 py-4">{booking.numberOfDays}</td>
              <td className="px-6 py-4">0</td>
              <td className="px-6 py-4">
                <button
                  onClick={() => {
                    setRoomId(booking.hotelRoom._id);
                    toggleRatingModal()
                  }}
                  className="font-medium text-blue-600 hover:underline"
                >
                  Rate
                </button>
                <button
                  onClick={() => handleDelete(booking._id)}
                  className="font-medium text-red-600 hover:underline"
                >
                  Delete
                </button>

                <button
                   onClick={() => {setRoomId(booking.hotelRoom._id);
                    handleBookNowClick()}}
                  className="font-medium text-green-600 hover:underline"
                >
                  Modify
                </button>

              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
