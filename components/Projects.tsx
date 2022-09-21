import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Project } from '../typings'
import { urlFor } from '../sanity'

type Props = {
    projects: Project[]
}

function Projects({ projects }: Props) {
    console.log(projects)
    return (
        <motion.div
            initial={{
                opacity: 0
            }}
            whileInView={{
                opacity: 1
            }}
            transition={{ duration: 1.5 }}
            className='h-screen flex relative flex-col text-center md:text-left md:flex-row max-w-full justify-center mx-auto items-stretch z-0'>
            <h3 className='absolute w-full top-24 uppercase text-center tracking-[20px] text-gray-500 text-lg md:text-2xl'>Projects</h3>

            <div className=' flex overflow-x-scroll snap-mandatory snap-x z-20 py-10'>
                {projects.sort((a, b) => new Date(b.dateStarted).valueOf() - new Date(a.dateStarted).valueOf()).map((project, index) => (
                    <div className='flex w-screen flex-shrink-0 flex-col justify-start items-center snap-center space-y-3 md:space-y-5 md:p-44 px-3' key={index}>
                        <motion.div
                            initial={{
                                opacity: 0
                            }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 1.2 }}
                            viewport={{ once: true }}
                            className="w-full md:max-w-[400px] md:max-h-[500px] mb-4">
                            <Image src={urlFor(project?.image).url()} alt="project image" layout='responsive' height={20} width={40} objectFit='cover' className='rounded-md' />
                        </motion.div>
                        <div className=' space-y-3 md:space-y-6 md:px-10 max-w-[800px]'>
                            <h4 className='text-xl md:text-2xl font-semibold text-center underline decoration-blue-400/50'>Case Study {index + 1} of {projects.length}:</h4>
                            <h5 className='text-base md:text-xl font-semibold text-center'>{project?.title}</h5>
                            <p className="text-xs md:text-sm text-justify md:text-left">{project?.summary}</p>
                        </div>
                        <div className="flex flex-col">
                            <h5 className='text-base md:text-2xl font-semibold text-center'>Built using</h5>
                            <div className="flex space-x-4 mt-4 w-full justify-evenly items-start">
                                {project?.technologies.map((technology) => (
                                    <div className="flex flex-col justify-center items-center space-y-2 w-12" key={technology._id}>
                                        <div  className="flex bg-white w-8 h-8 overflow-hidden rounded-full relative">
                                            <Image src={urlFor(technology?.image).url()}
                                                layout='fill' alt="logo" objectFit='cover' />
                                        </div>
                                        <p className="text-[8px] md:text-lg text-center md:text-left">{technology.title}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="w-full absolute top-[30%] bg-blue-400/10 h-[500px] left-0 -skew-y-12"></div>
        </motion.div>
    )
}

export default Projects