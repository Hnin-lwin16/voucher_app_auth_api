import { Button, Label, Table, TextInput } from "flowbite-react";
import React, { useRef, useState } from "react";
import { BiSearch } from "react-icons/bi";

import { HiChevronDown, HiChevronUp, HiPencilSquare, HiPlus, HiTrash } from "react-icons/hi2";
import {
  Link,
  useActionData,
  useLocation,
  useParams,
  useSearchParams,
} from "react-router-dom";
import useSWR from "swr";
import SaleListRow from "./SaleListRow";
import { debounce, forEach } from "lodash";
import { HiX } from "react-icons/hi";
import useCookie from "react-use-cookie";
import Pagination from "./Pagination";

const VouncherList = () => {
  const [search, setSearch] = useState("");
  const [token] = useCookie("myToken");
  const [param, setParam] = useSearchParams();
  const location = useLocation();
  // console.log(param)
  const inputRef = useRef();
  const [fetchUrl, setFetchUrl] = useState(
    import.meta.env.VITE_BASE_URL + "/vouchers"+location.search
  );
  const fetcher = (url) =>
    fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
  const { data, error, isLoading } = useSWR(fetchUrl, fetcher);

  console.log(data);
  const handleSearch = debounce((value) => {
    console.log(value);
    setFetchUrl(`${import.meta.env.VITE_BASE_URL}/vouchers?q=${value}`);
    // setSearch(e.target.value)
    // setSearch(value);
    // console.log(inputRef.current.value);
  }, 1000);
  const updateFetchUrl = (url) => {
    
    const currentUrl = new URL(url);
    const searchParams = new URLSearchParams(currentUrl.search);
    const search = Object.fromEntries(searchParams);
    
    setParam(search);
    setFetchUrl(url);
  };
  
  /**
   * Updates the search query and fetches new data based on the input search value
   * @param {React.ChangeEvent<HTMLInputElement>} e - The input change event
   */
  const onSearchChange = (e) => {
    if (e.target.value) {
      setParam({ q: e.target.value });
      setFetchUrl(
        `${import.meta.env.VITE_BASE_URL}/vouchers?q=${e.target.value}`
      );
    } else {
      setParam({});
      setFetchUrl(`${import.meta.env.VITE_BASE_URL}/vouchers`);
    }
    // handleSearch(e.target.value);
  };
  const onClearSearch = () => {
    inputRef.current.value = "";
    setSearch("");
  };
  const handleSort = (value) => {
    setParam(value);
    const currentSort = new URLSearchParams(value).toString();
    setFetchUrl(`${import.meta.env.VITE_BASE_URL}/vouchers?${currentSort}`);
  }
  console.log(param);
  // !isLoading && console.log("start");
  return (
    <div className="mt-5">
      <div className=" flex justify-between items-center mb-3">
        <div className="max-w-md relative">
          <TextInput
            ref={inputRef}
            onChange={onSearchChange}
            id="email4"
            type="text"
            icon={BiSearch}
            placeholder="Search Vouncher"
            required
          />
          {search && (
            <HiX
              className="absolute top-4 end-3 cursor-pointer"
              fill="red"
              onClick={onClearSearch}
            />
          )}
        </div>
        <div className=" bg-blue-600 rounded-lg px-5 text-white ">
          <Link
            to="sale"
            className=" flex p-3 rounded-lg justify-center items-center"
          >
            Create Sale
            <HiPlus />
          </Link>
        </div>
      </div>
      <Table striped>
        <Table.Head>
        <Table.HeadCell>
          <div className=" flex items-center gap-2">
          <span className=" flex flex-col">
            <button onClick={handleSort.bind(null,{sort_by:"id",sort_direction:"asc"})} className=" hover:bg-stone-200">
              <HiChevronUp/>
            </button>
            <button onClick={handleSort.bind(null,{sort_by:"id",sort_direction:"desc"})} className=" hover:bg-stone-200">
              <HiChevronDown/>
            </button>
          </span>
          <span>#</span>
          </div>
        </Table.HeadCell>
          <Table.HeadCell>Voucher Id</Table.HeadCell>
          <Table.HeadCell>Customer</Table.HeadCell>
          
          <Table.HeadCell className=" text-end">Created At</Table.HeadCell>
          <Table.HeadCell className=" text-end">Action</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          <Table.Row className="bg-white hidden dark:border-gray-700 dark:bg-gray-800 colspan-5 last:table-row">
            <Table.Cell
              colSpan={5}
              className=" text-center whitespace-nowrap  font-medium text-gray-900 dark:text-white col-span-5 w-full"
            >
              There is not any Product
            </Table.Cell>
          </Table.Row>
          {isLoading ? (
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800 animate-pulse">
              <Table.Cell className="whitespace-nowrap font-medium text-gray-400 dark:text-gray-600">
                <div className="h-4 w-6 bg-gray-300 dark:bg-gray-700 rounded"></div>
              </Table.Cell>
              <Table.Cell>
                <div className="h-4 w-16 bg-gray-300 dark:bg-gray-700 rounded"></div>
              </Table.Cell>
              <Table.Cell className="text-end">
                <div className="h-4 w-24 bg-gray-300 dark:bg-gray-700 rounded"></div>
              </Table.Cell>
              <Table.Cell className="text-end">
                <div className="space-y-1">
                  <div className="h-4 w-16 bg-gray-300 dark:bg-gray-700 rounded"></div>
                  <div className="h-4 w-10 bg-gray-300 dark:bg-gray-700 rounded"></div>
                </div>
              </Table.Cell>
              <Table.Cell className="text-end">
                <div className="h-4 w-20 bg-gray-300 dark:bg-gray-700 rounded"></div>
              </Table.Cell>
            </Table.Row>
          ) : (
            data.data?.map((list,index) => (
              <SaleListRow key={list.voucher_id} list={list} no={index+1} />
            ))
          )}
        </Table.Body>
      </Table>
      {!isLoading && (
        <Pagination
          links={data.links}
          meta={data.meta}
          updateFetchUrl={updateFetchUrl}
        />
      )}
    </div>
  );
};

export default VouncherList;
