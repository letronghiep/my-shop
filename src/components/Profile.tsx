"use client";

import { IUser } from "@/types/global";

interface IProfile {
  id: string;
  profile: IUser | null;
}
function Profile({ id, profile }: IProfile) {
  return (
    <div id={id}>
      {profile && (
        <div>
          <h1>{profile.usr_full_name}</h1>
          <p>{profile.usr_email}</p>
        </div>
      )}
    </div>
  );
}

export default Profile;
