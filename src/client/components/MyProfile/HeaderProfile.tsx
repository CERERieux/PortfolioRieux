import type { UserInfo } from "../../types";
import Button from "../SystemDesign/Button";

interface HeaderProfileProps {
  data: UserInfo;
  isUpdating: boolean;
  handleViewUpdateProfile: (data: UserInfo) => void;
}

// For avatars credit references
// <a href="https://www.freepik.com/free-photo/manhattan-downtown-architecture-night-view_26740875.htm#fromView=search&page=1&position=2&uuid=1f2a1068-425a-4cbf-9d76-884802326e84">Image by TravelScape on Freepik</a>
// <a href="https://www.freepik.com/free-photo/skyscrapers-from-low-angle-view_1119728.htm#fromView=search&page=2&position=4&uuid=1f2a1068-425a-4cbf-9d76-884802326e84">Image by fanjianhua on Freepik</a>
// <a href="https://www.freepik.com/free-photo/sunshine-through-huge-tree_2829629.htm#fromView=search&page=1&position=5&uuid=737e70a4-6062-4ca0-b6c3-b396cc9dbb57">Image by freepik</a>
// <a href="https://www.freepik.com/free-photo/beautiful-island_1114645.htm#fromView=search&page=1&position=45&uuid=737e70a4-6062-4ca0-b6c3-b396cc9dbb57">Image by mrsiraphol on Freepik</a>
// <a href="https://www.freepik.com/free-photo/man-with-hands-wide-open-standing-top-mountain-enjoying-incredible-view-lake_18088638.htm#fromView=search&page=1&position=49&uuid=737e70a4-6062-4ca0-b6c3-b396cc9dbb57">Image by wirestock on Freepik</a>
// <a href="https://www.freepik.com/free-photo/oak-forest-autumn_1239302.htm#fromView=search&page=1&position=12&uuid=29ad8a95-e5dd-43e8-ab57-a0870e7b0cb3">Image by bearfotos on Freepik</a>

/** Component that display user info like username, pfp and bio */
export default function HeaderProfile({
  data,
  handleViewUpdateProfile,
}: HeaderProfileProps) {
  return (
    <>
      <section className="h-full w-36 py-2">
        <h2 className="text-center">
          <span className="rounded-full bg-black/60 px-2 py-1 text-slate-50">
            {data.username}
          </span>
        </h2>
        <div className="mx-2 mt-2 flex h-32 w-32 items-center justify-center">
          <img
            src={`/${data.img}.webp`}
            alt="User Image Profile"
            className="max-h-full max-w-full rounded-full"
          />
        </div>
      </section>
      {
        <article className="relative my-2 mr-4 flex w-full flex-col lg:mr-6">
          <h3>About me:</h3>
          {data.bio !== "" ? (
            <p className="h-[65%] w-full overflow-y-auto text-pretty rounded-md border border-slate-600 px-2 py-1 sm:h-[61%] lg:py-0">
              {data.bio}
            </p>
          ) : (
            <p className="text-pretty italic">
              (Update your profile, you can tell us a bit about you here!)
            </p>
          )}
          <Button
            color="bg-blue-300 border-blue-500 hover:bg-blue-600 hover:border-blue-300"
            xSize="w-36"
            extraStyles="absolute bottom-4 md:bottom-0 shadow-md shadow-black/20 active:shadow-none"
            onClick={() => {
              handleViewUpdateProfile(data);
            }}
          >
            Update profile
          </Button>
        </article>
      }
    </>
  );
}
