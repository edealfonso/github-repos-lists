import Loader from "@/components/Loader";
import RepositoryList from "@/components/RepositoryList";
import SearchBox from "@/components/SearchBox";
import UserPopup from "@/components/UserPopup";
import { AppProvider } from "@/context/app-context";

export default function Home() {
  return (
    <AppProvider>
      <header>
        <h1>
          GitHub Repositories
          <br /> With Search Functionality
        </h1>
      </header>
      <main>
        <UserPopup />
        <SearchBox />
        <RepositoryList />
        <Loader />
      </main>
    </AppProvider>
  );
}
