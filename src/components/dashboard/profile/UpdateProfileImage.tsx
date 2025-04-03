import React, { useState } from 'react'
import useAxiosPrivate from '../../../axios/useAxiosPrivate'
import defaultuser from '../../../images/defaultUser.jpg';
import toast from 'react-hot-toast';
import { UseDispatch,useSelector } from 'react-redux';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

interface Props {
  profilePhoto: string;
  onPhotoUpdateSuccess: () => void;
}

const UpdateProfilePhoto = ({ profilePhoto,onPhotoUpdateSuccess} : Props) => {

  const [selectedPhoto, setSelectedPhoto] = useState<File | null>(null);
  const axiosPrivate = useAxiosPrivate();

  const handleFileInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    console.log("file", file);

    if(file) {
      setSelectedPhoto(file);

      
    }
  }
  return (
    <div>
      
    </div>
  )
}

export default UpdateProfileImage
