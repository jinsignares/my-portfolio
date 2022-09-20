import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Project } from '../typings'
import { urlFor } from '../sanity'

type Props = {
    projects: Project[]
}

function Projects({ projects }: Props) {
    return (
        <motion.div
            initial={{
                opacity: 0
            }}
            whileInView={{
                opacity: 1
            }}
            transition={{ duration: 1.5 }}
            className='h-screen flex relative flex-col text-center md:text-left md:flex-row max-w-full px-10 justify-evenly mx-auto items-center z-0'>
            <h3 className='absolute top-24 uppercase tracking-[20px] text-gray-500 text-lg md:text-2xl'>Projects</h3>

            <div className='relative flex overflow-x-scroll overflow-y-hidden snap-mandatory snap-x z-20'>
                {projects.map((project, index) => (
                    <div className='flex flex-shrink-0 w-full flex-col justify-center items-center snap-center space-y-5 relative md:p-44 h-screen' key={index}>
                        <motion.div
                            initial={{
                                y: -300,
                                opacity: 0
                            }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1.2 }}
                            viewport={{ once: true }}
                            className="w-32 h-32 relative">
                            <Image src={urlFor(project?.image).url()} alt="project image" layout='fill' objectFit='cover' />
                        </motion.div>
                        <div className='space-y-10 px-0 md:px-10 max-w-[1000px]'>
                            <h4 className='text-4xl font-semibold text-center'> <span className='underline decoration-blue-400/50'>Case Study {index + 1} of {projects.length}:</span> {project?.title}</h4>

                            <p className="text-lg text-center md:text-left">{project?.summary}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="w-full absolute top-[30%] bg-blue-400/10 h-[500px] left-0 -skew-y-12"></div>
        </motion.div>
    )
}

export default Projects