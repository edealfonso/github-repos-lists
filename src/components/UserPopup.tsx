"use client";
import {
  FormEvent,
  ReactElement,
  useContext,
  useEffect,
  useState,
} from "react";
import { getUser, searchRepositories } from "@/api/github";
import { AppContext } from "@/context/app-context";
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

  // reset error messages when starting to perform an action
  useEffect(() => {
    if (loadMessage) {
      setErrorMessage(null);
    }
  }, [loadMessage]);

  // hide loader when error messages appear
  useEffect(() => {
    if (errorMessage) {
      setLoadMessage(null);
    }
  }, [errorMessage]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // show loader
    setLoadMessage(<>Looking for user ...</>);

    // get form data (username input)
    const formData = new FormData(event.currentTarget);
    const username: string | any = formData.get("username");

    // display error (no username)
    if (!username) {
      setErrorMessage(<>Please, write a valid username</>);
      return;
    }

    const verified = await verifyUser(username);
    if (verified) {
      fetchRepositories(username);
    }
  }

  // function that verifies if user exists and has public respositories
  async function verifyUser(username: string) {
    // API REQUEST (check that user exists)
    const userData: any = await getUser(username);

    // display error (user not found)
    if (userData.message) {
      if (userData.message == "Not Found") {
        setErrorMessage(
          <>
            User not found.
            <br />
            Try another username.
          </>,
        );
      } else {
        setErrorMessage(<>{userData.message}</>);
      }
      return false;
    }

    // display error (no repos found)
    if (userData.public_repos == 0) {
      setErrorMessage(
        <>
          No public repositories found for this user.
          <br />
          Please try another username.
        </>,
      );
      return false;
    }
    return true;
  }

  // function that
  // 1- fetches repositories from verified user
  // 2- if correctly found, updates context variables and updates UI accordingly
  async function fetchRepositories(username: string) {
    // update loader
    setLoadMessage(<>Fetching repositories ...</>);

    // API REQUEST (fetch repos)
    const results: any = await searchRepositories({ username });

    // display error (no items populated, reads API error message)
    if (!results.items) {
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
        </>,
      );
    }

    // if all the process is successfull save data in context state
    // language are collected utility function
    setUsername(username);
    setList(results.items);
    setLanguageList(collectLanguages(results.items));

    // update UI
    togglePopup();
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
            {username && (
              <UserPopupClose
                onPopupClose={() => {
                  setErrorMessage(null);
                }}
              />
            )}
            {loadMessage && <Loader local>{loadMessage}</Loader>}
          </form>
        </div>
      )}{" "}
    </>
  );
}
