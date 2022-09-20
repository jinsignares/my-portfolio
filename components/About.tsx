import React from 'react'
import { motion } from 'framer-motion'
import { PageInfo } from '../typings'
import { urlFor } from '../sanity'
import Image from 'next/image'

type Props = {
    pageInfo: PageInfo
}

function About({ pageInfo }: Props) {
    return (
        <motion.div
            initial={{
                opacity: 0
            }}
            whileInView={{
                opacity: 1
            }}
            transition={{ duration: 1.5 }}
            className='h-screen flex relative flex-col text-center md:text-left md:flex-row max-w-7xl px-10 justify-evenly mx-auto items-center'>
            <h3 className='absolute top-24 uppercase tracking-[20px] text-gray-500 text-lg md:text-2xl'>About</h3>
            <motion.div
                initial={{
                    x: -200,
                    opacity: 0,
                }}
                transition={{
                    duration: 1.2
                }}
                whileInView={{
                    x: 0,
                    opacity: 1,
                }}
                viewport={{ once: true }}
                className='mt-20 -mb-20 md:mb-0 flex-shrink-0 w-48 h-48 rounded-full object-cover md:rounded-lg md:h-64 md:w-64 xl:h-[400px] xl:w-[400px] relative overflow-hidden'
            >
                <Image src={urlFor(pageInfo?.profilePic).url()} layout="fill" alt='profilepic' objectFit='cover' />
            </motion.div>
            <div className="space-y-10 px-0 md:px-10">
                <h4 className='text-xl md:text-4xl font-semibold'>Here&apos;s a <span className='underline decoration-blue-400/50'>little</span> background</h4>
                <p className='text-sm md:text-base'>
                    {pageInfo?.backgroundInformation}
                </p>
            </div>
        </motion.div>
    )
}

export default About