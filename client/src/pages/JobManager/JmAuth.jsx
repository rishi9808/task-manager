import { useState } from 'react';
import { JmRegister } from '../../Components/JobManager/JmRegister.jsx';
import { JmLogin } from '../../Components/JobManager/JmLogin.jsx';
import NavbarJm from '../../Components/JobManager/NavbarJm';

function JmAuth() {
    const [isInReg,setisReg]=useState(false);
    function RegOrLog(){
        setisReg(!isInReg);
    }
    return (
        <div>
            <NavbarJm N_ToS={true} style={{display:'flex'}} />
            <div className='twoforms'>
                {isInReg?<JmRegister RegOrLog={RegOrLog} />:<JmLogin RegOrLog={RegOrLog}/>}
            </div>
            
        </div>
    )
}

export default JmAuth;
