import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { AppRoutes } from "./router";

export default function App() {
  return (
    <>
      <Navbar />
      <AppRoutes />
      <Footer />
    </>
  );
}
