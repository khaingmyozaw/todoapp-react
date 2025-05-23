import React from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { CircleCheckBig, Trash2 } from 'lucide-react'

const Item = ({ item, markCompleted, removeItem }) => {
    return (
        <AnimatePresence>
            <motion.li
                className='w-full borderx-0 border-b border-gray-500 flex  gap-3'
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
            >
                <div
                    className="grow py-3 flex gap-3 items-center cursor-pointer"
                    onClick={_ => markCompleted(item.id)}
                >
                    <CircleCheckBig className={`${item.completed ? 'text-[#00defc]' : 'text-gray-500'}`} size={20} />
                    <p className={`${item.completed ? 'line-through text-[#00defc]' : ''}`}>{item.text}</p>
                </div>
                <motion.button
                    className='px-3 cursor-pointer text-gray-500 hover:text-red-400 hover:transition-all'
                    onClick={_ => removeItem(item)}>
                    <Trash2 size={20} />
                </motion.button>
            </motion.li>
        </AnimatePresence>
    )
}

export default Item