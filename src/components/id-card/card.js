import React from 'react';
import "./card.css";
const Card = (props) => {

    const {name, dob, phone, email, image, nationality, showInputName, showInputDob, showInputPhone, showInputEmail, showInputNationality, onClick, onChange, onKeyChange, idCardNumber } = props;
    
    return (  
        <div className="id-card" >
            <div className="card-header">
                <span>Student ID Card</span>
            </div>
            <div className="card-body">
                <div className="card-body-left">
                    <div className="card-body-left-info">
                        <div className="card-info-field" onClick={()=>onClick('name')}>
                            <span className="tb">Name</span>
                            {!showInputName ? <span>{name}</span> : <input type="text" name="name" onKeyPress={(e)=>onKeyChange(e)} onChange={(e)=>onChange(e)}/>}
                        </div>
                        <div className="card-info-field" onClick={()=>onClick('dob')}>
                            <span className="tb">DOB</span>
                            {!showInputDob ? <span>{dob}</span> : <input type="text" name="dob" onKeyPress={(e)=>onKeyChange(e)} onChange={(e)=>onChange(e)}/>}
                        </div>
                        <div className="card-info-field" onClick={()=>onClick('phone')}>
                            <span className="tb">Phone</span>
                            {!showInputPhone ? <span>{phone}</span> : <input type="number" name="phone" onKeyPress={(e)=>onKeyChange(e)} onChange={(e)=>onChange(e)}/>}
                        </div>
                        <div className="card-info-field" onClick={()=>onClick('email')}>
                            <span className="tb">Email</span>
                            {!showInputEmail ? <span>{email}</span> : <input type="email" name="email" onKeyPress={(e)=>onKeyChange(e)} onChange={(e)=>onChange(e)}/>}
                        </div>                  
                        <div className="card-info-field" onClick={()=>onClick('nationality')}>
                            <span className="tb">Nationality</span>
                            {!showInputNationality ? <span>{nationality}</span> : <input type="text" name="nationality" onKeyPress={(e)=>onKeyChange(e)} onChange={(e)=>onChange(e)}/>}
                        </div>                  
                    </div>
                </div>
                <div className="card-body-right">
                    {image? <img alt="id-card-img" src={image} style={{height: 150, width:150}}/>:<img alt="id-card-img" src={require("../../assets/images/user.jpeg")} style={{height: 150, width:150}}/>}
                    <span className="text-sign">{name.split(" ")[0]}...</span>
                </div>
            </div>
            <div className="card-footer">
                <span>FAKE ID GENERATOR &copy; {idCardNumber}</span>
            </div>
        </div>
    );
}
 
export default Card;