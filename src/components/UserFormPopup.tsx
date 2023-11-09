"use client";
import { FormEvent, useContext, useState } from "react";
import { searchRepositories } from "@/api/github";
import { AppContext } from "@/context/app-context";
import Image from "next/image";
import { collectLanguages } from "@/lib/utils";

export default function UserFormPopup() {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const {
    showForm,
    toggleForm,
    username,
    setUsername,
    setList,
    setIsLoading,
    setLanguageList,
  } = useContext(AppContext);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // reset error
    setErrorMessage("");

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
        toggleForm();
      } else {
        // display error
        setErrorMessage(results.message);
      }

      // remove loader
      setIsLoading(false);
    }
  }

  return (
    <>
      {showForm && (
        <div className="z-10 fixed inset-0 flex items-center justify-center backdrop-brightness-50 bg-white/50">
          <form
            className="max-w-md	m-4 relative flex flex-col gap-5 items-center justify-center text-center p-8 mb-8 rounded-sm border-solid border-2 border-black"
            onSubmit={handleSubmit}
            style={{ backgroundColor: "var(--background-alt-color)" }}
          >
            <label className="flex flex-col gap-5">
              Please, write a GitHub username
              <input type="text" name="username" />
            </label>
            <input className="mt-2" type="submit" value="Submit" />
            {errorMessage && (
              <small className="opacity-50">{errorMessage}</small>
            )}
            {username && (
              <a
                className="absolute top-0 right-0 translate-x-5 -translate-y-5"
                onClick={toggleForm}
              >
                <Image
                  className="p-1 bg-white rounded-full border-solid border-2 border-black"
                  src="/images/icons/close.svg"
                  width={40}
                  height={40}
                  alt="✕"
                />
              </a>
            )}
          </form>
        </div>
      )}{" "}
    </>
  );
}
