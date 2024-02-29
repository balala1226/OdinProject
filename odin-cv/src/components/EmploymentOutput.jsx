/* eslint-disable react/prop-types */
import '../style/OutputCV.css'

function EmploymentOutput({employment}) {
  return (
    <>
      <div className='employmentOutput'>
        <p className='sectionItemTitle'>{employment.company}</p>
        <p className='sectionItemBody'>{employment.position}</p>
        <p className='sectionItemBody'>{employment.startDate ? employment.startDate+" to "+ employment.endDate:''} </p>
        <p className='sectionItemBody'>{employment.responsibility}</p>
      </div>
    </>
  )
}

export default EmploymentOutput
