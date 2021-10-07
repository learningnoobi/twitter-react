import React,{useEffect,useState,useRef} from 'react'
import { userEdit } from "../../redux/asyncActions/UserAsync";
import { useDispatch } from "react-redux";
const UserEditModal= ({ user, modalId }) => {
    const dispatch = useDispatch();
    // console.log(user);
    const [bio, setBio] = useState(user?.bio);
    const [nickname, setNickname] = useState(user?.nickname||'');
    const inputOpenFileRef = useRef(null);
    const inputAvatarFileRef = useRef(null);
    const [avatar, setAvatar] = useState();
    const [cover, setCover] = useState();
    const [prevCoverImage, setPrevCoverImage] = useState(false);
    const [prevAvatarImage, setPrevAvatarImage] = useState(false);
    useEffect(() => {
      //bootstrap tooltip 
      window.$('[data-toggle="tooltip"]').tooltip(); 
  
    }, []);
    const showOpenFileDlg = () => {
      inputOpenFileRef.current.click();
      console.log('clicked to cover image')
    };
    const showAvatarFileDlg = () => {
      inputAvatarFileRef.current.click();
      console.log('clicked to profile image')
    };
    const imageChanged = (e) => {
      setCover(e.target.files[0]);
        setPrevCoverImage(URL.createObjectURL(e.target.files[0]));
    };
    const AvatarChanged =(e) => {
      setAvatar(e.target.files[0]);
        setPrevAvatarImage(URL.createObjectURL(e.target.files[0]));
    }
  
    const updateUser = () => {
     const uploadData = new FormData();
     cover && uploadData.append("cover_image", cover);
      avatar && uploadData.append("avatar", avatar);
      uploadData.append("bio", bio);
      uploadData.append("nickname", nickname);
      dispatch(userEdit(user.username,  uploadData));
    };
    return (
      <div
        className="modal fade"
        id={`${modalId}`}
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered " role="document">
          <div className="modal-content modal-custom-css">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">
                Edit Profile
              </h5>
            </div>
            <div id="modalId" className="modal-body custom-modal-body">
              <div style={{ position: "relative" }}>
             
                <input
                  onChange={imageChanged}
                  ref={inputOpenFileRef}
                  type="file"
                  style={{ display: "none" }}
                />
                <img
                  onClick={()=>showOpenFileDlg()}
                  src={prevCoverImage?prevCoverImage:user?.cover_image}
                  alt="cover"
                  className="cover-edit"
                  data-toggle="tooltip" title="Change Cover Image" data-placement="bottom"
                />
                    <input
                  onChange={AvatarChanged}
                  ref={inputAvatarFileRef}
                  type="file"
                  style={{ display: "none" }}
                />
                <img
                onClick={()=>showAvatarFileDlg()}
                  src={prevAvatarImage?prevAvatarImage:user?.avatar}
                  alt="profile "
                  className="rounded-circle profile-image"
                  data-toggle="tooltip" title="Change Profile Image" data-placement="bottom"
                />
              </div>
              <div style={{ marginTop: "9%" }}>
             
                <input
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  type="text"
                  name="text"
                  placeholder="Add nickname"
                  className="inputTag"
                />
             
                <br />
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  type="text"
                  name="text"
                  placeholder="nickname"
                  className="inputTag"
                ></textarea>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-outline-danger"
                data-dismiss="modal"
                onClick={()=>{
                  setPrevCoverImage('');
                  setPrevAvatarImage('');
                }}
              >
                Cancel
              </button>
              <button
                onClick={updateUser}
                type="button"
                data-dismiss="modal"
                className="btn btn-outline-success"
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };
  export default UserEditModal;