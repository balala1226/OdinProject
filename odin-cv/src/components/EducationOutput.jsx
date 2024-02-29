/* eslint-disable react/prop-types */
import '../style/OutputCV.css'

function EducationOutput({education}) {
  return (
    <>
      <div className='employmentOutput'>
        <p className='sectionItemTitle'>{education.university}</p>
        <p className='sectionItemBody'>{education.degree}</p>
        <p className='sectionItemBody'>{education.startDate ? education.startDate+" to "+ education.endDate:''} </p>
      </div>
    </>
  )
}

export default EducationOutput
