import Feed from '@components/Feed';
import React from 'react';

const Home = () => {
  return (
    <section className='w-full flex-center flex-col'>
      <h1 className='head_text text-center'>
        Discover & Share
        <br className='max-md:hidden'/>
        <span className='orange_gradient text-center'>
          AI - Powered Promts
        </span>
      </h1>
      <p className='desc text-center'>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Numquam quos beatae itaque aliquid, vel illo atque voluptatibus voluptas odio reprehenderit eaque laboriosam ipsam vero! Libero nemo reprehenderit in doloremque nostrum!
      </p>

      <Feed />
    </section>
  )
}

export default Home
