import React from 'react'
import { BsTruck } from 'react-icons/bs'
import { GiMoneyStack } from 'react-icons/gi'
export const Mainsection = ({ mode }) => {
    return (
        <section className={`mt-16 ml-40 ${mode === 'dark' ? 'text-white' : ''}`}>
            <div className='w-1/3'>
                <h1 className='text-6xl'>Lowest Prices</h1>
                <h1 className='text-6xl mt-4'>Best Quality</h1>
            </div>
            <div className='mt-8 flex gap-2 w-1/2 devide-x'>
                <div className='flex gap-2 ml-2'>
                    <BsTruck className='text-4xl text-pink-500 '> </BsTruck>
                    <p className='mt-1 text-l font-bold'>Fast Delivery</p>
                </div>
                <div class="inline-block min-h-[1em] w-0.5 self-stretch bg-neutral-100 opacity-100 dark:opacity-50"></div>
                <div className='flex gap-2 ml-2'>
                    <GiMoneyStack className='text-4xl text-pink-500'> </GiMoneyStack>
                    <p className='mt-1 text-l font-bold'>Cash on Delivery</p>
                </div>
                <div class="inline-block min-h-[1em] w-0.5 self-stretch bg-neutral-100 opacity-100 dark:opacity-50"></div>
                <div className='flex gap-2 ml-2'>
                    <BsTruck className='text-4xl text-pink-500'> </BsTruck>
                    <p className='mt-1  text-l font-bold'>Fast Delivery</p>
                </div>
            </div>
            <div className='mt-52 flex'>
                <hr className={`h-0.5 w-1/4 border-t-0 ${mode === 'dark' ? 'bg-pink-500' : 'bg-pink-500'} opacity-100 dark:opacity-50  mt-5 mr-2`} />
                <p className='text-4xl font-bold'>Top Categories to choose from</p>
                <hr className={`h-0.5 w-1/4 border-t-0 ${mode === 'dark' ? 'bg-pink-500' : 'bg-pink-500'} opacity-100 dark:opacity-50  mt-5 ml-2`} />

            </div>
        </section>
    )
}
