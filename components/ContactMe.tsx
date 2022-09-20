import React from 'react'
import { motion } from 'framer-motion'
import { PhoneIcon, MapPinIcon, EnvelopeIcon } from '@heroicons/react/24/solid'
import { useForm, SubmitHandler } from 'react-hook-form'

type Inputs = {
    name: string,
    email: string,
    subject: string,
    message: string,
}

type Props = {}

function ContactMe({ }: Props) {
    const { register, handleSubmit } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = (formData) => {
        window.location.href = `mailto:judaingo@gmail.com?subject=${formData.subject}&body=Hi my name is ${formData.name}, ${formData.message}`;
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className='h-screen flex relative overflow-hidden flex-col md:text-left text-center md:flex-row max-x-7xl px-10 mx-auto justify-evenly items-center'>
            <h3 className='absolute top-24 uppercase tracking-[20px] text-gray-500 text-lg md:text-2xl'>Get in touch</h3>

            <div className='mt-48 flex flex-col space-y-10'>
                <h4 className='md:text-4xl font-semibold text-center'>
                    I have got just what you need.{" "}
                    <span className='underline decoration-blue-400/50'>Lets. Talk.</span>
                </h4>
                <div className='space-y-4 md:space-y-10'>
                    <a href='tel:+57 300 660 2179' className="flex items-center space-x-5 justify-start md:justify-center cursor-pointer w-full" >
                        <PhoneIcon className='text-blue-400 h-7 w-7 animate-pulse' />
                        <p className='text-xs md:text-2xl'>+57 300 660 2179</p>
                    </a>
                    <a href='mailto:judaingo@gmail.com' className="flex items-center space-x-5 justify-start md:justify-center cursor-pointer w-full" >

                        <EnvelopeIcon className='text-blue-400 h-7 w-7 animate-pulse' />
                        <p className='text-xs md:text-2xl'>judaingo@gmail.com</p>
                    </a>
                    <div className="flex items-center space-x-5 justify-start md:justify-center cursor-pointer w-full" >
                        <MapPinIcon className='text-blue-400 h-7 w-7 animate-pulse' />
                        <p className='text-xs md:text-2xl text-left md:text-center'>Cra 56 # 70 - 60, Barranquilla, Colombia</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col space-y-2 w-full md:w-fit mx-auto'>
                    <div className='flex space-y-2 md:space-y-0 md:space-x-2 md:flex-row flex-col'>
                        <input {...register('name')} placeholder='Name' type="text" className='contactInput' />
                        <input {...register('email')} type="email"
                            placeholder='Email'
                            className='contactInput' />
                    </div>
                    <input {...register('subject')} type="text"
                        placeholder='Subject'
                        className='contactInput' />
                    <textarea
                        placeholder='Message' {...register('message')} className='contactInput' />
                    <button className='bg-blue-400 py-3 px-2 md:py-5 md:px-10 rounded-md text-gray-100 font-bold outline-none hover:bg-blue-300 hover:text-gray-200 transition-colors duration-300'>Submit</button>
                </form>
            </div>
        </motion.div>
    )
}

export default ContactMe