/* eslint-disable react/prop-types */
import { useState } from 'react'
import '../style/Forms.css'
import { flexDisplay,blockDisplay,noneDisplay,defaultInputFormStyle,disabledInputFormStyle } from '../helper/styleHelper'

function EmploymentForm( { data, index, onChangeData } ) {
    const [company, setCompany] = useState(data.employment[index] ? data.employment[index].university : '');
    const [position, setPosition] = useState(data.employment[index] ? data.employment[index].degree : '');
    const [responsibility, setResponsibility] = useState(data.employment[index] ? data.employment[index].degree : '');
    const [startDate, setStartDate] = useState(data.employment[index] ? data.employment[index].startDate : '');
    const [endDate, setEndDate] = useState(data.employment[index] ? data.employment[index].endDate : '');

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

        const employmentObject = {
            company: company,
            position: position,
            responsibility: responsibility,
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

        newCvData.employment[index] = employmentObject;
        
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

        if (data.education[index] == null) {
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
            newCvData.employment.splice(index,1);
            onChangeData(newCvData);

            setThisFormDisplay(noneDisplay);
        }
    };
    
    return (
    <>
        <form action="" className="form" onSubmit={ handleConfirmEdit } style={thisFormDisplay} >
            <div className='formItem'>
                <label htmlFor="company">Company:</label>
                    <input className='inputForm' type="text" name="company"       
                    onChange={(event) =>
                        setCompany(event.target.value)
                    }
                    readOnly={isInputReadonly} style={inputFormStyle} value={company} required></input>
            </div>
            <div className='formItem'>
                <label htmlFor="position">Position:</label>
                    <input className='inputForm' type="text" name="position"       
                    onChange={(event) =>
                        setPosition(event.target.value)
                    }
                    readOnly={isInputReadonly} style={inputFormStyle} value={position} required></input>
            </div>
            <div className='formItem'>
                <label htmlFor="responsibility">Responsibility:</label>
                    <input className='inputForm' type="text" name="responsibility"       
                    onChange={(event) =>
                        setResponsibility(event.target.value)
                    }
                    readOnly={isInputReadonly} style={inputFormStyle} value={responsibility} required></input>
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

export default EmploymentForm
