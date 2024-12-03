import React from 'react'
import useRecordStore from '../store/useRecordStore'
import VoucherListRow from './VoucherListRow';
<VoucherListRow/>
const VouncherTable = () => {
  const {records} = useRecordStore();
  const total = records.reduce((total,record)=>total+record.cost,0);
  const taxi = total * 0.07;
  const netTotal = total+taxi;

  return (
    <div className="relative shadow-md sm:rounded-lg overflow-hidden">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
      <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
        <tr className=" ">
          <th scope="col" className="px-6 py-4">
            #
          </th>
          <th scope="col" className="px-6 py-4">
            Product name
          </th>
          <th scope="col" className="px-6 py-4 text-end">
            Price
          </th>
          <th scope="col" className="px-6 py-4 text-end">
            Quantity
          </th>
          <th scope="col" className="px-6 py-4 text-end">
            Cost
          </th>
          <th scope="col" className="px-6 py-4 text-end">
            {" "}
          </th>
        </tr>
      </thead>
      <tbody id="recordGroup">
     {records.map((record,index)=> <VoucherListRow key={index} record={record} index={index}/>)}
      </tbody>
      <tfoot>
        <tr className="border-b">
          <td className="px-6 py-4 text-end" colSpan={4}>
            Total
          </td>
          <td className="px-6 py-4 text-end">{total}</td>
          <td className="px-6 py-4 text-end"> </td>
        </tr>
        <tr className="border-b">
          <td className="px-6 py-4 text-end" colSpan={4}>
            Tax(val 7%)
          </td>
          <td className="px-6 py-4 text-end">{taxi.toFixed(2)}</td>
          <td className="px-6 py-4 text-end"> </td>
        </tr>
        <tr className="border-b">
          <td className="px-6 py-4 text-end" colSpan={4}>
            Net Total
          </td>
          <td className="px-6 py-4 text-end">{netTotal.toFixed(2)}</td>
          <td className="px-6 py-4 text-end"> </td>
        </tr>
        
      </tfoot>
    </table>
  </div>
  )
}

export default VouncherTable
