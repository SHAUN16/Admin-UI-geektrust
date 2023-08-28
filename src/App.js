import './App.css'
import { useState, useEffect } from 'react';
import { config } from './config';
import Dashboard from './components/Dashboard';


function App() {

  const [userData, setUserData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const apiCall = async () => {
    setLoading(true);
    setError(false);
    try {
      const response = await fetch(config['Endpoint']);
      let userData = await response.json();

      //set the isEdit property of members to false by default and call the function handleEdit to toggle the isEdit property of the member.
      userData = userData.map(user => {
        return {
          ...user,
          isEdit: false,
        }
      }
      )

      setUserData(userData);
      setOriginalData(userData)
      setLoading(false);
      return userData;

    } catch (error) {

      console.error('An error occurred:', error.message);
      setLoading(false);
      setError(true);
      window.alert('Some error occured while trying to fetch data')
    }

  }

  useEffect(() => {
    apiCall();
  }, [])

  // function to enable editing the row data/ toggling the isEdit property of the user
  const handleEdit = (user) => {
    const nUserDetails = [...userData];
    const userIdx = nUserDetails.indexOf(user);
    nUserDetails[userIdx].isEdit = true;
    setUserData(nUserDetails);
  };

  // function to confirm edited values
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
          <h1>{loading ? 'Loading...' : 'Admin UI'}</h1>
        </div>

        {
          error ? (
            <div className='section-error'>
              <h2>
                Some Error occurred while fetching Data !!!
              </h2>
            </div>
          ) : (
            !loading &&
            (
              <Dashboard
                userData={userData}
                setUserData={setUserData}
                originalData={originalData}
                setOriginalData={setOriginalData}
                handleEdit={handleEdit}
                handleEditValues={handleEditValues}
              />
            )
          )
        }
      </main>
    </>
  )
}

export default App
