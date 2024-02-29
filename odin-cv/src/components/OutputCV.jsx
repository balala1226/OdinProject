/* eslint-disable react/prop-types */
import '../style/OutputCV.css'
import EducationOutput from './EducationOutput'
import EmploymentOutput from './EmploymentOutput'
import { flexDisplay,noneDisplay } from '../helper/styleHelper'

import Icon from '@mdi/react';
import { mdiCrosshairsGps } from '@mdi/js';
import { mdiPhone } from '@mdi/js';
import { mdiEmail } from '@mdi/js';

function OutputCV({data}) {
  return (
    <>
      <div className='cvContainer'>
        <div className='cvHeader'>
            <h2>{data.generalInfo.firstName} {data.generalInfo.lastName}</h2>
            <div className='cvOutputHeaderInfo'>
              <div className='cvOutputHeaderItem' style={data.generalInfo.address == '' ? noneDisplay:flexDisplay}>
                <Icon path={mdiCrosshairsGps} size={1} />
                <p className='sectionHeader'>{data.generalInfo.address}</p>
              </div>
              
              <div className='cvOutputHeaderItem' style={data.generalInfo.mobile == '' ? noneDisplay:flexDisplay}>
                <Icon path={mdiPhone} size={1} />
                <p className='sectionHeader'>{data.generalInfo.mobile}</p>
              </div>
              
              <div className='cvOutputHeaderItem' style={data.generalInfo.email == '' ? noneDisplay:flexDisplay}>
                <Icon path={mdiEmail} size={1} />
                <p className='sectionHeader'>{data.generalInfo.email}</p>
              </div>
            </div>
        </div>
        <div className='cvContent'>
            <div className='outputContainer'>
              <p className='sectionHeader'>{data.education.length > 0 ? 'Education' : ''}</p>
              {data.education.map((currentEduation, index) => (
                  <EducationOutput education = {currentEduation} key={index}></EducationOutput>
              ))}
            </div>
            <div className='outputContainer'>
            <p className='sectionHeader'>{data.employment.length > 0 ? 'Employment' : ''}</p>
              {data.employment.map((currentEmployment, index) => (
                  <EmploymentOutput employment = {currentEmployment} key={index}></EmploymentOutput>
              ))}
            </div>
        </div>
      </div>
    </>
  )
}

export default OutputCV
