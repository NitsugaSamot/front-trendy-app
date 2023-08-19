
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth"
import Alerta from "../Alerta/Alerta";

const EditProfile = () => {

  const {auth} = useAuth()
  const [profile, setProfile] = useState({})
  const [alerta, setAlerta] = useState({})

  useEffect(() => {
    setProfile(auth)
  }, [auth])

  // console.log(auth);

  // console.log(profile)

  const handleSubmit = e => {
    e.preventDefault()

    const {name, email} = profile

    if([name, email].includes('')){
      setAlerta({
        msg: 'Los campos no se pueden guardar vacíos',
        error: true
      })
      return
    }

  }

  const { msg } = alerta

  return (
    <>
      <div>
        {msg && <Alerta alerta={alerta} />}
        <form onSubmit={handleSubmit}>
          <div>
                <label htmlFor="name">Name</label>

                <input 
                  type='text'
                  className=''
                  name='name'
                  value={profile.name || ''}
                  onChange={ e => setProfile({
                      ...profile,
                      [e.target.name] : e.target.value
                  })}
                />
          </div>

          <div>
                <label htmlFor="name">Email</label>
                
                <input 
                  type='email'
                  className=''
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
      </div>
    </>
  )
}

export default EditProfile