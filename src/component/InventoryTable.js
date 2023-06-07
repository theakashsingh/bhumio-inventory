import React from 'react'
import { useSelector } from 'react-redux'

const InventoryTable = () => {
  
  const inventoryData = useSelector(state=>state.inventory.inventoryData)
  console.log("FROM_INVENTORY_TABLE" ,inventoryData);

  return (
    <div>InventoryTable</div>
  )
}

export default InventoryTable