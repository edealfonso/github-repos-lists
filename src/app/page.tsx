import RepositoryList from "@/components/RepositoryList";
import SearchBox from "@/components/SearchBox";
import UserFormPopup from "@/components/UserFormPopup";
import { AppProvider } from "@/context/app-context";

export default function Home() {
  return (
    <AppProvider>
      <header>
        <h1>GitHub Repositories With Search Functionality</h1>
      </header>
      <main>
        <UserFormPopup />
        <SearchBox />
        <RepositoryList />
      </main>
    </AppProvider>
  );
}
