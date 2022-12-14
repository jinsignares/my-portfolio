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
            className='h-screen flex relative flex-shrink-0 overflow-hidden flex-col text-left md:flex-row max-x-7xl md:px-10 mx-auto justify-between md:justify-center items-center'>
            <h3 className='absolute top-24 uppercase tracking-[20px] text-gray-500 text-lg md:text-2xl'>Experience</h3>
            <div className="mt-40 md:mt-20 w-full flex space-x-5 overflow-x-scroll pb-20 md:p-10 snap-mandatory snap-x px-5 scrollbar-track-gray-400/20 scrollbar-thumb-blue-400/80 scrollbar-thin h-screen md:h-fit items-stretch">
                {experiences.sort((a, b) => new Date(b.dateEnded).valueOf() - new Date(a.dateEnded).valueOf()).map((experience) => (
                    <ExperienceCard key={experience?._id} experience={experience} />
                ))}
            </div>
        </motion.div>
    )
}

export default Experience