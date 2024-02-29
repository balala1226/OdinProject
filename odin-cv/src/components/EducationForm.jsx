/* eslint-disable react/prop-types */
import { useState } from 'react'
import '../style/Forms.css'
import { flexDisplay,blockDisplay,noneDisplay,defaultInputFormStyle,disabledInputFormStyle } from '../helper/styleHelper'

function EducationForm( { data, index, onChangeData } ) {
    const [university, setUniversity] = useState(data.education[index] ? data.education[index].university : '');
    const [degree, setDegree] = useState(data.education[index] ? data.education[index].degree : '');
    const [startDate, setStartDate] = useState(data.education[index] ? data.education[index].startDate : '');
    const [endDate, setEndDate] = useState(data.education[index] ? data.education[index].endDate : '');

    const [isInputReadonly, setIsInputReadonly] = useState(false);
    const [inputFormStyle, setInputFormStyle] = useState(defaultInputFormStyle);
  
    const [editButtonDisplay,setEditButtonDisplay] = useState(noneDisplay);
    const [submitButtonDisplay,setSubmitButtonDisplay] = useState(blockDisplay);

    const [thisFormDisplay, setThisFormDisplay] = useState(flexDisplay)

    const handleEditClick = (event) =>{
        event.preventDefault();

        setIsInputReadonly(false);
        setInputFormStyle(defaultInputFormStyle);

        setEditButtonDisplay(noneDisplay);
        setSubmitButtonDisplay(blockDisplay);
    };
      
    const handleConfirmEdit = (event) =>{
        event.preventDefault();

        const educationObject = {
            university: university,
            degree: degree,
            startDate: startDate,
            endDate: endDate
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

        newCvData.education[index] = educationObject;
        
        onChangeData(newCvData);

        setIsInputReadonly(true);
        setInputFormStyle(disabledInputFormStyle);
    
        setEditButtonDisplay(blockDisplay);
        setSubmitButtonDisplay(noneDisplay);
    };
    
    const handleCancelEdit = (event) =>{
        event.preventDefault();

        setIsInputReadonly(true);
        setInputFormStyle(disabledInputFormStyle);

        setEditButtonDisplay(blockDisplay);
        setSubmitButtonDisplay(noneDisplay);

        if (data.education[index].university == '') {
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
            newCvData.education.splice(index,1);
            onChangeData(newCvData);

            setThisFormDisplay(noneDisplay);
        }
    };
    
    return (
    <>
        <form action="" className="form" onSubmit={ handleConfirmEdit } style={thisFormDisplay} >
            <div className='formItem'>
                <label htmlFor="university">University:</label>
                    <input className='inputForm' type="text" name="university"       
                    onChange={(event) =>
                        setUniversity(event.target.value)
                    }
                    readOnly={isInputReadonly} style={inputFormStyle} value={university} required></input>
            </div>
            <div className='formItem'>
                <label htmlFor="degree">Degree:</label>
                    <input className='inputForm' type="text" name="degree"       
                    onChange={(event) =>
                        setDegree(event.target.value)
                    }
                    readOnly={isInputReadonly} style={inputFormStyle} value={degree} required></input>
            </div>
            <div className='formItem'>
                <label htmlFor="startDate">Start Date:</label>
                    <input className='inputForm' type="date" name="startDate"       
                    onChange={(event) =>
                        setStartDate(event.target.value)
                    }
                    readOnly={isInputReadonly} style={inputFormStyle} value={startDate} required></input>
            </div>
            <div className='formItem'>
                <label htmlFor="endDate">End Date:</label>
                    <input className='inputForm' type="date" name="endDate"       
                    onChange={(event) =>
                        setEndDate(event.target.value)
                    }
                    readOnly={isInputReadonly} style={inputFormStyle} value={endDate} required></input>
            </div>
            <div className='formButtons'>
                    <button className='confirmButton' onClick={ handleEditClick } style={editButtonDisplay} >
                        Edit
                    </button>
                    <button className='cancelButton' onClick={ handleCancelEdit } style={submitButtonDisplay} >
                        Cancel
                    </button>
                    <input className='confirmButton inputButton' type="submit" value="Submit" style={submitButtonDisplay} >
                    </input>
            </div>
        </form>
    </>
    )
}

export default EducationForm
