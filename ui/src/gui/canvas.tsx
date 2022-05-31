import React, { useRef } from "react"
import { useState } from "react"
import { stylesheet } from "typestyle"
import { Draggable } from "./component_mapping"
import { FlexLayout } from "../page"
import { Layout, layoutsB } from "../meta"
import { box, Card } from "h2o-wave"
import { patchCardComp, patchLayoutComp, patchZoneComp } from "./patch"

const css = stylesheet({
  canvas: {
    display: 'flex',
    flexDirection: 'column',
    flex: 6,
    padding: 24,
    background: "#d3d3d3",
  },
})

export const Canvas = (props: any) => {
  
  const zoneId = useRef(1)
  const cardId = useRef(1)

  const [cards, setCards] = useState<Card[]>([])

  const onDropOnCanvas = (ev: any) => {
    const dropped: Draggable = JSON.parse(ev.dataTransfer.getData("text"))

    if (dropped.component === 'layout') {
      const newLayout = dropped.parameters as unknown as Layout
      layoutsB([...layoutsB(), newLayout])
      props.onAddLayout(newLayout)
      patchLayoutComp(onDropOnLayout)
    }

    ev.dataTransfer.clearData()
  }

  const onDropOnLayout = (ev: any) => {
    ev.preventDefault()

    const { component, parameters }: Draggable = JSON.parse(ev.dataTransfer.getData("text"))

    if (component === 'zone') {
      const newZone = { ...parameters, name: `zone_${zoneId.current++}` }
      props.onAddZone(newZone, 'xl')
      
      const previousZones = layoutsB()[0].zones

      layoutsB([
        {
          breakpoint: "xl",
          zones: [
            ...previousZones,
            newZone,
          ],
        }])
      patchZoneComp(newZone, onDropOnZone)
      setCards(c => [...c])
    }

    ev.dataTransfer.clearData()
  }

  const onDropOnZone = (zoneName: string) => (ev: any) => {
    const { component, parameters}: Draggable = JSON.parse(ev.dataTransfer.getData("text"))
    
    if (component.match(/.+_card$/)) {
      const newId = `card_${cardId.current++}`
      parameters.box = zoneName

      const card: Card = {
        id: newId,
        name: newId,
        state: {
          ...parameters
        },
        set: () => { true },
        changed: box<boolean>(),
      }
      setCards(cards => [...cards, card])
      props.onAddCard(card)
      patchCardComp(card, onDropOnCard(card.id), component)
    }
  }

  const onDropOnCard = (cardId: string) => (ev: any) => {

    const { component, parameters}: Draggable = JSON.parse(ev.dataTransfer.getData("text"))
    
    if (component.match(/.+_card$/) || component === 'layout' || component === 'zone') return
      
    setCards(cards => {
      const found = cards.find(c => c.id === cardId)
      if (!found) return cards
      return [
        ...cards.filter(c => c !== found),
        {
          ...found,
          state: {
            ...found.state,
            items: [...found.state.items, { [component]: parameters}]
          }
        }
      ]
    })
    
  }

  return (
    <div
      className={css.canvas}
      onDragOver={ev => ev.preventDefault()}
      onDrop={onDropOnCanvas}
    >
      <FlexLayout name="flex-test" cards={cards} />
    </div>
  )
}
