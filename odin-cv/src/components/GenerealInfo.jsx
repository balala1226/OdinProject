/* eslint-disable react/prop-types */
import { useState } from 'react'
import '../style/Forms.css'
import { blockDisplay,noneDisplay,defaultInputFormStyle,disabledInputFormStyle } from '../helper/styleHelper'

function GenerealInfo( { data, onChangeData } ) {
  const [firstName, setFirstName] = useState(data.generalInfo.firstName);
  const [lastName, setLastName] = useState(data.generalInfo.lastName);
  const [address, setAddress] = useState(data.generalInfo.address);
  const [mobileNumber, setMobileNumber] = useState(data.generalInfo.mobile);
  const [email, setEmail] = useState(data.generalInfo.email);

  const [isInputReadonly, setIsInputReadonly] = useState(false);
  const [inputFormStyle, setInputFormStyle] = useState(defaultInputFormStyle);

  const [editButtonDisplay,setEditButtonDisplay] = useState(noneDisplay);
  const [submitButtonDisplay,setSubmitButtonDisplay] = useState(blockDisplay);

  const handleEditClick = (event) =>{
    event.preventDefault();

    setIsInputReadonly(false);
    setInputFormStyle(defaultInputFormStyle);

    setEditButtonDisplay(noneDisplay);
    setSubmitButtonDisplay(blockDisplay);
  };
  
  const handleConfirmEdit = (event) =>{
    event.preventDefault();

    const newCvData = {
      generalInfo:{
        firstName: firstName,
        lastName: lastName,
        mobile: mobileNumber,
        address: address,
        email: email
      },
      education: data.education,
      employment: data.employment
    }

    onChangeData(newCvData);

    setIsInputReadonly(true);
    setInputFormStyle(disabledInputFormStyle);

    setEditButtonDisplay(blockDisplay);
    setSubmitButtonDisplay(noneDisplay);
  };

  const handleCancelEdit = (event) =>{
    event.preventDefault();

    setFirstName(data.generalInfo.firstName);
    setLastName(data.generalInfo.lastName);
    setAddress(data.generalInfo.address);
    setMobileNumber(data.generalInfo.mobile);
    setEmail(data.generalInfo.email);

    setIsInputReadonly(true);
    setInputFormStyle(disabledInputFormStyle);

    setEditButtonDisplay(blockDisplay);
    setSubmitButtonDisplay(noneDisplay);
  };

  return (
    <>
        <div className='cvItem'>
            <h2>General Information</h2>
            <form action="" className="form" onSubmit={ handleConfirmEdit }>
                <div className='formItem'>
                    <label htmlFor="firstName">First Name:</label>
                    <input className='inputForm' type="text" id="firstName" name="firstName"       
                    onChange={(event) =>
                        setFirstName(event.target.value)
                    }
                    readOnly={isInputReadonly} style={inputFormStyle} value={firstName} required></input>
                </div>
                <div className='formItem'>
                    <label htmlFor="lastName">Last Name:</label>
                    <input className='inputForm' type="text" id="lastName" name="lastName"     
                    onChange={(event) =>
                        setLastName(event.target.value)
                    }
                    readOnly={isInputReadonly} style={inputFormStyle} value={lastName} required></input>
                </div>
                <div className='formItem'>
                    <label htmlFor="address">Address:</label>
                    <input className='inputForm' type="text" id="address" name="address"     
                    onChange={(event) =>
                        setAddress(event.target.value)
                    }
                    readOnly={isInputReadonly} style={inputFormStyle} value={address} required></input>
                </div>
                <div className='formItem'>
                    <label htmlFor="phone">Mobile Number:</label>
                    <input className='inputForm' type="num" id="phone" name="phonenum"
                        // pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                        onChange={(event) =>
                            setMobileNumber(event.target.value)
                        }
                        readOnly={isInputReadonly} style={inputFormStyle} value={mobileNumber} required></input>
                </div>
                <div className='formItem'>
                    <label htmlFor="email">Email:</label>
                    <input className='inputForm' type="email" id="email" name="email"
                        pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
                        onChange={(event) =>
                            setEmail(event.target.value)
                        }
                        readOnly={isInputReadonly} style={inputFormStyle} value={email} required>
                    </input>
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
        </div>
    </>
  )
}

export default GenerealInfo
