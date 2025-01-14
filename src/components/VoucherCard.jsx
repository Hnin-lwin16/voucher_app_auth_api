import  html2pdf  from 'html2pdf.js';
import printJS from 'print-js';
import React from 'react'
import { useParams } from 'react-router-dom'
import useSWR from 'swr';
import ShowDateTime from './ShowDateTime';
import useCookie from 'react-use-cookie';

const VoucherCard = () => {

    const id = useParams().id;
    const [token, setToken] = useCookie("myToken");
   
    const fetcher = (url) =>
      fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }).then((res) => res.json());
    // console.log(import.meta.env.VITE_BASE_URL+"/vouchers/"+id)
  const { data, error, isLoading } = useSWR(import.meta.env.VITE_BASE_URL+"/vouchers/"+id, fetcher);
  
    console.log(data)
    const handlePrint = () => {
        printJS({
          printable: 'printArea',
          type: 'html',
          style: '@import url("https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css");'

        });
      };
    // {
    //   isLoading && console.log(data.data)
    // }
    
    const created = new Date();
    const date = created.toLocaleDateString('de-DE',{
        day: 'numeric',
        month: 'short',
        year: '2-digit',
    });
    const time = created.toLocaleTimeString('de-DE',{
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    });

      const handleDownloadPDF = () => {
        const element = document.getElementById('printArea');
    
        // Configure html2pdf options
        const options = {
            margin: [10, 10, 10, 10], // Ad}dd margin around the content
            filename: 'voucher.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: {
              scale: 2,          // Increase the scale for higher quality
              width: 900,        // Set width to match A5 paper size (width in mm)
              height: 297,       // Set height to match A5 paper size (height in mm)
              x: 0,
              y: 0,
            },
            jsPDF: {
              unit: 'mm',        // Set unit as mm (millimeter)
              format: 'a5',      // Paper size A5
              orientation: 'portrait', // Portrait orientation
              putOnlyUsedFonts: true, // Reduce PDF file size by including only used fonts
            }
          };
        // Generate PDF
        html2pdf().from(element).set(options).save();
      };
   
  return (
   
    <div className=" flex gap-5 mt-5" >
         {!isLoading && (
            <>
             <div id="printArea" className="w-[14.8cm] bg-white ">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">INVOICE</h1>
          <p className="text-xl">{data.data.voucher_id}</p>
        </div>
        <div className="text-right">
          <p className="font-bold">Invoice to</p>
          <p>{data.data.customer_name}</p>
          <p>Date: {data.data.sale_date}</p>
        </div>
      </div>

      <table className="w-full mb-8">
        <thead>
          <tr className="border-b-2 border-gray-300">
            <th className="text-left py-2 text-sm">No</th>
            <th className="text-left py-2 text-sm">Description</th>
            <th className="text-right py-2 text-sm">Qty</th>
            <th className="text-right py-2 text-sm">Price</th>
            <th className="text-right py-2 text-sm">Total</th>
          </tr>
        </thead>
        <tbody>
          {data.data.records.map((record, index) => (
            <tr key={record.id} className="border-b border-gray-200">
              <td className="py-2 text-sm">{index + 1}</td>
              <td className="py-2 text-sm">{record.product.product_name}</td>
              <td className="text-right py-2 text-sm">{record.quantity}</td>
              <td className="text-right py-2 text-sm">
                {record.product.price}
              </td>
              <td className="text-right py-2 text-sm">{record.cost}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="border-b border-gray-200">
            <td className="py-2 text-right text-sm" colSpan={4}>
              Total
            </td>
            <td className="py-2 text-right text-sm">{parseFloat(data.data.total).toFixed(2)}</td>
          </tr>
          <tr className="border-b border-gray-200">
            <td className="py-2 text-right text-sm" colSpan={4}>
              Tax
            </td>
            <td className="py-2 text-right text-sm">{parseFloat(data.data.tax).toFixed(2)}</td>
          </tr>
          <tr className="border-b border-gray-200">
            <td className="py-2 text-right text-sm" colSpan={4}>
              Net Total
            </td>
            <td className="py-2 text-right text-sm">{parseFloat(data.data.net_total).toFixed(2)}</td>
          </tr>
        </tfoot>
      </table>

      <div className=" text-xs mb-8 flex justify-between">
        <div className=" ">
          <h2 className="font-bold mb-2">Payment Transfer to</h2>
          <p>Kpay,Wave - 09250152018</p>
          <p>KBZ Bank - 02730102705025601</p>
          <p>AYA Bank - 20003674121</p>
        </div>
        <div className="  ">
          <h2 className="font-bold text-xl">MMS IT</h2>
          <p>48, 1st Floor, Shan Kone St.</p>
          <p>+959-250-152-018</p>
          <p>enquiry@mms-it.com</p>
        </div>
      </div>

      <div className="border-t-2 border-gray-300 pt-4">
        <p className="mt-4 text-center text-sm">Thanks to You</p>
      </div>
    </div>
    <div className="flex flex-col gap-3" >
      <button
        className="text-white flex justify-center items-center gap-3 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        onClick={handlePrint}
      >
        Print Voucher
      </button>

      <button
        className="text-white flex justify-center items-center gap-3 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        onClick={handleDownloadPDF}
      >
        Download PDF
      </button>
    </div>
            </>
         )}
  </div>
  )
}

export default VoucherCard
