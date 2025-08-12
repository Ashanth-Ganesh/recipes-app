import { Box } from '@mui/material';
import { Helmet } from "react-helmet-async";
import NavBar from "./NavBar.tsx";
import AppHeader from "./AppHeader.tsx";

function AppPage() {

  return (
    <>
      <Helmet>
          <title>RecipesApp</title>
          <meta name="description" content="Search for your next favorite recipes and become a cooking master." />
        </Helmet>
      <Box sx={{ display: 'flex' }}>
        <NavBar />
        <AppHeader />
      </Box>
    </>
  )
}

export default AppPage
