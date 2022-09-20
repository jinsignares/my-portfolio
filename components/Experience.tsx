import React from 'react'
import { motion } from 'framer-motion'
import ExperienceCard from './ExperienceCard'
import { Experience } from '../typings'

type Props = {
    experiences: Experience[]
}

function Experience({ experiences }: Props) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className='h-screen flex relative overflow-hidden flex-col text-left md:flex-row max-x-7xl md:px-10 mx-auto justify-evenly items-center'>
            <h3 className='absolute top-24 uppercase tracking-[20px] text-gray-500 text-lg md:text-2xl'>Experience</h3>
            <div className="mt-32 md:mt-20 w-full flex space-x-5 overflow-x-scroll py-10 md:p-10 snap-mandatory snap-x  scrollbar-track-gray-400/20 scrollbar-thumb-blue-400/80 scrollbar-thin">
                {experiences.map((experience) => (
                    <ExperienceCard key={experience?._id} experience={experience} />
                ))}
            </div>
        </motion.div>
    )
}

export default Experience