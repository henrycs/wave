import { Card } from "h2o-wave"
import { Zone } from "../meta"

export const patchLayoutComp = (onDropZone: any): void => {
  setTimeout(() => {
    const flexLayoutEl = document?.querySelector<HTMLDivElement>('div[data-test="flex-test"]')
    if (flexLayoutEl) {
      flexLayoutEl.ondrop = onDropZone
      flexLayoutEl.style.height = '100%'
      flexLayoutEl.style.backgroundColor = '#f5f5f5'
      flexLayoutEl.style.boxShadow = '0px 10px 15px -3px rgba(0,0,0,0.1)'
      flexLayoutEl.style.padding = '20px'
      flexLayoutEl.style.boxSizing = 'border-box'
    }
  }, 0)
}

export const patchZoneComp = (zone: Zone, onDropCard: any): void => {
  setTimeout(() => {
    const z = document?.querySelector<HTMLDivElement>(`div[data-test="${zone.name}"]`)
    if (z) {
      z.style.minHeight = '50px'
      z.style.border = '1px dashed salmon'
      z.style.marginBottom = '5px'
      z.style.display = 'flex'
      z.style.justifyContent = 'end'
      z.style.position = 'relative'
      z.style.transition = 'all .2s'
      const labelEl = document.createElement('span')
      labelEl.style.position = 'absolute'
      labelEl.style.top = '5px'
      labelEl.style.right = '10px'
      labelEl.style.zIndex = '1'
      
      
      labelEl.innerText = zone.direction === 'row' ? '→' : '↓' ?? ''
      z.appendChild(labelEl)
      z.ondrop = onDropCard(zone.name)
    }
  }, 0)
}

export const patchCardComp = (card: Card, onDropComp: any, component: string): void => {
  setTimeout(() => {
    const c = document?.querySelector<HTMLDivElement>(`div[data-test="${card.name}"]`)
    if (c) {
      c.style.position = 'relative'
      c.style.minHeight = '100px'
      const labelEl = document.createElement('span')
      labelEl.dataset.cardLabel = ''
      labelEl.style.position = 'absolute'
      labelEl.style.top = '15%'
      labelEl.style.left = '45%'
      labelEl.style.zIndex = '1'
      labelEl.innerText = card.name ?? ''
      labelEl.style.transition = 'all .2s'
      labelEl.style.backgroundColor = 'white'
      labelEl.style.padding = '4px 8px'
      labelEl.style.borderRadius = '4px'
      labelEl.style.border = '2px solid #66c7e8'

      c.onmouseenter = () => {
        const labels = document?.querySelectorAll<HTMLDivElement>(`[data-card-label]`)
        labels.forEach(l => l.style.opacity = '0')
        labelEl.style.opacity = '100'
      }
      
      c.onmouseleave = () => {
        labelEl.style.opacity = '0'
      }
      
      c.appendChild(labelEl)
      if (component === 'form_card') c.ondrop = onDropComp
    }
  }, 0)
}