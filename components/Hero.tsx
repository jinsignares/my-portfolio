import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Cursor, useTypewriter } from 'react-simple-typewriter'
import { urlFor } from '../sanity'
import { PageInfo } from '../typings'
import BackgroundCircles from './BackgroundCircles'

type Props = {
    pageInfo: PageInfo;
}

export default function Hero({ pageInfo }: Props) {
    const [text, count] = useTypewriter({
        words: pageInfo?.prompts,
        loop: true,
        delaySpeed: 2000,
    })

    return (
        <div className='h-screen flex flex-col space-y-8 items-center justify-center text-center overflow-hidden '>
            <BackgroundCircles />
            <div className="flex relative  mx-auto overflow-hidden rounded-full">
                <Image src={urlFor(pageInfo?.heroImage).url()} alt='Juan Insignares' objectFit='cover' layout='intrinsic' width={128} height={128} />
            </div>
            <div className="z-20">
                <h2 className='text-sm uppercase text-gray-500 pb-2 tracking-[15px]'>{pageInfo?.role}</h2>
                <div className="flex intems-center justify-center min-h-[100px] md:min-h-fit">
                    <h1 className='text-3xl lg:text-6xl font-semibold py-3 px-10'>
                        <span className='mr-3'>{text}</span>
                        <Cursor cursorColor='#000' />
                    </h1>
                </div>
                <div className="md:pt-5 space-x-2">
                    <Link href="#about">
                        <button className='heroButton'>About</button>
                    </Link>
                    <Link href="#experience">
                        <button className='heroButton'>Experience</button>
                    </Link>
                    <Link href="#skills">
                        <button className='heroButton'>Skills</button>
                    </Link>
                    <Link href="#projects">
                        <button className='heroButton'>Projects</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}