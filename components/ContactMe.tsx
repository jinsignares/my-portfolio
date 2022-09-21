import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { PhoneIcon, MapPinIcon, EnvelopeIcon } from '@heroicons/react/24/solid'
import { useForm, SubmitHandler } from 'react-hook-form'
import { PageInfo } from '../typings'
import { fetchEmail } from '../utils/fetchEmail'

type Inputs = {
    name: string,
    email: string,
    subject: string,
    message: string,
}

type Props = {
    pageInfo: PageInfo
}

function ContactMe({ pageInfo }: Props) {
    const [visible, setVisible] = useState(false)
    const { register, handleSubmit, reset } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = (formData) => {
        fetchEmail(formData)
        reset()
        setVisible(true)
        setTimeout(() => {
            setVisible(false)
        }, 2000);
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className='h-screen flex relative overflow-hidden flex-col md:text-left text-center md:flex-row max-x-7xl px-10 mx-auto justify-center items-center'>
            <h3 className='absolute top-24 uppercase tracking-[20px] text-gray-500 text-lg md:text-2xl'>Contact Me</h3>

            <div className='mt-40 w-full flex flex-col space-y-4 md:space-y-10'>
                <div className='space-y-4 md:space-y-8'>
                    <a href='tel:+57 300 660 2179' className="flex items-center space-x-5 justify-start md:justify-center cursor-pointer w-full" >
                        <PhoneIcon className='text-blue-400 h-7 w-7 animate-pulse' />
                        <p className='text-xs md:text-xl'>{pageInfo.phoneNumber}</p>
                    </a>
                    <a href='mailto:judaingo@gmail.com' className="flex items-center space-x-5 justify-start md:justify-center cursor-pointer w-full" >

                        <EnvelopeIcon className='text-blue-400 h-7 w-7 animate-pulse' />
                        <p className='text-xs md:text-xl'>{pageInfo.email}</p>
                    </a>
                    <div className="flex items-center space-x-5 justify-start md:justify-center w-full" >
                        <MapPinIcon className='text-blue-400 h-7 w-7 animate-pulse' />
                        <p className='text-xs md:text-xl text-left md:text-center'>{pageInfo.address}</p>
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
                        placeholder='Message' {...register('message')} className='contactInput resize-none' />
                    <button className='bg-blue-400 py-3 px-2 md:py-5 md:px-10 rounded-md text-gray-100 font-bold outline-none hover:bg-blue-300 hover:text-gray-200 transition-colors duration-300'>Submit</button>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: visible ? 1 : 0}}
                        transition={{ duration: 1.0 }}
                        exit={{ opacity: 0 }}
                    >
                        Thanks for Reaching out!
                    </motion.p>
                </form>
            </div>
        </motion.div>
    )
}

export default ContactMe