import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();
  const {
    title,
    description,
    imageSrc,
    roomCount,
    bathroomCount,
    price,
    location,
    category,
    builtUpArea,
    carpetArea,
    totalFloor,
    projectName,
    carParking,
    bachelorsAllowed,
    type,
    negoitable,
  } = body;

  Object.keys(body).forEach((value: any) => {
    if (!body[value]) {
      NextResponse.error();
    }
  });

  const listing = await prisma.listing.create({
    data: {
      title,
      description,
      imageSrc,
      roomCount,
      bathroomCount,
      price: parseInt(price, 10),
      location,
      category,
      builtUpArea: parseInt(builtUpArea),
      carpetArea: parseInt(carpetArea),
      totalFloor,
      projectName,
      carParking,
      bachelorsAllowed,
      type,
      negoitable,

      userId: currentUser.id,
    },
  });

  return NextResponse.json(listing);
}
