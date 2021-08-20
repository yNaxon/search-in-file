import React, { JSXElementConstructor, ReactElement, ReactNode } from 'react'
import { render as rtlRender, RenderOptions as RtlRenderOptions } from '@testing-library/react'
import { configureStore, EnhancedStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import { RootState } from './app/store'
import textSearchReducer from './features/text-search/text-search-slice';

interface RenderOptions extends RtlRenderOptions {
  preloadedState?: RootState,
  store?: EnhancedStore
}

function render(
  ui: ReactElement<any, string | JSXElementConstructor<any>>,
  {
    preloadedState,
    store = configureStore({ reducer: { textSearch: textSearchReducer }, preloadedState }),
    ...renderOptions
  }: RenderOptions = {}
) {
  function Wrapper({ children }: { children?: ReactNode }) {
    return <Provider store={store}>{children}</Provider>
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
}

export * from '@testing-library/react'
export { render }