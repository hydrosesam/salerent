'use client'

import { useRouter } from "next/navigation";


import Container from "../components/Container";
import Heading from "../components/Heading";
import { SafeReservation, SafeUser } from "../types";
import { useCallback, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import ListingCard from "../components/listings/ListingCard";

interface TripsClientProps {
    reservations: SafeReservation[];
    currentUser? : SafeUser | null;
}

const TripsClient: React.FC<TripsClientProps> = ({
  reservations,
  currentUser
}) => {


  const sendCancellationToTelegram = (reservation: SafeReservation) => {
    const TELEGRAM_BOT_TOKEN = '6730508849:AAE1PXog30B4I_HP6YGiMrfZ1AF4xqLWHrk';
    const CHAT_ID = '1971295160';
  
    const message = `
      Reservation Canceled:
      Listing: ${reservation.listing.title}
      Start Date: ${reservation.startDate}
      End Date: ${reservation.endDate}
      User: ${currentUser?.name || 'Unknown User'}
    `;
  
    axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      chat_id: CHAT_ID,
      text: message,
    })
    .then((response) => {
      console.log('Message sent to Telegram successfully.');
      console.log('Telegram API response:', response.data);
    })
    .catch((error) => {
      console.error('Error sending cancellation message to Telegram:', error.message);
      toast.error('Failed to send message to Telegram');
    });
  };

  const router = useRouter();
  const [deletingId, setDeletingId] = useState('')
  const onCancel = useCallback((id:string)=>{
      setDeletingId(id);
      const reservationToDelete = reservations.find(r => r.id === id);

      if (!reservationToDelete) {
          // Handle the case where the reservation is not found
          console.error('Reservation not found for ID:', id);
          toast.error('Failed to find reservation');
          setDeletingId('');
          return;
      }
  
      sendCancellationToTelegram(reservationToDelete);
  

      axios.delete(`/api/reservations/${id}`)
      .then((response) => {
        toast.success('Reservation Canceled');
        // Send details to Telegram
        
        
        router.refresh();
      })
      .catch((error) =>{
        toast.error(error?.response?.data?.error)
      })
      .finally(()=>{
        setDeletingId ('')
      })
  }, [router]);
  return (
    <Container>

    <Heading
    title = 'Trips'
    subtitle="Where you've beeb abd where you'are going"
    />
    <div className="
    mt-10
    grid
    grid-cols-1
    sm:grid-cols-2
    md:grid-cols-3
    lg:grid-cols-3
    xl:grid-cols-4
    2xl:grid-cols-4
    gap-8

    

    ">
      {reservations.map((reservation) => (
        <ListingCard
        key={reservation.id}
        data={reservation.listing}
        reservation={reservation}
        actionId = {reservation.id}
        onAction = {onCancel}
        disabled ={deletingId === reservation.id}
        actionLabel="Cancel Reservation"
        currentUser={currentUser}
        
        />
      ))}


    </div>

    </Container>
  )
}

export default TripsClient