import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

type Props = {}

function ExperienceCard({ }: Props) {
    return (
        <article className='flex flex-col rounded-lg items-center space-y-7 flex-shrink-0 w-[500px] md:w-[600px] xl:w-[900px] snap-center p-10 bg-[#292929] cursor-pointer transition-opacity duration-200 overflow-hidden opacity-40 hover:opacity-100'>
            <motion.div
                initial={{
                    y: -100,
                    opacity: 0
                }}
                transition={{ duration: 1.2 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex relative rounded-full overflow-hidden w-32 h-32 xl:h-[100px] xl:w-[100px] object-cover object-center p-10">
                <Image
                    layout="fill"
                    src="/Guarapo.png"
                    alt="Guarapo"
                />
            </motion.div>
            <div className='px-0 md:px-10'>
                <h4 className='text-4xl font-light'>Job Title</h4>
                <p className='font-bold text-2xl mt-1'>Company</p>
                <div className="flex space-x-2 my-2">
                    <div className="flex w-10 h-10 rounded-full relative">
                        <Image src='https://www.freepnglogos.com/uploads/javascript-png/javascript-vector-logo-yellow-png-transparent-javascript-vector-12.png'
                            layout='fill' alt="logo" />
                    </div>
                    <div className="flex w-10 h-10 rounded-full relative">
                        <Image src='https://www.freepnglogos.com/uploads/javascript-png/javascript-vector-logo-yellow-png-transparent-javascript-vector-12.png'
                            layout='fill' alt="logo" />
                    </div>
                    <div className="flex w-10 h-10 rounded-full relative">
                        <Image src='https://www.freepnglogos.com/uploads/javascript-png/javascript-vector-logo-yellow-png-transparent-javascript-vector-12.png'
                            layout='fill' alt="logo" />
                    </div>
                </div>
                <p className='uppercase py-5 text-gray-300'>Started work... - Ended...</p>
                <ul className='list-disc space-y-4 ml-5 text-lg'>
                    <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus, similique.</li>
                    <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium, illum?</li>
                    <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil, incidunt?</li>
                    <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, suscipit!</li>
                    <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, eaque.</li>
                </ul>
            </div>
        </article>
    )
}

export default ExperienceCard