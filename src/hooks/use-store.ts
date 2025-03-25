/* eslint-disable no-unused-vars */

import { create } from 'zustand'
import { Category } from '@/utils/types'

type Filter = Category | null

type Store = {
  filter: Filter
  setFilter: (filter: Filter) => void
}

export const useStore = create<Store>((set) => ({
  filter: null,
  setFilter: (filter) => set({ filter }),
}))
