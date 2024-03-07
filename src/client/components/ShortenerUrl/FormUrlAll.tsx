import { type ChangeEvent, type FormEvent, useState } from "react";
import Button from "../SystemDesign/Button";
import Form from "../SystemDesign/Form";
import Input from "../SystemDesign/Input";
import LabelForm from "../SystemDesign/LabelForm";
import TitleForm from "../SystemDesign/TitleForm";
import TitleInput from "../SystemDesign/TitleInput";
import type { ShortUrlResult } from "../../types";
import axios from "axios";

interface FormUrlAllProps {
  token: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
  setShortUrl: React.Dispatch<React.SetStateAction<string>>;
  setOriginalUrl: React.Dispatch<React.SetStateAction<string>>;
}

export default function FormUrlAll({
  setError,
  setShortUrl,
  setOriginalUrl,
  token,
}: FormUrlAllProps) {
  const [userUrl, setUserUrl] = useState(""); // STate to handle user link
  // Auxliar function to save user input into state
  const handleUserInput = (e: ChangeEvent<HTMLInputElement>) => {
    setUserUrl(e.target.value);
  };
  // Auxiliar function to save the link in the database if successful
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Sent the request to the endpoint with the user link
    const fetchResult = await axios<ShortUrlResult>({
      url: "/cYSvQmg9kR/basic/shorturl",
      method: "post",
      data: {
        url: userUrl,
      },
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(({ data }) => {
        // Get the data if successful
        return data;
      })
      .catch(err => {
        // If an error happened, return it
        console.error(err);
        return { error: err.response.data.error.error as string };
      });
    // If error exist after saving, show it
    if ("error" in fetchResult) {
      setError(fetchResult.error);
      setShortUrl("");
      setOriginalUrl("");
    } else {
      // Else, show the result of saving the user link into database
      setUserUrl("");
      setError("");
      setShortUrl(fetchResult.short_url);
      setOriginalUrl(fetchResult.original_url);
    }
    return null;
  };

  // Return the form that handle user input
  return (
    <Form submitFn={handleSubmit} mdMedia="">
      <TitleForm firstColor="first-letter:text-amber-500 first-letter:text-2xl">
        Add a new link to the table.
      </TitleForm>
      <LabelForm>
        <TitleInput firstColor="first-letter:text-amber-500 first-letter:text-xl w-32">
          Link{" "}
        </TitleInput>
        <Input
          name="ProfileCreateUserLinkInput"
          type="text"
          value={userUrl}
          onChange={handleUserInput}
          lineStyle
          size={30}
          canBeTooLong
        />
      </LabelForm>
      <Button
        color="bg-blue-300 border-blue-500 hover:bg-lime-700 hover:border-lime-300"
        xSize="w-32"
      >
        Create!
      </Button>
    </Form>
  );
}
