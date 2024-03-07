import { isAxiosError } from "axios";
import { useProfile } from "../../hooks/useProfile";
import UnauthorizedAccess from "../NotFound/AuthError";
import { useState, useEffect, type FormEvent } from "react";
import type { UserInfo, ImgProfile } from "../../types";
import { useUser } from "../../store/user";
import ErrorMessage from "../SystemDesign/ErrorMessage";
import ActionMessage from "../SystemDesign/ActionMessage";
import ProfileMenu from "./ProfileMenu";
import CustomBackground from "../SystemDesign/CustomBackground";
import HeaderProfile from "./HeaderProfile";
import ProfileUpdateForm from "./ProfileUpdateForm";
import FooterAttribution from "../SystemDesign/FooterAttribution";

export default function MyProfile() {
  const { logoffUser } = useUser(); // <-- TODO move this and make navmenu
  const { data, error, errorAuth, updateInfo } = useProfile({}); // Auxiliars to ensure its used only by users
  const [isUpdating, setIsUpdating] = useState(false); // State to handle view between profile info and update form
  // 2 States for the update form and handle user data
  const [aboutMe, setAboutMe] = useState("");
  const [imgProfile, setImgProfile] = useState<ImgProfile>("type-img-1");
  // 2 states to display local successful actions and errors
  const [action, setAction] = useState<null | string>(null);
  const [localError, setLocalError] = useState<null | string>(null);

  // Effect that activates each time update is done
  useEffect(() => {
    // If update is completed
    if (updateInfo.isSuccess) {
      // We need to check if a error happened
      if (!("error" in updateInfo.data)) {
        // If not, reset the view and the 2 states for the form
        setIsUpdating(false);
        setImgProfile("type-img-1");
        setAboutMe("");
        setLocalError(null); // Remove local error
        setAction(updateInfo.data.action); // Indicate that update was good
        // And remove message after 2 seconds
        setTimeout(() => {
          setAction(null);
        }, 2000);
      } else {
        // If there was an error, indicate it to user
        setLocalError(updateInfo.data.error);
        setAction(null); // Remove action
        // Display message for 3 seconds
        setTimeout(() => {
          setLocalError(null);
        }, 3000);
      }
    } else if (updateInfo.isError) {
      // If there was an error that interrupt the update
      const { error } = updateInfo; // Get the error and display it
      if (isAxiosError(error)) {
        setLocalError(error.response?.data.error);
      } else {
        // If the error is something that axios can't cover, return an empty message
        setLocalError("Something went wrong at updating your profile...");
      }
      // Display error for 3 seconds
      setTimeout(() => {
        setLocalError(null);
      }, 3000);
    }
  }, [updateInfo.isSuccess]);

  // Function that handles update of the form, in case duplicated info, don't update that field
  const handleUpdate = (e: FormEvent<HTMLFormElement>, data: UserInfo) => {
    e.preventDefault();
    let newBio;
    let newImg;
    if (aboutMe !== data.bio) newBio = aboutMe;
    if (imgProfile !== data.img) newImg = imgProfile;
    updateInfo.mutate({ img: newImg, bio: newBio });
  };
  // Function that display 1 view or another depending if user is updating or not
  const handleViewUpdateProfile = (data: UserInfo) => {
    if (!isUpdating) {
      setIsUpdating(true);
      setAboutMe(data.bio);
      setImgProfile(data.img as ImgProfile);
    } else {
      setIsUpdating(false);
      setAboutMe("");
      setImgProfile("type-img-1");
    }
  };

  // Display "My Profile" only if user is logged, if not, display UnauthorizedAccess
  return (
    <>
      {errorAuth.cause !== null ? (
        <UnauthorizedAccess errorAuth={errorAuth} />
      ) : (
        <CustomBackground
          styles="flex h-full w-full flex-col items-center justify-center gap-10 md:gap-0"
          bgImg="before:bg-[url('/profileBG.jpg')] before:opacity-5"
        >
          {error !== null && isAxiosError(error) && (
            <ErrorMessage extraStyles="md:left-1/4 z-10">
              {error.response?.data.error}
            </ErrorMessage>
          )}
          {localError !== null && (
            <ErrorMessage extraStyles="md:left-1/4 z-10">
              {localError}
            </ErrorMessage>
          )}
          {action !== null && (
            <ActionMessage extraStyles="md:left-1/4 z-10">
              {action}
            </ActionMessage>
          )}
          {data !== undefined ? (
            <>
              <button
                onClick={logoffUser}
                className="absolute bottom-0 left-0 w-20 border bg-slate-200"
              >
                Log off
              </button>
              <header className="flex h-2/5 w-full gap-6 shadow-md shadow-black/20 lg:h-2/5">
                {!isUpdating ? (
                  <HeaderProfile
                    data={data}
                    handleViewUpdateProfile={handleViewUpdateProfile}
                    isUpdating={isUpdating}
                  />
                ) : (
                  <ProfileUpdateForm
                    aboutMe={aboutMe}
                    data={data}
                    handleUpdate={handleUpdate}
                    handleViewUpdateProfile={handleViewUpdateProfile}
                    imgProfile={imgProfile}
                    setAboutMe={setAboutMe}
                    setImgProfile={setImgProfile}
                  />
                )}
              </header>
              <ProfileMenu />
              <FooterAttribution
                whatIs="Background Image by"
                placeRef="NACreative"
                extra=" on Freepik"
                urlRef="https://www.freepik.com/free-vector/halftone-background-abstract-black-white-dots-shape_25976232.htm#query=dot%20pattern&position=3&from_view=search&track=ais&uuid=587b59f3-6554-41ba-8e64-dd0cab7d17ae"
              />
            </>
          ) : (
            <h3>Loading...</h3>
          )}
        </CustomBackground>
      )}
    </>
  );
}
