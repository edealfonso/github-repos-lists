"use client";
import { FormEvent, ReactElement, useContext, useState } from "react";
import { getUser, searchRepositories } from "@/api/github";
import { AppContext } from "@/context/app-context";
import Image from "next/image";
import { collectLanguages } from "@/lib/utils";
import UserPopupClose from "./UserPopupClose";
import Loader from "./common/Loader";
import ErrorMessage from "./common/ErrorMessage";

export default function UserPopup() {
  const [errorMessage, setErrorMessage] = useState<ReactElement | null>(null);
  const [loadMessage, setLoadMessage] = useState<ReactElement | null>(null);
  const {
    showPopup,
    togglePopup,
    username,
    setUsername,
    setList,
    setLanguageList,
  } = useContext(AppContext);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // reset error
    setErrorMessage(null);

    // show loader
    setLoadMessage(<>Looking for user ...</>);

    // get form data (username input)
    const formData = new FormData(event.currentTarget);
    const username: string | any = formData.get("username");

    if (username) {
      // first, check that user exists
      const userData: any = await getUser(username);

      // if user not found display error
      if (userData.message) {
        if (userData.message == "Not Found") {
          setErrorMessage(
            <>
              User not found.
              <br />
              Try another username.
            </>
          );
        } else {
          setErrorMessage(<>{userData.message}</>);
        }
        setLoadMessage(null);
        return;
      }

      console.log(userData);
      // if no repos found
      if (userData.public_repos == 0) {
        setErrorMessage(
          <>
            No public repositories found for this user.
            <br />
            Please try another username.
          </>
        );
        setLoadMessage(null);
        return;
      }

      // update loader
      setLoadMessage(<>Fetching repositories ...</>);

      // fetch results
      const results: any = await searchRepositories(username);

      console.log(results);

      if (results.items) {
        // save username in context state
        setUsername(username);

        // save repository list in context state
        setList(results.items);

        // collect languages from all repositories of user and
        // save them in context state
        setLanguageList(collectLanguages(results.items));

        // hides username form popup
        togglePopup();
      } else {
        // display error (returned from API)
        setErrorMessage(
          <>
            {results.message}.
            {results.errors &&
              results.errors.map((error: any) => (
                <>
                  <br />
                  {error.message}
                </>
              ))}
          </>
        );
      }
    } else {
      // display error (no username)
      setErrorMessage(<>Please, write a valid username</>);
    }

    // remove loader
    setLoadMessage(null);
  }

  return (
    <>
      {showPopup && (
        <div className="z-10 fixed inset-0 pb-4 flex items-center justify-center bg-white dark:bg-black">
          <form
            className="max-w-md m-4 relative flex flex-col gap-6 items-center justify-center text-center px-12 pb-12 pt-6 rounded-sm border-solid border-2 border-black"
            onSubmit={handleSubmit}
            style={{ backgroundColor: "var(--background-alt-color)" }}
          >
            <h5 className="pb-2">GitHub repo spy</h5>
            <label className="flex flex-col gap-3">
              Please, write a GitHub username...
              <input type="text" name="username" />
            </label>
            <input className="my-2" type="submit" value="Submit" />
            {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
            {username && <UserPopupClose />}
            {loadMessage && <Loader local>{loadMessage}</Loader>}
          </form>
        </div>
      )}{" "}
    </>
  );
}
