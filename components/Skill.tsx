import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Skill } from '../typings';
import { urlFor } from '../sanity';

type Props = {
    directionLeft?: boolean;
    skill: Skill;
}

function Skill({ directionLeft, skill }: Props) {
    return (
        <motion.div
            initial={{
                x: directionLeft ? -200 : 200,
                opacity: 0
            }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="border border-gray-500 relative overflow-hidden w-14 h-14 md:w-20 xl:w-24 md:h-20 xl:h-24 rounded-full cursor-pointer">
            <div className="flex object-cover filter hover:grayscale transition duration-300 ease-in-ou">
                <Image src={urlFor(skill?.image).url()}
                    layout='fill' alt={skill?.title} objectFit="contain" />
            </div>
            <div className='hidden md:flex absolute opacity-0 hover:opacity-80 transition duration-300 ease-in-out hover:bg-white w-14 h-14 md:w-20 xl:w-24 md:h-20 xl:h-24 rounded-full z-0'>
                <div className='flex items-center justify-center h-full w-full'>
                    <p className='text-3xl font-bold text-black opacity-100'>{skill?.progress}%</p>
                </div>
            </div>
        </motion.div>
    )
}

export default Skill