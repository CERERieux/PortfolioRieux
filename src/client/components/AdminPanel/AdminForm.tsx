import { useState, type FormEvent, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import type { User } from "../../types";
import LoginContainer from "../SystemDesign/LoginContainer";
import TitleForm from "../SystemDesign/TitleForm";
import Form from "../SystemDesign/Form";
import LabelForm from "../SystemDesign/LabelForm";
import TitleInput from "../SystemDesign/TitleInput";
import Input from "../SystemDesign/Input";
import Button from "../SystemDesign/Button";
interface Props {
  loginAdmin: ({ username, password }: User) => Promise<boolean>;
}

export default function AdminForm({ loginAdmin }: Props) {
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
    const resultLogin = await loginAdmin({ username: id, password });
    if (resultLogin) {
      setId("");
      setPassword("");
      setTimeout(() => {
        navigate(`/${import.meta.env.VITE_ROUTE_ADMIN}/admin/menu`);
      }, 1000);
    }
  };
  return (
    <LoginContainer>
      <TitleForm firstColor="first-letter:text-sky-600">
        Administration Entrance
      </TitleForm>
      <Form submitAsync={handleLogin}>
        <LabelForm>
          <TitleInput firstColor="first-letter:text-sky-600" required>
            Admin
          </TitleInput>
          <Input
            type="text"
            value={id}
            name="username"
            onChange={handleUsername}
            autoComplete="username"
            placeHolder="Username"
            lineStyle={false}
            required={true}
          />
        </LabelForm>
        <LabelForm>
          <TitleInput firstColor="first-letter:text-sky-600" required>
            Password
          </TitleInput>
          <Input
            type="password"
            value={password}
            name="password"
            onChange={handlePassword}
            autoComplete="current-password"
            placeHolder="Password"
            lineStyle={false}
            required={true}
          />
        </LabelForm>
        <Button color="border-sky-700 hover:bg-sky-700" mediaSize="md:w-1/3">
          Login
        </Button>
      </Form>
    </LoginContainer>
  );
}
