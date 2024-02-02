import { useState, type FormEvent, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../SystemDesign/Button";
import LoginContainer from "../SystemDesign/LoginContainer";
import LoginForm from "../SystemDesign/LoginForm";
import LabelForm from "../SystemDesign/LabelForm";
import TitleInput from "../SystemDesign/TitleInput";
import TitleForm from "../SystemDesign/TitleForm";
import type { User } from "../../types";

interface Props {
  loginUser: ({ username, password }: User) => Promise<boolean>;
}

export default function LogInForm({ loginUser }: Props) {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleUsername = (e: ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
  };
  const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const resultLogin = await loginUser({ username: id, password });
    if (resultLogin) {
      setId("");
      setPassword("");
      setTimeout(() => {
        navigate("/home");
      }, 4000);
    }
  };

  return (
    <LoginContainer>
      <TitleForm firstColor="first-letter:text-sky-600">
        Login to have access to our services!
      </TitleForm>
      <LoginForm onSubmit={handleLogin}>
        <LabelForm>
          <TitleInput firstColor="first-letter:text-sky-600">
            Username:{" "}
          </TitleInput>
          <input
            type="text"
            value={id}
            name="username"
            onChange={handleUsername}
            autoComplete="username"
          />
        </LabelForm>
        <LabelForm>
          <TitleInput firstColor="first-letter:text-sky-600">
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
        <Button color="border-sky-700 hover:bg-sky-700" mediaSize="md:w-1/3">
          Login
        </Button>
      </LoginForm>
    </LoginContainer>
  );
}
