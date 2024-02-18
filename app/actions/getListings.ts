import prisma from "@/app/libs/prismadb";

export interface IListingsParams {
  userId: string;
  maxNightGuestCount?: number;
  maxDayGuestCount?: number;
  roomCount?: number;
  bathroomCount?: number;
  startDate?: string;
  endDate?: string;
  category?: string;
  type?: string;
  location?: string;
}

// ... (existing imports and code)

export default async function getListings(params: IListingsParams) {
  try {
    const { userId, roomCount, bathroomCount, type, category, location } =
      params;

    let query: any = {};
    if (userId) {
      query.userId = userId;
    }

    if (category) {
      query.category = category;
    }
    if (location) {
      query.location = location;
    }

    if (type) {
      query.type = type;
    }

    if (roomCount) {
      query.roomCount = {
        gte: +roomCount,
      };
    }

    if (bathroomCount) {
      query.bathroomCount = {
        gte: +bathroomCount,
      };
    }

    const listings = await prisma.listing.findMany({
      where: query,
      orderBy: {
        createdAt: "desc",
      },
    });

    const safeListings = listings.map((listing) => ({
      ...listing,
      createdAt: listing.createdAt.toISOString(),
    }));

    return safeListings;
  } catch (error: any) {
    throw new Error(error);
  }
}
