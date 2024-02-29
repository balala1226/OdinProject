import { useState } from 'react'
import '../style/App.css'
import Forms from './Forms.jsx'
import OutputCV from './OutputCV.jsx'

function App() {
  const cvData = {
    generalInfo:{
      firstName: '',
      lastName: '',
      address: '',
      mobile: '',
      email: ''
    },
    education: [],
    employment: []
  };

  const [newCvData, setData] = useState(cvData);

  return (
    <>
      <Forms data={ newCvData } onChangeData = {setData}/>
      <OutputCV data={ newCvData }/>
    </>
  )
}

export default App
