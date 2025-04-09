/* eslint-disable no-unused-vars */

import { create } from 'zustand'
import { Category } from '@/utils/types'

type Filter = Category | null
type Label = {
  title: string | null
  subtitle: string | null
  tag: string | null
}

type Store = {
  ready: boolean
  filter: Filter
  label: Label
  setReady: (ready: boolean) => void
  setFilter: (filter: Filter) => void
  setLabel: (label: Label) => void
}

export const useStore = create<Store>((set) => ({
  ready: false,
  filter: null,
  label: { title: null, subtitle: null, tag: null },
  setReady: (ready) => set({ ready }),
  setFilter: (filter) => set({ filter }),
  setLabel: (label) => set({ label }),
}))
