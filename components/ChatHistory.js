import React from 'react'
import {Tab} from '@headlessui/react'
import Hero from './Hero'
const ChatHistory = () => {
  return (
    <>
       <Tab.Group>
      <Tab.List>
        <Tab>Tab 1</Tab>
        <Tab>Tab 2</Tab>
        <Tab>Tab 3</Tab>
      </Tab.List>
      <Tab.Panels>
        <Tab.Panel>
            <Hero/>
        </Tab.Panel>
        <Tab.Panel>Content 2</Tab.Panel>
        <Tab.Panel>Content 3</Tab.Panel>
      </Tab.Panels>
    </Tab.Group> 
    </>
  )
}

export default ChatHistory