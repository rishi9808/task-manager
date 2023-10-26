import { useState } from 'react';
import '../../styles/StudentAuth.css';
import { StudentRegister } from '../../Components/Students/StudentRegister';
import { StudentLogin } from '../../Components/Students/StudentLogin';
import Navbar from '../../Components/Students/Navbar';

function StudentAuth() {
    const [isInReg,setisReg]=useState(false);
    function RegOrLog(){
        setisReg(!isInReg);
    }
    return (
        <div>
            <Navbar N_ToJM={true} />
            <div className='twoforms'>
                {isInReg?<StudentRegister RegOrLog={RegOrLog} />:<StudentLogin RegOrLog={RegOrLog}/>}
            </div>
            
        </div>
    )
}

export default StudentAuth;
