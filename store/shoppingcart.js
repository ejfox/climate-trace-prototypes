import { defineStore } from 'pinia'

export const useShoppingCartStore = defineStore({
  id: 'shoppingCart',
  state: () => ({
    items: useLocalStorage('shoppingCartItems', []),
  }),
  actions: {
    addItem(item) {
      console.log('store adding item', item)
      // check if item is already in the cart
      const index = this.items.findIndex((i) => i.id === item.id)
      // if it is, then don't push it and console.error
      if (index !== -1) {
        console.error('Item already in cart')
        return
      }
      this.items.push(item)
    },
    removeItem(item) {
      this.items.splice(this.items.indexOf(item), 1)
    }
  },
})

