import React from 'react'
import { TableProps } from './Table.interface'

const Table = (props: TableProps) => {
  return (
    <div>
      <table className="w-full shadow-md p-4">
        <thead>
          <tr>
            {props.columns.map((column) => {
              return (
                <th key={`heading_${column.id}`} className="py-2 px-4 border-y">
                  {column.label}
                </th>
              )
            })}
          </tr>
        </thead>
        <tbody>
          {props.data.map(item => {
            return (
              <tr key={item.id}>
                {props.columns.map((column) => {
                  return (
                    <td key={`tdata_${column.id}`} className={`py-2 px-4 ${column.className || ''}`}>
                      {column.render(item, props.onClick)}
                    </td>
                  )
                })}
              </tr>
            )
          })}
            
        </tbody>
      </table>
    </div>
  )
}

export default Table