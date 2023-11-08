import RepositoryList from "@/components/RepositoryList";
import SearchBar from "@/components/SearchBar";
import UsernameInputForm from "@/components/UserInputForm";
import { AppProvider } from "@/context/app-context";

export default function Home() {
  return (
    <AppProvider>
      <main className="min-h-screen p-16">
        <UsernameInputForm />
        <SearchBar />
        <RepositoryList />
      </main>
    </AppProvider>
  );
}
