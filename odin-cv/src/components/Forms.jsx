/* eslint-disable react/prop-types */
import '../style/Forms.css'
import GenerealInfo from './GenerealInfo'
import EducationInfo from './EducationInfo';
import EmploymentInfo from './EmploymentInfo';

function Forms( { data, onChangeData } ) {
  return (
    <>
      <div className='formContainer'>
        <GenerealInfo data = {data} onChangeData = { onChangeData }></GenerealInfo>
        <EducationInfo data = {data} onChangeData = { onChangeData }></EducationInfo>
        <EmploymentInfo data = {data} onChangeData = { onChangeData }></EmploymentInfo>
      </div>
    </>
  )
}

export default Forms