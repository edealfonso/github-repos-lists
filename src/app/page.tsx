import RepositoryList from "@/components/RepositoryList";
import SearchBar from "@/components/SearchBar";
import UserForm from "@/components/UserForm";
import { AppProvider } from "@/context/app-context";

export default function Home() {
  return (
    <AppProvider>
      <header>
        <h1>GitHub Repositories With Search Functionality</h1>
      </header>
      <main>
        <UserForm />
        <SearchBar />
        <RepositoryList />
      </main>
    </AppProvider>
  );
}
