import { Box } from "@mui/material";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useState } from "react";



const MainLayout = ({children}) => {
  const [showSidebar,setShowSidebar]=useState(true)

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        <Navbar  setShowSidebar={setShowSidebar} />
          <Box sx={{ display: 'flex', flexGrow: 1 }}>
            {showSidebar && <Sidebar />}
            {children}
          </Box>
    </Box>
  );
 
};

export default MainLayout;
