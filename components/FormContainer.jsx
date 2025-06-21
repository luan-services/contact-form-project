import React from "react"
import ContactForm from "./ContactForm"
import { useState } from "react";
import {imgsSrc} from "../objects/imgsSrc"

const FormContainer = () => {
    
    const [success, setSuccess] = useState(false);
    const [toastClasses, setToastClasses] = useState("");


    const handleSuccess = () => {
        setSuccess(true)

        setTimeout(() => {
            setToastClasses(true)
            setTimeout(() => {
                setToastClasses(false)
                setSuccess(false)
            }, 3000);
        }, 3000);
    };
    

    return (
        <div className="w-full flex flex-wrap justify-center min-h-screen items-center py-20 px-2 gap-4 md:px-10">
            
            {success && 
			<div className={`flex w-full max-w-160 bg-custom-green-600 p-3 font-medium justify-start gap-6 items-center ${toastClasses ? "opacity-0 transition duration-1000" : ""}`}>
              <img src={imgsSrc.iconSuccessCheck} alt="Success Icon" className="w-4 h-4" />
						  <span className="text-custom-white font-karla">Your message has been sent successfully!</span> 
			</div>}

            <ContactForm handleSuccess={() => handleSuccess()} />
        </div>
    )
}

export default FormContainer
