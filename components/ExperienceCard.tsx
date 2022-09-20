import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Experience } from '../typings'
import { urlFor } from '../sanity'

type Props = {
    experience: Experience
}

function ExperienceCard({ experience }: Props) {
    return (
        <article className='flex flex-col rounded-lg items-center space-y-7 flex-shrink-0 w-screen md:w-[600px] xl:w-[900px] snap-center p-3 md:p-10 bg-[#292929] cursor-pointer transition-opacity duration-200 overflow-hidden opacity-40 hover:opacity-100 pt-5'>
            <motion.div
                initial={{
                    y: -100,
                    opacity: 0
                }}
                transition={{ duration: 1.2 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex relative rounded-lg overflow-hidden md:rounded-full w-32 h-32 xl:h-[100px] xl:w-[100px] object-cover object-center p-10">
                <Image
                    layout="fill"
                    src={urlFor(experience?.companyImage).url()}
                    alt="Guarapo"
                />
            </motion.div>
            <div className='px-0 md:px-10'>
                <h4 className='text-xl md:text-4xl font-light'>{experience?.jobTitle}</h4>
                <p className='font-bold text-lg md:text-2xl mt-1'>{experience?.company}</p>
                <div className="flex space-x-2 my-2 items-center">
                    {experience?.technologies.map((technology) => (
                        <div key={technology._id} className="flex w-5 h-5 md:w-10 md:h-10 overflow-hidden rounded-full relative">
                            <Image src={urlFor(technology?.image).url()}
                                layout='fill' alt="logo" />
                        </div>
                    ))}
                </div>
                <p className='py-3 md:py-5 text-gray-300'>From {experience?.dateStarted} to {experience?.isCurrentlyWorkingHere ? 'Now' : experience?.dateEnded}</p>
                <ul className='list-disc space-y-4 ml-5 text-sm md:text-lg'>
                    {experience?.points.map((point, index) => (
                        <li key={index}>{point}</li>
                    ))}
                </ul>
            </div>
        </article>
    )
}

export default ExperienceCard