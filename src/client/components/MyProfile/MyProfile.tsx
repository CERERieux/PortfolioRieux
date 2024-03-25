import { isAxiosError } from "axios";
import { useProfile } from "../../hooks/useProfile";
import UnauthorizedAccess from "../NotFound/AuthError";
import { useState, useEffect, type FormEvent } from "react";
import type { UserInfo, ImgProfile } from "../../types";
import ErrorMessage from "../SystemDesign/ErrorMessage";
import ActionMessage from "../SystemDesign/ActionMessage";
import ProfileMenu from "./ProfileMenu";
import CustomBackground from "../SystemDesign/CustomBackground";
import HeaderProfile from "./HeaderProfile";
import ProfileUpdateForm from "./ProfileUpdateForm";
import LoaderText from "../NotFound/LoaderText";
import SimpleNavMenu from "../Menu/SimpleNavMenu";
import FooterAttributionMultiple from "../SystemDesign/FooterAttributionMultiple";

// For avatars credit references
export const ATTRIBUTION_PFP = {
  "type-img-1": {
    whatIsFrom2: "Profile Image by ",
    urlRef2:
      "https://www.freepik.com/free-photo/manhattan-downtown-architecture-night-view_26740875.htm#fromView=search&page=1&position=2&uuid=1f2a1068-425a-4cbf-9d76-884802326e84",
    extra2: "TravelScape",
    placeRef2: "on Freepik",
  },
  "type-img-2": {
    whatIsFrom2: "Profile Image by ",
    urlRef2:
      "https://www.freepik.com/free-photo/skyscrapers-from-low-angle-view_1119728.htm#fromView=search&page=2&position=4&uuid=1f2a1068-425a-4cbf-9d76-884802326e84",
    extra2: "fanjianhua",
    placeRef2: "on Freepik",
  },
  "type-img-3": {
    whatIsFrom2: "Profile Image by ",
    urlRef2:
      "https://www.freepik.com/free-photo/sunshine-through-huge-tree_2829629.htm#fromView=search&page=1&position=5&uuid=737e70a4-6062-4ca0-b6c3-b396cc9dbb57",
    extra2: "Freepik",
    placeRef2: "on Freepik",
  },
  "type-img-4": {
    whatIsFrom2: "Profile Image by ",
    urlRef2:
      "https://www.freepik.com/free-photo/beautiful-island_1114645.htm#fromView=search&page=1&position=45&uuid=737e70a4-6062-4ca0-b6c3-b396cc9dbb57",
    extra2: "mrsiraphol",
    placeRef2: "on Freepik",
  },
  "type-img-5": {
    whatIsFrom2: "Profile Image by ",
    urlRef2:
      "https://www.freepik.com/free-photo/man-with-hands-wide-open-standing-top-mountain-enjoying-incredible-view-lake_18088638.htm#fromView=search&page=1&position=49&uuid=737e70a4-6062-4ca0-b6c3-b396cc9dbb57",
    extra2: "wirestock",
    placeRef2: "on Freepik",
  },
  "type-img-6": {
    whatIsFrom2: "Profile Image by ",
    urlRef2:
      "https://www.freepik.com/free-photo/oak-forest-autumn_1239302.htm#fromView=search&page=1&position=12&uuid=29ad8a95-e5dd-43e8-ab57-a0870e7b0cb3",
    extra2: "bearfotos",
    placeRef2: "on Freepik",
  },
};

export default function MyProfile() {
  const { data, error, errorAuth, updateInfo } = useProfile({}); // Auxiliars to ensure its used only by users
  const [isUpdating, setIsUpdating] = useState(false); // State to handle view between profile info and update form
  // 2 States for the update form and handle user data
  const [aboutMe, setAboutMe] = useState("");
  const [imgProfile, setImgProfile] = useState<ImgProfile>("type-img-1");
  // 2 states to display local successful actions and errors
  const [action, setAction] = useState<null | string>(null);
  const [localError, setLocalError] = useState<null | string>(null);

  // Use effect to change the title of the page
  useEffect(() => {
    document.title = "My Profile";
  }, []);

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
          bgImg="before:bg-[url('/profileBG.webp')] before:opacity-5 relative"
        >
          {error !== null && isAxiosError(error) && (
            <ErrorMessage>{error.response?.data.error}</ErrorMessage>
          )}
          {localError !== null && <ErrorMessage>{localError}</ErrorMessage>}
          {action !== null && <ActionMessage>{action}</ActionMessage>}
          {data !== undefined ? (
            <>
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
              <SimpleNavMenu positionNav="absolute left-16 top-[25%] md:top-[35%] md:top-[30%] lg:right-0 z-20" />
              <ProfileMenu />
              <FooterAttributionMultiple
                samePlace
                whatIsFrom1="Background Image by"
                placeRef1="on Freepik"
                extra1=" NACreative"
                urlRef1="https://www.freepik.com/free-vector/halftone-background-abstract-black-white-dots-shape_25976232.htm#query=dot%20pattern&position=3&from_view=search&track=ais&uuid=587b59f3-6554-41ba-8e64-dd0cab7d17ae"
                whatIsFrom2={
                  ATTRIBUTION_PFP[data.img as keyof typeof ATTRIBUTION_PFP]
                    .whatIsFrom2
                }
                placeRef2={
                  ATTRIBUTION_PFP[data.img as keyof typeof ATTRIBUTION_PFP]
                    .placeRef2
                }
                extra2={
                  ATTRIBUTION_PFP[data.img as keyof typeof ATTRIBUTION_PFP]
                    .extra2
                }
                urlRef2={
                  ATTRIBUTION_PFP[data.img as keyof typeof ATTRIBUTION_PFP]
                    .whatIsFrom2
                }
              />
            </>
          ) : (
            <LoaderText />
          )}
        </CustomBackground>
      )}
    </>
  );
}
