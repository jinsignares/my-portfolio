import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Experience } from '../typings'
import { urlFor } from '../sanity'
import { MapPinIcon } from '@heroicons/react/24/solid'

type Props = {
    experience: Experience
}

function ExperienceCard({ experience }: Props) {
    return (
        <article className='flex flex-col rounded-lg items-center justify-start space-y-7 flex-shrink-0 w-[calc(100%-40px)] md:w-[600px] xl:w-[900px] snap-center px-4 py-8 bg-[#292929] transition-opacity duration-200 overflow-hidden opacity-100 md:opacity-40 hover:opacity-100 h-full'>
            <motion.div
                initial={{
                    opacity: 0
                }}
                transition={{ duration: 1.2 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="flex relative rounded-lg overflow-hidden w-24 h h-24 xl:h-[100px] xl:w-[100px] object-cover object-center p-10 bg-white">
                <Image
                    layout="fill"
                    src={urlFor(experience?.companyImage).url()}
                    alt="Guarapo"
                    objectFit='contain'
                />
            </motion.div>
            <div className='px-0 md:px-10'>
                <h4 className='text-xl md:text-4xl font-light md:mb-4'>{experience?.jobTitle}</h4>
                <p className='font-bold text-lg md:text-2xl mt-1'>{experience?.company}</p>
                <div className="flex space-x-4 my-2 items-start justify-start h-[64px]">
                    {experience?.technologies.map((technology) => (
                        <div key={technology._id} className="flex flex-col items-center justify-center space-y-2 w-[40px] text-clip">
                            <div className="flex bg-white w-8 h-8 overflow-hidden rounded-sm relative">
                                <Image src={urlFor(technology?.image).url()}
                                    layout='fill' alt="logo" objectFit='cover' />
                            </div>
                            <p className="text-[8px] text-center">{technology.title}</p>
                        </div>
                    ))}
                </div>
                <div className="flex space-x-2 items-center justify-start mb-3">
                    <MapPinIcon className='text-blue-400 h-4 w-4 animate-pulse' />
                    <p className='text-gray-300 text-xs md:text-base'>{experience.location}</p>
                </div>
                <p className='pb-3 text-gray-300 text-xs md:text-base'>From {experience?.dateStarted.slice(0, -3)} to {experience?.isCurrentlyWorkingHere ? 'Currently' : experience?.dateEnded.slice(0, -3)}</p>
                <ul className='list-disc space-y-2 md:space-y-4 ml-5 text-sm md:text-lg text-justify'>
                    {experience?.points.map((point, index) => (
                        <li key={index}>{point}</li>
                    ))}
                </ul>
            </div>
        </article>
    )
}

export default ExperienceCard