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
        <article className='flex flex-col rounded-lg items-center justify-start space-y-7 flex-shrink-0 w-[calc(100%-40px)] md:w-[600px] xl:w-[900px] snap-center px-4 py-8 bg-[#292929] transition-opacity duration-200 overflow-hidden opacity-100 md:opacity-40 hover:opacity-100 h-full'>
            <motion.div
                initial={{
                    opacity: 0
                }}
                transition={{ duration: 1.2 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="flex relative rounded-lg overflow-hidden w-24 h-24 xl:h-[100px] xl:w-[100px] object-cover object-center p-10">
                <Image
                    layout="fill"
                    src={urlFor(experience?.companyImage).url()}
                    alt="Guarapo"
                    objectFit='cover'
                />
            </motion.div>
            <div className='px-0 md:px-10'>
                <h4 className='text-xl md:text-4xl font-light md:mb-4'>{experience?.jobTitle}</h4>
                <p className='font-bold text-lg md:text-2xl mt-1'>{experience?.company}</p>
                <div className="flex space-x-2 my-2 items-center">
                    {experience?.technologies.map((technology) => (
                        <div key={technology._id} className="flex bg-white w-10 h-10 overflow-hidden rounded-full relative">
                            <Image src={urlFor(technology?.image).url()}
                                layout='fill' alt="logo" objectFit='cover' />
                        </div>
                    ))}
                </div>
                <p className='pb-3 md:py-5 text-gray-300'>From {experience?.dateStarted} to {experience?.isCurrentlyWorkingHere ? 'Now' : experience?.dateEnded}</p>
                <ul className='list-disc space-y-2 md:space-y-4 ml-5 text-sm md:text-lg'>
                    {experience?.points.map((point, index) => (
                        <li key={index}>{point}</li>
                    ))}
                </ul>
            </div>
        </article>
    )
}

export default ExperienceCard