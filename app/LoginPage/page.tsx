import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";

import getCurrentUser from "../actions/getCurrentUser";

import PropertiesClient from "./LoginPage";
import getListings from "../actions/getListings";
import EditRentModal from "../components/modals/EditRentModal";
import LoginPage from "./LoginPage";

const PropertiesPage1 = async () => {
  const currentUser = await getCurrentUser();

  return (
    <ClientOnly>
      <LoginPage />
    </ClientOnly>
  );
};

export default PropertiesPage1;
