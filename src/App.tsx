import { useState } from 'react'
import { Widget } from './components/Widget'
import logo from './logo.svg'

interface ButtonProps {
  text?: string
}

function Button(props: ButtonProps) {
  return (
    <button className="bg-violet-500 p-2 px-4 h-10 rounded hover:bg-violet-700 transition-colors">
      {' '}
      {props.text ?? 'Default'}
    </button>
  )
}

export function App() {
  return (    
      <Widget />    
  )
}


