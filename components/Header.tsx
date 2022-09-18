import React from 'react'
import { SocialIcon } from 'react-social-icons'
import { motion } from 'framer-motion'
import Link from 'next/link'

type Props = {}

export default function Header({ }: Props) {
    return (
        <header className='flex sticky top-0 items-start justify-between max-w-7xl mx-auto z-20 xl:items-center p-5'>
            <motion.div
                initial={{
                    x: -500,
                    opacity: 0,
                    scale: 0.5,
                }}
                animate={{
                    x: 0,
                    opacity: 1,
                    scale: 1
                }}
                transition={{
                    duration: 1.5
                }}
                className="flex flex-row items-center">
                <SocialIcon url="https://twitter.com/ForeverAJohn" fgColor='grey' bgColor='transparent' />
                <SocialIcon url="https://instagram.com/ForeverAJohn" fgColor='grey' bgColor='transparent' />
                <SocialIcon url="https://github.com/jinsignares" fgColor='grey' bgColor='transparent' />
                <SocialIcon url="https://www.linkedin.com/in/juan-david-insignares-gomez-b335338b/" fgColor='grey' bgColor='transparent' />
            </motion.div>
            <motion.div
                initial={{
                    x: 500,
                    opacity: 0,
                    scale: 0.5
                }}
                animate={{
                    x: 0,
                    opacity: 1,
                    scale: 1,
                }}
                transition={{
                    duration: 1.5
                }}
                className="flex flex-row items-center text-gray-300 cursor-pointer">
                <Link href="#contact" >
                    <div className="flex cursor-pointer justify-center items-center">
                        <SocialIcon className='cursor-pointer' network='email' fgColor='grey' bgColor='transparent' />
                        <p className='uppercase hidden md:inline-flex text-sm text-gray-400'>Get In Touch</p>
                    </div>
                </Link>
            </motion.div>
        </header>
    )
}