/* eslint-disable no-unused-vars */

import { create } from 'zustand'
import { Category } from '@/utils/types'

type Filter = Category | null
type Label = {
  title: string | null
  subtitle: string | null
}

type Store = {
  filter: Filter
  label: Label
  setFilter: (filter: Filter) => void
  setLabel: (label: Label) => void
}

export const useStore = create<Store>((set) => ({
  filter: null,
  label: { title: null, subtitle: null },
  setFilter: (filter) => set({ filter }),
  setLabel: (label) => set({ label }),
}))
