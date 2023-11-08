"use client";
import { FormEvent, useContext } from "react";
import { getRepositoriesFromUsername, searchRepositories } from "@/api/github";
import { RepositoryData } from "@/lib/types";
import { AppContext } from "@/context/app-context";
import Image from "next/image";

export default function UsernameInputForm() {
  const { showForm, toggleForm, username, setUsername, setList } =
    useContext(AppContext);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const username: string | any = formData.get("username");

    if (username) {
      const results: any = await searchRepositories(username);
      setUsername(username);
      setList(results.items);
      toggleForm();
    }
  }

  return (
    <>
      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-brightness-50 bg-white/50">
          <form
            className="relative flex flex-col gap-5 items-center justify-center text-center p-8 mb-8 rounded-sm border-solid border-2 border-black"
            onSubmit={handleSubmit}
            style={{ backgroundColor: "var(--background-alt-color)" }}
          >
            <label className="flex flex-col gap-5">
              Write a GitHub username
              <input type="text" name="username" />
            </label>
            <input
              className="py-1 px-2 mt-2 rounded-sm"
              type="submit"
              value="Submit"
              style={{ backgroundColor: "var(--button-color)" }}
            />
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
