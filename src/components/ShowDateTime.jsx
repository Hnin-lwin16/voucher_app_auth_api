import React from 'react'
import { Button, Label, Table, TextInput } from 'flowbite-react'

const ShowDateTime = ({created_at}) => {
    const created = new Date(created_at);
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
  return (
   <>
   <Table.Cell className=' text-end'>
                <p>{date}</p>
                <p>{time}</p>
            </Table.Cell>
   </>
  )
}

export default ShowDateTime
