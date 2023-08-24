import { useEffect, useState } from "react";
import ProfileNav from "./profileNav";
import Alert from "../alert/alert";
import useAuth from "../../contextClient/hooks/useAuth";
import Purchases from "./purchases";
import './profileStyles.css'

const EditProfile = () => {

  const {auth, updateProfile} = useAuth()
  const [profile, setProfile] = useState({})
  const [alerta, setAlerta] = useState({})

  useEffect(() => {
    setProfile(auth)
  }, [auth])

  // console.log(auth);

  // console.log(profile)

  const handleSubmit = async e => {
    e.preventDefault()

    const {name, email} = profile

    if([name, email].includes('')){
      setAlerta({
        msg: 'Los campos no se pueden guardar vacíos',
        error: true
      })
      return
    }

    const result = await updateProfile(profile)

    setAlerta(result)



    // updateProfile(profile)

  }

  const { msg } = alerta

  return (
    <>
      <div className="mainContainer">


      <ProfileNav/>

        {msg && <Alert alerta={alerta} />}
        <form className="profileForm" onSubmit={handleSubmit}>
          <div className="column">
                <label className="label" htmlFor="name">Name</label>

                <input 
                  type='text'
                  className='inputProfile'
                  name='name'
                  value={profile.name || ''}
                  onChange={ e => setProfile({
                      ...profile,
                      [e.target.name] : e.target.value
                  })}
                />
          </div>

          <div className="column">
                <label className="label" htmlFor="name">Email</label>
                
                <input 
                  type='email'
                  className='inputProfile'
                  name='email'
                  value={profile.email || ''}
                  onChange={ e => setProfile({
                      ...profile,
                      [e.target.name] : e.target.value
                  })}
                />
          </div>


          <input 
              type="submit" 
              value='Save Changues'
              className='btnEditProfile'    
          />

        </form>

        <div className="purchases">
          <span>Thank you for your buy's</span>
          <Purchases/>
        </div>
      </div>
    </>
  )
}

export default EditProfile