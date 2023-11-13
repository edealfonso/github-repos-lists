import Loader from "@/components/common/Loader";
import RepositoryList from "@/components/RepositoryList";
import SearchBox from "@/components/SearchBox";
import UserPopup from "@/components/UserPopup";
import { AppProvider } from "@/context/app-context";

export default function Home() {
  return (
    <AppProvider>
      <main>
        <SearchBox />
        <RepositoryList />
        <UserPopup />
        <Loader />
      </main>
    </AppProvider>
  );
}
