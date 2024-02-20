import type { ChangeEvent, FormEvent } from "react";
import type { ImgProfile, UserInfo } from "../../types";
import Form from "../SystemDesign/Form";
import LabelForm from "../SystemDesign/LabelForm";
import TitleInput from "../SystemDesign/TitleInput";
import TextArea from "../SystemDesign/TextArea";
import SelectInput from "../SystemDesign/SelectInput";
import Button from "../SystemDesign/Button";

interface ProfileUpdateFormProps {
  aboutMe: string;
  data: UserInfo;
  imgProfile: ImgProfile;
  handleViewUpdateProfile: (data: UserInfo) => void;
  handleUpdate: (e: FormEvent<HTMLFormElement>, data: UserInfo) => void;
  setAboutMe: React.Dispatch<React.SetStateAction<string>>;
  setImgProfile: React.Dispatch<React.SetStateAction<ImgProfile>>;
}

export default function ProfileUpdateForm({
  aboutMe,
  data,
  handleViewUpdateProfile,
  handleUpdate,
  imgProfile,
  setAboutMe,
  setImgProfile,
}: ProfileUpdateFormProps) {
  // 2 functions that handle the user inputs
  const handleAboutMe = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setAboutMe(e.target.value);
  };
  const handleProfileImg = (e: ChangeEvent<HTMLSelectElement>) => {
    setImgProfile(e.target.value as ImgProfile);
  };
  // A function that sends the form and data to update
  const handleForm = (e: FormEvent<HTMLFormElement>) => {
    handleUpdate(e, data);
  };

  /** Component that return the form that update user info */
  return (
    <div className="flex h-full w-full items-center justify-center px-6 py-2">
      <Form
        submitFn={handleForm}
        style="items-center gap-2 flex-row lg:grid lg:grid-cols-2 lg:grid-rows-2"
      >
        <LabelForm style="lg:col-start-1 lg:row-span-2">
          <TitleInput required>About Me</TitleInput>
          <TextArea
            name="BioUpdate"
            cols={50}
            rows={5}
            value={aboutMe}
            onChange={handleAboutMe}
            lineStyle={false}
            max={500}
          ></TextArea>
        </LabelForm>
        <LabelForm style="items-center">
          <TitleInput>Profile Image</TitleInput>
          <SelectInput
            name="ProfileImgSelect"
            value={imgProfile}
            onChange={handleProfileImg}
            lineStyle
          >
            <option value="type-img-1">Image 1</option>
            <option value="type-img-2">Image 2</option>
            <option value="type-img-3">Image 3</option>
            <option value="type-img-4">Image 4</option>
            <option value="type-img-5">Image 5</option>
            <option value="type-img-6">Image 6</option>
          </SelectInput>
        </LabelForm>
        <div className="flex w-full items-center justify-center gap-4 lg:col-start-2 lg:row-start-2 lg:justify-start">
          <Button
            onClick={() => {
              handleViewUpdateProfile(data);
            }}
            color="bg-yellow-300 border-yellow-500 hover:bg-yellow-600 hover:border-yellow-300 shadow-md shadow-black/20 active:shadow-none"
            xSize="w-40"
          >
            Cancel
          </Button>
          <Button
            color="bg-blue-300 border-blue-500 hover:bg-blue-600 hover:border-blue-300 shadow-md shadow-black/20 active:shadow-none"
            xSize="w-40"
          >
            Update profile!
          </Button>
        </div>
      </Form>
    </div>
  );
}
