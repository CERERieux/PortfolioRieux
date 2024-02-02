import { useState, type FormEvent, type ChangeEvent } from "react";
import LoginForm from "../SystemDesign/LoginForm";
import TitleInput from "../SystemDesign/TitleInput";
import LoginContainer from "../SystemDesign/LoginContainer";
import TitleForm from "../SystemDesign/TitleForm";
import LabelForm from "../SystemDesign/LabelForm";
import Button from "../SystemDesign/Button";
import type { User } from "../../types";

interface Props {
  createUser: ({ username, password }: User) => Promise<boolean>;
  setSignIn: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SignInForm({ createUser, setSignIn }: Props) {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const handleUsername = (e: ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
  };
  const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const handleCreateUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const resultCreate = await createUser({ username: id, password });
    if (resultCreate) {
      setId("");
      setPassword("");
      setSignIn(false);
    }
  };

  return (
    <LoginContainer>
      <TitleForm firstColor="first-letter:text-lime-600">
        Create a new user to have access to our services!
      </TitleForm>
      <LoginForm onSubmit={handleCreateUser}>
        <LabelForm>
          <TitleInput firstColor="first-letter:text-lime-600">
            Username:
          </TitleInput>
          <input
            type="text"
            value={id}
            name="new username"
            onChange={handleUsername}
            autoComplete="username"
          />
        </LabelForm>
        <LabelForm>
          <TitleInput firstColor="first-letter:text-lime-600">
            Password:{" "}
          </TitleInput>
          <input
            type="password"
            value={password}
            name="password"
            onChange={handlePassword}
            autoComplete="current-password"
          />
        </LabelForm>
        <Button color="border-lime-700 hover:bg-lime-700" mediaSize="md:w-1/3">
          Create
        </Button>
      </LoginForm>
    </LoginContainer>
  );
}
