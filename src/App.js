import { useEffect, useState } from 'react'
import './App.css'
import Dashboard from './components/Dashboard';
import { config } from './config';


function App() {

  const [userData, setUserData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  
  useEffect(() => {
    apiCall();
  }, [])

  const apiCall = async () => {
    try {
      const response = await fetch(config['Endpoint']);
      let userData = await response.json();
      userData = userData.map(user => {
        return {
          ...user,
          isEdit: false,
        }
      }
      )
      // userData = userData.concat(userData);
      setUserData(userData);
      setOriginalData(userData)
      return userData;
    } catch (error) {
      console.error('An error occurred:', error.message);
    }

  }


  const handleEdit = (user) => {
    const nUserDetails = [...userData];
    const userIdx = nUserDetails.indexOf(user);
    nUserDetails[userIdx].isEdit = true;
    setUserData(nUserDetails);
  };

  const handleEditValues = (user, editedValues) => {
    const nUserDetails = [...userData];
    const userIdx = nUserDetails.indexOf(user);
    if (editedValues['name']) {
      nUserDetails[userIdx].name = editedValues.name;
    }
    if (editedValues['email']) {
      nUserDetails[userIdx].email = editedValues.email;
    }
    if (editedValues['role']) {
      nUserDetails[userIdx].role = editedValues.role;
    }
    nUserDetails[userIdx].isEdit = false;
    setUserData(nUserDetails);
  };



  return (
    <>
      <main>
        <div className='section-title'>
          <h1>Admin UI</h1>
        </div>
        <Dashboard
          userData={userData}
          setUserData={setUserData}
          originalData={originalData}
          setOriginalData={setOriginalData}
          handleEdit={handleEdit}
          handleEditValues={handleEditValues}
        />
      </main>
    </>
  )
}

export default App
