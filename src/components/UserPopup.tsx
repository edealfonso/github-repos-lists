"use client";
import { FormEvent, ReactElement, useContext, useState } from "react";
import { searchRepositories } from "@/api/github";
import { AppContext } from "@/context/app-context";
import Image from "next/image";
import { collectLanguages } from "@/lib/utils";
import UserPopupClose from "./UserPopupClose";

export default function UserPopup() {
  const [errorMessage, setErrorMessage] = useState<ReactElement>(<></>);
  const {
    showPopup,
    togglePopup,
    username,
    setUsername,
    setList,
    setIsLoading,
    setLanguageList,
  } = useContext(AppContext);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // reset error
    setErrorMessage(<></>);

    // show loader
    setIsLoading(true);

    // get form data (username input)
    const formData = new FormData(event.currentTarget);
    const username: string | any = formData.get("username");

    if (username) {
      // fetch results
      const results: any = await searchRepositories(username);

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
            {results.message}. <br />
            Try another username.
          </>
        );
      }
    } else {
      // display error (no username)
      setErrorMessage(<>Please, write a valid username</>);
    }

    // remove loader
    setIsLoading(false);
  }

  return (
    <>
      {showPopup && (
        <div className="z-10 fixed inset-0 pb-4 flex items-center justify-center backdrop-brightness-50 bg-white/50 dark:bg-black/30">
          <form
            className="max-w-md	m-4 relative flex flex-col gap-5 items-center justify-center text-center p-8 rounded-sm border-solid border-2 border-black"
            onSubmit={handleSubmit}
            style={{ backgroundColor: "var(--background-alt-color)" }}
          >
            <label className="flex flex-col gap-5">
              Please, write a GitHub username
              <input type="text" name="username" />
            </label>
            <input className="mt-2" type="submit" value="Submit" />
            {errorMessage && (
              <small className="text-error">{errorMessage}</small>
            )}
            {username && <UserPopupClose />}
          </form>
        </div>
      )}{" "}
    </>
  );
}
