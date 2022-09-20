import React from 'react';
import { motion } from 'framer-motion'
import Skill from './Skill';
import { Skill as SkillType } from '../typings';

type Props = {
    skills: SkillType[]
}

function Skills({ skills }: Props) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className='h-screen relative flex flex-col text-center md:text-left xl:flex-row max-w-[2000px] xl:px-10 min-h-screen mx-auto justify-center xl:space-y-0 items-center'>
            <h3 className="absolute top-24 uppercase tracking-[20px] text-gray-500 text-lg md:text-2xl">Skills</h3>
            <h3 className='hidden md:flex absolute top-36 tracking-[3px] text-gray-300 text-sm'>Hover over a skill for current proficiency</h3>

            <div className="md:hidden grid grid-cols-4 gap-3">
                {skills?.map((skill) => (
                    <Skill key={skill._id} skill={skill} directionLeft />
                ))}
            </div>
            
            <div className="hidden md:grid grid-cols-4 gap-5 mt-40">
                {skills?.slice(0, skills.length / 2).map((skill) => (
                    <Skill key={skill._id} skill={skill} directionLeft />
                ))}
                {skills?.slice(skills.length / 2, skills.length).map((skill) => (
                    <Skill key={skill._id} skill={skill} />
                ))}
            </div>
            
        </motion.div>
    )
}

export default Skills