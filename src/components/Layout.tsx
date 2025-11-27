import { Outlet } from "react-router-dom";
import Footer from './Footer';
import NavigationSidebar from './NavigationSidebar';

const Layout = () => {
  return (
    <>
      <NavigationSidebar />

      {/* This is where the page content loads */}
      <Outlet />

    
    </>
  );
};

export default Layout;
