// import { NextResponse } from "next/server";

// import getCurrentUser from "@/app/actions/getCurrentUser";
// import prisma from "@/app/libs/prismadb";

// interface IParams {
//   reservationId?: string;
// }

// export async function DELETE(
//   request: Request, 
//   { params }: { params: IParams }
// ) {
//   const currentUser = await getCurrentUser();

//   if (!currentUser) {
//     return NextResponse.error();
//   }

//   const { reservationId } = params;

//   if (!reservationId || typeof reservationId !== 'string') {
//     throw new Error('Invalid ID');
//   }

//   const reservation = await prisma.reservation.deleteMany({
//     where: {
//       id: reservationId,
//       OR: [
//         { userId: currentUser.id},
//         { listing: { userId: currentUser.id } }
//       ]
//     }
//   });

//   return NextResponse.json(reservation);
// }


import { NextResponse } from 'next/server';
import prisma from '@/app/libs/prismadb';
import getCurrentUser from '@/app/actions/getCurrentUser';
import toast from 'react-hot-toast';

interface IParams {
  reservationId?: string;
}

export async function GET(request: Request, { params }: { params: IParams }) {
  const { reservationId } = params;

  if (!reservationId || typeof reservationId !== 'string') {
    throw new Error('Invalid ID');
  }

  try {
    // Fetch reservation details
    const reservation = await prisma.reservation.findUnique({
      where: {
        id: reservationId,
      },
    });

    if (!reservation) {
      return NextResponse.error();
    }

    return NextResponse.json(reservation);
  } catch (error) {
    console.error('Error fetching reservation details:', toast.error('Not Sent Telegram'));
    return NextResponse.error();
  }
}

export async function DELETE(request: Request, { params }: { params: IParams }) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { reservationId } = params;

  if (!reservationId || typeof reservationId !== 'string') {
    throw new Error('Invalid ID');
  }

  try {
    // Delete reservation
    const deleteResult = await prisma.reservation.deleteMany({
      where: {
        id: reservationId,
        OR: [
          { userId: currentUser.id },
          { listing: { userId: currentUser.id } },
        ],
      },
    });

    if (deleteResult.count === 0) {
      return NextResponse.error();
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error();
    return NextResponse.error();
  }
}


