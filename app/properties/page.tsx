import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";

import getCurrentUser from "../actions/getCurrentUser";

import PropertiesClient from "./PropertiesClient";
import getListings from "../actions/getListings";
import EditRentModal from "../components/modals/EditRentModal";

const PropertiesPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title="UnAuthorized" subtitle="Please Login" />
      </ClientOnly>
    );
  }

  const listings = await getListings({
    userId: currentUser.id,
  });

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No Properties  found"
          subtitle="Looks like yo have no properties"
        />
      </ClientOnly>
    );
  }
  return (
    <ClientOnly>
      <PropertiesClient listings={listings} currentUser={currentUser} />
      <EditRentModal />
    </ClientOnly>
  );
};

export default PropertiesPage;
