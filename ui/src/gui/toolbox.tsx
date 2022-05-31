import React from 'react' 
import { stylesheet } from "typestyle"
import { COMPONENTS, Draggable } from "./component_mapping"

const css = stylesheet({
  container: {
    backgroundColor: 'white',
    width: 200,
    textAlign: 'center',
    padding: '20px 0',
    border: '1px solid #d8d8d8'
  },
  list: {
    listStyleType: 'none',
    margin: 0,
    padding: 0,
  },
  item: {
    cursor: 'pointer',
    boxSizing: 'border-box',
    color: 'black',
    padding: '8px 16px',
    $nest: {
      '&:hover': {
        outline: '1px solid #832161'
      }
    }
  }
})


const DragableComp = (props: { comp: Draggable }) => {
  
  const setDragData = (ev: any) => {
    ev.dataTransfer.setData("text/plain", JSON.stringify(props.comp))
  }

  return <div
    className={css.item}
    draggable
    onDragStart={setDragData}
  >
    {props.comp.name}
  </div>
}

export const Toolbox = () => {

  return (
    <div className={css.container}>
      <h1 style={{ fontSize: 20 }}>Toolbox</h1>
      <ul className={css.list} >
        {COMPONENTS.map(c => <li key={c.name}><DragableComp comp={c} /></li>)}
      </ul>
    </div>
  )
}

