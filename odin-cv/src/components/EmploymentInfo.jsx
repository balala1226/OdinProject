/* eslint-disable react/prop-types */
import '../style/Forms.css'
import EmploymentForm from './EmploymentForm';

function EmploymentInfo( { data, onChangeData } ) {
  const handleAddEducationClick = (event) =>{
        event.preventDefault();

        const employmentObject = {
            company: '',
            position: '',
            responsibility: '',
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

        newCvData.employment.push(employmentObject);

        onChangeData(newCvData);
  };

  return (
    <>
        <div className='cvItem'>
            <h2>Employment</h2>
            <div className='experienceContainer' id='employmentFormContainer'>
                {data.employment.map((currentEmployment, index) => (
                    <EmploymentForm data = {data} index = {0} onChangeData = { onChangeData } key={index}></EmploymentForm>
                ))}
            </div>
            <button className='addButton' onClick={ handleAddEducationClick } >
                Add
            </button>
        </div>
    </>
  )
}

export default EmploymentInfo