import { useState } from 'react';
import { useFirebase } from '../context/firebase';

const Github = () => {
    const { handleCreateNewListing, getImageUrl } = useFirebase();
    
    const [fullName, setFullName] = useState('');
    const [profilePhoto, setProfilePhoto] = useState(null);
    const [profilePhotoUrl, setProfilePhotoUrl] = useState('');

    const handleProfilePhotoChange = async (e) => {
        const file = e.target.files[0];
        setProfilePhoto(file);
        
        const imageUrl = await getImageUrl(`uploads/images/${Date.now()}-${file.name}`);
        setProfilePhotoUrl(imageUrl);
    };

    const handleSubmit = async () => {
        if (fullName && profilePhoto) {
            await handleCreateNewListing(fullName, 'NA', 'NA', profilePhoto);
            console.log('Profile updated successfully');
        } else {
            console.log('Please fill in all the fields');
        }
    };

    return (
        <div className="github">
            <div className="heading">
                <div className="row ">
                    <div className="col-md-6 ">
                        <h6>winners never quites, quitters never win</h6>
                    </div>
                    <div className="col-md-6">
                        <p>your profile is 64% completed. Complete your profile, it will increase your chances of getting a job</p>
                    </div>
                </div>
                <hr />
            </div>
            <div className="form">
                <h4>Contact detail</h4>
                <div className="input">
                    <div className="row m-2">
                        <div className="col-md-6">
                            Full Name:
                            <input 
                                type="text" 
                                value={fullName} 
                                onChange={(e) => setFullName(e.target.value)} 
                            />
                        </div>
                        <div className="col-md-6">
                            Profile photo url:
                            <input 
                                type="file" 
                                onChange={handleProfilePhotoChange} 
                            />
                            {profilePhotoUrl && <img src={profilePhotoUrl} alt="Profile" style={{ width: '100px', height: '100px', objectFit: 'cover' }} />}
                        </div>
                    </div>
                    <button className="btn btn-success m-3" type="button" onClick={handleSubmit}>Update Profile</button>
                </div>
            </div>
        </div>
    )
}

export default Github;
