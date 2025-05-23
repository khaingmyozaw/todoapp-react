import { React, useState } from 'react'
import { motion } from 'motion/react'
import Item from './layouts/Item'

const Index = () => {
    const [task, setTask] = useState("")
    const [items, setItems] = useState([])
    const [count, setCount] = useState(0)
    const [tab, setTab] = useState(false)

    const date = new Date()
    // default is m/dd/yyyy (5/21/2025)
    const formattedDate = date.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric'
    })

    // To add new todo
    const addNewTask = () => {
        if (task.trim() === "") return;
        let id = items.length;
        setItems([
            ...items,
            {
                id: id + 1,
                text: task,
                completed: false
            }
        ])
        setTask('')

        setCount(count + 1)
        setTab(false)
    }
    // To mark todo as completed
    const markCompleted = (id) => {
        const completedItem = items.find(item => item.id === id)
        completedItem.completed = !completedItem.completed

        let originalItems = [...items]
        let unCompletedItems = originalItems.filter(item => item.id !== completedItem.id)

        setItems([...unCompletedItems, completedItem])

        if (completedItem.completed) {
            setCount(count - 1)
        } else {
            setCount(count + 1)
        }
    }
    // To remove todo
    const removeItem = (item) => {
        let newItems = items.filter(r => r.id !== item.id);
        setItems(newItems)
        setCount(newItems.length)
    }

    const handleTab = (bol = false) => {
        if (tab !== bol) {
            setTab(bol)
        }
    }

    return (
        <section className='h-screen bg-[#00defc]'>
            <div className="container h-full mx-auto flex justify-center items-center">
                <div className="w-240 h-180 bg-[#3a3e49] p-4 text-white rounded-lg">

                    <div className="w-full flex p-4">
                        <div className="grow">
                            {formattedDate}
                            <small className='block text-[#00defc]'>{count > 0 ? count + ' Active Task(s)' : ''}</small>
                        </div>
                        <button
                            className={`shrink-0 w-auto px-4 cursor-pointer ${tab ? 'text-gray-500' : ''}`}
                            onClick={_ => handleTab(false)}
                        >
                            Incomplete Tasks
                        </button>
                        <button
                            className={`shrink-0 w-auto px-4 cursor-pointer ${!tab ? 'text-gray-500' : ''}`}
                            onClick={_ => handleTab(true)}
                        >
                            Completed Tasks
                        </button>
                    </div>

                    <div className="w-full flex p-4">
                        <input
                            className='w-1/2 p-2 me-3 rounded bg-white text-black focus:outline-0'
                            type="text"
                            name="task"
                            placeholder='Enter a task...'
                            value={task}
                            onChange={(e) => setTask(e.target.value)}
                            onKeyUp={(e) => {
                                if (e.key === 'Enter') {
                                    addNewTask()
                                }
                            }}
                        />

                        <button
                            className='px-4 rounded-md bg-[#00defc] cursor-pointer'
                            onClick={addNewTask}
                        >Add Task</button>
                    </div>

                    {
                        tab ? (
                            <motion.div
                                className={`w-full p-4`}
                                // initial={{ opacity: 0 }}
                                // animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                <hr className='border-gray-500' />
                                <ul className='w-full'>
                                    {
                                        items.filter(item => item.completed === true).map((item, index) => (
                                            <Item
                                                key={index}
                                                item={item}
                                                markCompleted={markCompleted}
                                                removeItem={removeItem}
                                            />
                                        ))
                                    }
                                </ul>
                            </motion.div>
                        ) : (
                            <motion.div
                                className={`w-full p-4`}
                                // initial={{ opacity: 0 }}
                                // animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                <hr className='border-gray-500' />
                                <ul className='w-full'>
                                    {
                                        items.filter(item => item.completed === false).map((item, index) => (
                                            <Item
                                                key={index}
                                                item={item}
                                                markCompleted={markCompleted}
                                                removeItem={removeItem}
                                            />
                                        ))
                                    }
                                </ul>
                            </motion.div>
                        )
                    }

                </div>
            </div>
        </section>
    )
}

export default Index