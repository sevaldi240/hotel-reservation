import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

import { authOptions } from "@/libs/auth";
import {
  checkReviewExists,
  createReview,
  deleteBooking,
  getUserData,
  updateBooking,
  updateReview,
} from "@/libs/apis";

export async function GET(req: Request, res: Response) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new NextResponse("Authentication Required", { status: 500 });
  }

  const userId = session.user.id;

  try {
    const data = await getUserData(userId);
    return NextResponse.json(data, { status: 200, statusText: "Successful" });
  } catch (error) {
    return new NextResponse("Unable to fetch", { status: 400 });
  }
}

export async function POST(req: Request, res: Response) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new NextResponse("Authentication Required", { status: 500 });
  }

  const { roomId, reviewText, ratingValue } = await req.json();

  if (!roomId || !reviewText || !ratingValue) {
    return new NextResponse("All fields are required", { status: 400 });
  }

  const userId = session.user.id;

  try {
    const alreadyExists = await checkReviewExists(userId, roomId);

    let data;

    if (alreadyExists) {
      data = await updateReview({
        reviewId: alreadyExists._id,
        reviewText,
        userRating: ratingValue,
      });
    } else {
      data = await createReview({
        hotelRoomId: roomId,
        reviewText,
        userId,
        userRating: ratingValue,
      });
    }

    return NextResponse.json(data, { status: 200, statusText: "Successful" });
  } catch (error: any) {
    console.log("Error Updating", error);
    return new NextResponse("Unable to create review", { status: 400 });
  }
}

// Agrega este caso al switch o a la lógica de enrutamiento existente
export async function DELETE(req: Request, res: Response) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new NextResponse("Authentication Required", { status: 401 });
  }

  const { bookingId } = await req.json(); // Asegúrate de enviar 'bookingId' en el cuerpo de tu solicitud

  try {
    const data = await deleteBooking(bookingId);
    return new NextResponse(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.error('Error deleting booking:', error);
    return new NextResponse("Unable to delete booking", { status: 500 });
  }
}

export async function PUT(req: Request, res: Response) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new NextResponse("Authentication Required", { status: 401 });
  }

  const { bookingId } = await req.json(); // Asegúrate de enviar 'bookingId' en el cuerpo de tu solicitud

  try {
    const data = await updateBooking(bookingId);
    return new NextResponse(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.error('Error deleting booking:', error);
    return new NextResponse("Unable to delete booking", { status: 500 });
  }
}
