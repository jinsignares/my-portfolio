import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Skill } from '../typings';
import { urlFor } from '../sanity';

type Props = {
    skill: Skill;
}

function Skill({ skill }: Props) {
    return (
        <motion.div
            initial={{
                opacity: 0
            }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className='flex flex-col items-center justify-center space-y-2'
        >
            <div className="border border-gray-500 bg-white relative overflow-hidden w-14 h-14 md:w-20 xl:w-24 md:h-20 xl:h-24 rounded-md">
                <Image src={urlFor(skill?.image).url()}
                    layout='fill' alt={skill?.title} objectFit="contain" />
            </div>
            <p className='text-white text-xs'>{skill.title}</p>
        </motion.div>
    )
}

export default Skill