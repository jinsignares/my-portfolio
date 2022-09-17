import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

type Props = {
    directionLeft?: boolean;
}

function Skill({ directionLeft }: Props) {
    return (
        <motion.div
            initial={{
                x: directionLeft ? -200 : 200,
                opacity: 0
            }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="border border-gray-500 relative overflow-hidden w-24 xl:w-32 h-24 xl:h-32 rounded-full cursor-pointer">
            <div className="flex object-cover filter hover:grayscale transition duration-300 ease-in-out ">
                <Image src='https://www.freepnglogos.com/uploads/javascript-png/javascript-vector-logo-yellow-png-transparent-javascript-vector-12.png'
                    layout='fill' alt="logo" />
            </div>
            <div className='absolute opacity-0 hover:opacity-80 transition duration-300 ease-in-out hover:bg-white w-24 xl:w-32 h-24 xl:h-32 rounded-full z-0'>
                <div className='flex items-center justify-center h-full'>
                    <p className='text-3xl font-bold text-black opacity-100'>100%</p>
                </div>
            </div>
        </motion.div>
    )
}

export default Skill