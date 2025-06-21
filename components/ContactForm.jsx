import { useState } from 'react';
import {imgsSrc} from "../objects/imgsSrc"
import SubmitBtn from './SubmitBtn';

export default function ContactForm(props) {

	const [formData, setFormData] = useState({first_name: '', last_name: '', email: '', query_type: '', message: '', consent: false,});

	const [errors, setErrors] = useState({});

	const handleChange = (e) => {
		const { name, value, type, checked } = e.target;

		setFormData({
			...formData, [name]: type === 'checkbox' ? checked : value,
		});
	};

	const validate = () => {
		const newErrors = {};
		if (!formData.first_name.trim()) newErrors.first_name = 'First name is required';
		if (!formData.last_name.trim()) newErrors.last_name = 'Last name is required';
		if (!formData.email.trim()){ 
			newErrors.email = 'Email is required';
		} else {
			if (!validateEmail(formData.email)) newErrors.email = 'Please enter a valid email';
		}
		if (!formData.query_type) newErrors.query_type = 'Select a query type';
		if (!formData.message.trim()) newErrors.message = 'Message is required';
		if (!formData.consent) newErrors.consent = 'You must consent to be contacted';

		return newErrors;
	};

	const validateEmail = (email) => {
		const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return regex.test(email);
	};


	const handleSubmit = async (e) => {
		e.preventDefault();

		const validationErrors = validate();
		// run the function to check for validation errors
		setErrors(validationErrors);
		// set erros useStates if exist (they'll pop up some text)

		if (Object.keys(validationErrors).length > 0) {
		return; // if any error, stop
		}


		// make a payload object
		const payload = {
		...formData,
		access_key: 'MY KEY', // Replace with Web3Forms key
		};

		// try to send to the web3forms api
		const res = await fetch('https://api.web3forms.com/submit', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(payload),
		});

		// wait for response and check success, clean the errors and form data if success, if not, show alert
		const result = await res.json();
		if (result.success) {
		props.handleSuccess()
		setFormData({
			first_name: '',
			last_name: '',
			email: '',
			query_type: '',
			message: '',
			consent: false,
		});
		setErrors({});
		} else {
		alert(result.message);
		}
	};

  return (
    <section className="flex w-full items-center justify-center ">
      	<form noValidate onSubmit={handleSubmit} className="flex flex-col w-full max-w-160 bg-custom-white p-8 rounded-xl shadow-md gap-4">
        
			<span className="text-3xl font-karla-bold">Contact Us</span>

			<div className="flex flex-col md:flex-row gap-4 w-full">

				<div key="first_name" className="flex flex-col w-full gap-2">
					<div className="flex flex-row justify-between items-center gap-2">
						<label className="flex ">First Name *</label> 
						{errors["first_name"] && <span className="flex  text-red-500 text-sm">{errors["first_name"]}</span>}
					</div>
					
					<input type="text" name="first_name" value={formData["first_name"]} onChange={handleChange} 
						className={`w-full border focus:outline-none rounded p-2 ${ errors["first_name"] ? 'border-red-500' : 'border-gray-300'}`}/>
				</div>

				<div key="last_name" className="flex flex-col w-full gap-2">
					<div className="flex flex-row justify-between items-center gap-2">
						<label className="flex">Last Name *</label> 
						{errors["last_name"] && <span className="flex text-red-500 text-sm">{errors["last_name"]}</span>}
					</div>
					
					<input type="text" name="last_name" value={formData["last_name"]} onChange={handleChange} 
						className={`w-full border focus:outline-none rounded p-2 ${ errors["last_name"] ? 'border-red-500' : 'border-gray-300'}`}/>
				</div>

			</div>

			<div className="flex flex-col w-full gap-2">
				<div className="flex flex-row justify-between items-center gap-2">
					<label className="flex">Email Address *</label>
					{errors.email && <span className="flex text-red-500 text-sm">{errors.email}</span>}
				</div>
				<input type="email" name="email" value={formData.email} onChange={handleChange} 
					className={`w-full border rounded focus:outline-none p-2 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}/>
			</div>

			<div className="flex flex-col w-full gap-2">
				<div className="flex flex-row justify-between items-center gap-2">
					<label className="flex">Query Type *</label>
					{errors.query_type && <span className="flex text-red-500 text-sm">{errors.query_type}</span>}
				</div>

				<div className="flex flex-col md:flex-row justify-between gap-4">

					<label key="General Enquiry" className={`flex w-full items-center gap-2 focus:outline-none border 
						rounded px-3 py-2 ${formData.query_type === "General Enquiry" ? 'border-emerald-600' : 'border-gray-300' }`}>
						<input type="radio" name="query_type" value="General Enquiry" checked={formData.query_type === "General Enquiry"} onChange={handleChange}
							className={`${formData.query_type === "General Enquiry" ? "hidden" : "mr-0.75"}`}/>
						<img src={imgsSrc.iconRadio} alt="Selected" className={`w-4 h-4 ${formData.query_type === "General Enquiry" ? "" : "hidden"}`} />
						<span className="">General Enquiry</span>
					</label>

					<label key="Support Request" className={`flex w-full items-center gap-2 focus:outline-none border 
						rounded px-3 py-2 ${formData.query_type === "Support Request" ? 'border-emerald-600' : 'border-gray-300' }`}>
						<input type="radio" name="query_type" value="Support Request" checked={formData.query_type === "Support Request"} onChange={handleChange}
							className={`${formData.query_type === "Support Request" ? "hidden" : "mr-0.75"}`}/>
						<img src={imgsSrc.iconRadio} alt="Selected" className={`w-4 h-4 ${formData.query_type === "Support Request" ? "" : "hidden"}`} />
						<span className="">Support Request</span>
					</label>

				</div>

			</div>

			<div className="flex flex-col w-full gap-2">
				<div className="flex flex-row justify-between items-center gap-2">
					<label className="flwx">Message *</label>
					{errors.message && <span className="text-red-500 text-sm">{errors.message}</span>}
				</div>
				<textarea name="message" value={formData.message} onChange={handleChange} rows="4" className={`w-full border focus:outline-none
					 rounded p-2 ${ errors.message ? 'border-red-500' : 'border-gray-300' }`}></textarea>
			</div>

			<div className="flex flex-col gap-1">
				<div className="flex flex-row items-center gap-2">
					<input type="checkbox" name="consent" checked={formData.consent} onChange={handleChange} className="w-3.5 h-3.5 accent-emerald-600 cursor-pointer"/>
					<label>I consent to being contacted by the team *</label>
				</div>

				{errors.consent && <span className="text-red-500 text-sm">{errors.consent}</span>}
			</div>


			<SubmitBtn>Submit</SubmitBtn>


		</form>
    </section>
  );
}