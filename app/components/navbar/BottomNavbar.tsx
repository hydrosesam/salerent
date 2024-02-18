const BottomNavbar = () => {
  return (
    <nav className="fixed bottom-0 left-0 w-full bg-gray-800 text-white p-4 flex justify-between items-center sm:hidden">
      <a href="#" className="text-white">
        Home
      </a>
      <a href="#" className="text-white">
        About
      </a>
      <a href="#" className="text-white">
        Services
      </a>
      <a href="#" className="text-white">
        Contact
      </a>
    </nav>
  );
};

export default BottomNavbar;
