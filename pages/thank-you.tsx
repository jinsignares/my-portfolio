import { motion } from 'framer-motion'
import Head from 'next/head'
import Link from 'next/link'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function ThankYou() {
    const router = useRouter()

    return (
        <div className='bg-[rgb(36,36,36)] text-white h-screen flex flex-col items-center justify-center px-4'>
            <Head>
                <title>Thank You | Juan Insignares</title>
            </Head>

            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center"
            >
                <h1 className="text-4xl md:text-6xl font-bold text-blue-400 mb-4">Thank You!</h1>
                <p className="text-xl md:text-2xl text-gray-300 mb-8">
                    Your message has been received. I&apos;ll get back to you soon!
                </p>
                <p className="text-gray-400 mb-8">
                    You&apos;ll be redirected to the homepage in 5 seconds...
                </p>
                <Link href="/">
                    <a className="text-blue-400 hover:text-blue-300 underline">
                        Return to Homepage
                    </a>
                </Link>
            </motion.div>
        </div>
    )
} 