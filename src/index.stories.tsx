import React from 'react'
import { createTheme, ThemeProvider } from '@mui/material'
import createCache from '@emotion/cache'
import { CacheProvider } from '@emotion/react'
import { action } from '@storybook/addon-actions'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import rtlPlugin from 'stylis-plugin-rtl'

import { MuiColorInput, MuiColorInputProps, MuiColorInputValue } from './index'

export default {
  title: 'MuiColorInput',
  component: MuiColorInput
} as ComponentMeta<typeof MuiColorInput>

export const Primary: ComponentStory<typeof MuiColorInput> = () => {
  const [value, setValue] = React.useState<MuiColorInputValue>('black')

  const handleChange = (
    ...argsChange: Parameters<NonNullable<MuiColorInputProps['onChange']>>
  ) => {
    action('onChange')(argsChange)
    setValue(argsChange[0])
  }

  return (
    <MuiColorInput
      color="warning"
      value={value}
      format="rgb"
      onChange={handleChange}
    />
  )
}
Primary.decorators = [
  (Story) => {
    const theme = createTheme()
    return (
      <ThemeProvider theme={theme}>
        <Story />
      </ThemeProvider>
    )
  }
]

export const RTL: ComponentStory<typeof MuiColorInput> = Primary.bind({})
RTL.decorators = [
  (Story) => {
    const rtlCache = createCache({
      key: 'muirtl',
      stylisPlugins: [rtlPlugin]
    })
    const rtlTheme = createTheme({ direction: 'rtl' })
    return (
      <CacheProvider value={rtlCache}>
        <div dir="rtl">
          <ThemeProvider theme={rtlTheme}>
            <Story />
          </ThemeProvider>
        </div>
      </CacheProvider>
    )
  }
]
