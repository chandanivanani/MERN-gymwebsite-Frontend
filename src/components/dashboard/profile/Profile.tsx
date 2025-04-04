import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import MailOutlinedIcon from "@mui/icons-material/MailOutlined";
import HeightOutlinedIcon from "@mui/icons-material/HeightOutlined";
import MonitorWeightOutlinedIcon from '@mui/icons-material/MonitorWeightOutlined';
import EditNoteSharpIcon from "@mui/icons-material/EditNoteSharp";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import {
  fetchUserProfile,
  updateUserProfile,
} from "../../../store/slices/userProfileSlice";
import useAxiosPrivate from "../../../axios/useAxiosPrivate";
import UpdateProfileImage from "./UpdateProfileImage";

interface UserData {
  firstname: string;
  lastname: string;
  email: string;
  gender: string;
  profilePhoto: string;
  height?: number;
  role?: number;
  weight?: number;
  bio: string;
}

interface ProfileProps {
  isAdmin: boolean;
}

const Profile = ({ isAdmin }: ProfileProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const axiosPrivate = useAxiosPrivate();
  const { userData, loading, error } = useSelector(
    (state: RootState) => state.userProfile
  );
  const { register, handleSubmit, reset, control } = useForm({
    defaultValues: userData || {
      firstname: "",
      lastname: "",
      email: "",
      gender: "",
      height: 0,
      weight: 0,  
      bio: "",
    },
  });
  

  useEffect(() => {
    if(axiosPrivate){
      dispatch(fetchUserProfile(axiosPrivate));
    }
  }, [dispatch,axiosPrivate]);

  useEffect(() => {
    if (userData) {
      reset(userData);
    }
  }, [userData, reset]);
// console.log(userData);

  const handlePhotoUpdateSuccess = () => {
    dispatch(fetchUserProfile(axiosPrivate));
  };

  const onSubmitData = async (updatedData: UserData) => {
    try {
      await dispatch(updateUserProfile({data: updatedData,axiosPrivate}))
        .unwrap()
        .then(() => {
          toast.success("Profile data updated successfully");
        });
    } catch (error) {
      toast.error("Please try again");
    }
  };

  const handleCancel = () => {
    if (userData) {
      reset(userData);
    }
  };

  return (
    <div className="mx-auto max-w-270">
      <div className="grid grid-cols-5 gap-8">
        <UpdateProfileImage profilePhoto= {userData?.profilePhoto as string || ''} onPhotoUpdateSuccess={handlePhotoUpdateSuccess} />
        <div className="col-span-5  xl:col-span-3">
          {/* section 1 */}
          <div className="border rounded-lg bg-surface-200 shadow-md border-surface-300">
            <div className="border-b border-surface-300 py-4 px-7">
              <h3 className="font-medium text-white">Personal Information</h3>
            </div>
            <div className="p-7">
              <form onSubmit={handleSubmit(onSubmitData)}>
                <div className="mb-5 flex flex-col gap-5 sm:flex-row">
                  <div className="w-full sm:w-1/2">
                    <label
                      className="mb-3 block text-sm font-medium text-white"
                      htmlFor="firstname"
                    >
                      First Name
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-2.5 text-gray-400">
                        <PersonOutlineOutlinedIcon fontSize="medium" />
                      </span>
                      <input
                        id="firstname"
                        className="w-full rounded border text-[15px] tracking-wider border-surface-300 bg-surface-200 py-3 pl-11 pr-4 focus:ring-surface-500 focus:border-surface-300 text-white"
                        type="text"
                        placeholder="Enter Firstname"
                        {...register("firstname")}
                      />
                    </div>
                  </div>

                  <div className="w-full sm:w-1/2">
                    <label
                      htmlFor="LastName"
                      className="mb-3 block text-sm font-medium text-white"
                    >
                      Last Name
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="lastName"
                        className="w-full text-[15px] tracking-wider rounded border border-surface-300 bg-surface-200 py-3 pl-6 pr-4 focus:ring-surface-500 focus:border-surface-300 text-white"
                        placeholder="Enter Lastname"
                        {...register("lastname")}
                      />
                    </div>
                  </div>
                </div>

                <div className="mb-5">
                  <label
                    className="mb-3 block text-sm font-medium text-white"
                    htmlFor="emailAddress"
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-2.5 text-gray-400">
                      <MailOutlinedIcon className="text-xl" />
                    </span>
                    <input
                      type="email"
                      id="emailAddress"
                      className="w-full text-[15px] tracking-wider rounded border border-surface-300 bg-surface-200 py-3 pl-12 pr-4 focus:ring-surface-500 focus:border-surface-300 text-white"
                      placeholder="Enter Email"
                      {...register("email")}
                    />
                  </div>
                </div>

                <div className="mb-5 flex flex-col gap-5 sm:flex-row">
                  <div className="w-full sm:w-1/2">
                    <label
                      className="mb-3 block text-sm font-medium text-white"
                      htmlFor="radio-1"
                    >
                      Gender
                    </label>
                    <div className="flex items-center ps-4 border border-surface-300 rounded dark:border-gray-700">
                      <input
                        type="radio"
                        id="male"
                        value="male"
                        className="w-4 h-4 text-primary-400 focus:ring-primary-300 ring-offset-gray-800 focus:ring-0 bg-surface-300 border-surface-500"
                        {...register("gender")}
                      />
                      <label htmlFor="male" className="w-full text-[15px] tracking-wider py-3 ms-2 text-white">
                        Male
                      </label>

                      <input
                        type="radio"
                        id="female"
                        value="female"
                        className="w-4 h-4 text-primary-400 focus:ring-primary-300 ring-offset-gray-800 focus:ring-0 bg-surface-300 border-surface-500"
                        {...register("gender")}
                      />
                      <label htmlFor="female" className="w-full text-[15px] tracking-wider py-3 ms-2 text-white">
                        Female
                      </label>
                    </div>
                  </div>
                </div>

                {!isAdmin && (
                  <>
                    <div className="mb-5 flex flex-col gap-5 sm:flex-row">
                      <div className="w-full sm:w-1/2">
                        <label className="mb-3 block text-sm font-medium text-white">
                          Height(cm)
                        </label>
                        <div className="relative">
                          <span className="absolute left-2.5 top-2.5 text-gray-400">
                            <HeightOutlinedIcon className="text-xl" />
                          </span>
                          <input
                            className="w-full text-[15px] tracking-wider rounded border border-surface=300 bg-surface-200 py-3 pl-11 pr-4 focus:ring-surface-500 focus:border-surface-300 text-white"
                            type="number"
                            id="height"
                            placeholder="Enter Height"
                            {...register("height")}
                          />
                        </div>
                      </div>

                      <div className="w-full sm:w-1/2">
                        <label
                          htmlFor="weight"
                          className="mb-3 block text-sm font-medium text-white"
                        >
                          Weight(kg)
                        </label>
                        <div className="relative">
                          <span className="absolute left-4 top-2.5 text-gray-400">
                            <MonitorWeightOutlinedIcon className="text-xl" />
                          </span>
                          <input
                            className="w-full text-[15px] tracking-wider rounded border border-surface-300 bg-surface-200 py-3 pl-11 pr-4 focus:ring-surface-500 focus:border-surface-300 text-white"
                            type="number"
                            id="weight"
                            placeholder="Enter Weight"
                            {...register("weight")}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mb-5">
                      <label className="mb-3 block text-sm font-medium text-white">
                        Bio
                      </label>
                      <div className="relative">
                        <span className="absolute left-4 top-2.5 text-gray-400">
                          <EditNoteSharpIcon className="text-lg" />
                        </span>

                        <textarea
                          className="w-full rounded border text-[15px] tracking-wider font-normal border-surface-300 bg-surface-200 py-3 pl-11 pr-4  focus:ring-surface-500 focus:border-surface-300 text-white "
                          rows={6}
                          placeholder="Write your bio here"
                          {...register("bio")}
                          id="bio"
                        ></textarea>
                      </div>
                    </div>
                  </>
                )}

                <div className="flex justify-end gap-4">
                  <button
                    className="flex justify-center rounded border border-primary-500 py-2 px-6 font-medium hover:bg-surface-100 text-white"
                    type="button"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                  <button
                    className="flex justify-center rounded bg-primary-400 py-2 px-6 font-medium text-white hover:bg-opacity-90"
                    type="submit"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
