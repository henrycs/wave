
export interface Draggable {
  name: string
  component: string
  parameters: Record<string, any>
}

export const COMPONENTS: Draggable[] = [
  {
    name: 'Flex Layout',
    component: 'layout',
    parameters: {
      breakpoint: 'xl',
      zones: []
    },
  },
  {
    name: 'Zone Row',
    component: 'zone',
    parameters: {
      name: '',
      direction: 'row'
    },
  },
  {
    name: 'Zone Column',
    component: 'zone',
    parameters: {
      name: '',
      direction: 'column'
    },
  },
  {
    name: 'Markdown Card',
    component: 'markdown_card',
    parameters: {
      box: '',
      content: 'Markdown card content',
      title: 'Markdown Card Title',
      view: 'markdown',
    },
  },
  {
    name: 'Form Card',
    component: 'form_card',
    parameters: {
      box: '',
      title: 'Form Card Title',
      items: [],
      view: 'form',
    },
  },
  {
    name: 'Text',
    component: 'text',
    parameters: {
      content: 'I am a text component'
    },
  },
  {
    name: 'Button',
    component: 'button',
    parameters: {
      name: 'btn',
      label: 'Button',
    },
  },
  {
    name: 'Checkbox',
    component: 'checkbox',
    parameters: {
      name: 'cb',
      label: 'checkbox',
    },
  },
]