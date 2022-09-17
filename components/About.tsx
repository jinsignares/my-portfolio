import React from 'react'
import { motion } from 'framer-motion'

type Props = {}

function About({ }: Props) {
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
            <h3 className='absolute top-24 uppercase tracking-[20px] text-gray-500 text-2xl'>About</h3>
            <motion.img
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
                src='/Juan.jpeg'
                className='-mb-20 md:mb-0 flex-shrink-0 w-56 h-56 rounded-full object-cover md:rounded-lg md:h-64 md:w-64 xl:h-[400px] xl:w-[400px]'
            />
            <div className="space-y-10 px-0 md:px-10">
                <h4 className='text-4xl font-semibold'>Here&apos;s a <span className='underline decoration-blue-400/50'>little</span> background</h4>
                <p className='text-base'>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius officia necessitatibus amet, vitae iusto in ullam debitis. Nisi cupiditate dolorem, dolore sint at suscipit, velit expedita ab id voluptates dolor! Expedita ab dolorem porro inventore, ad itaque blanditiis eligendi consequuntur commodi quia minus recusandae, cum consequatur tempore sapiente doloremque maiores ullam consectetur, adipisci provident laboriosam aliquid perferendis libero rerum. Ex voluptate illo tempore ratione expedita consectetur vitae doloremque, molestiae nostrum non commodi amet dicta provident cupiditate esse quisquam perspiciatis vel, quod sit aut earum nisi iusto nam. Quo recusandae odit doloremque ducimus sunt minima! Harum aperiam magnam ea iusto exercitationem!
                </p>
            </div>
        </motion.div>
    )
}

export default About