/* eslint-disable react/prop-types */
import '../style/Forms.css'
import EducationForm from './EducationForm'

function EducationInfo( { data, onChangeData } ) {
  const handleAddEducationClick = (event) =>{
        event.preventDefault();

        const educationObject = {
            university: '',
            degree: '',
            startDate: '',
            endDate: ''
        }

        const newCvData = {
            generalInfo:{
                firstName: data.generalInfo.firstName,
                lastName: data.generalInfo.lastName,
                mobile: data.generalInfo.mobile,
                address: data.generalInfo.address,
                email: data.generalInfo.email
            },
            education: data.education,
            employment: data.employment
        }

        newCvData.education.push(educationObject);

        onChangeData(newCvData);
  };

  return (
    <>
        <div className='cvItem'>
          <h2>Education</h2>
          <div className='educationContainer' id='educationFormContainer'>
            {data.education.map((currentEduation, index) => (
                <EducationForm data = {data} index = {index} onChangeData = { onChangeData } key = {index}></EducationForm>
            ))}
          </div>
          <button className='addButton' onClick={ handleAddEducationClick } >
              Add
          </button>
        </div>
    </>
  )
}

export default EducationInfo