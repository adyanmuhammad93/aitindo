import { FiChevronsRight } from 'react-icons/fi'

export default function PaginationMobile({ page, limit, total, onPageChanged }) {
  const totalPages = Math.ceil(total / limit)

  return (
    <div className="flex mb-4 mt-6 justify-center space-x-2 text-sm">
      {/* <div
        role="presentation"
        className="w-7 h-7 text-[10px] flex items-center justify-center border cursor-pointer bg-gray-300"
        onClick={() => onPageChanged(Math.max(page - 1, 1))}
      >
        <FiChevronsLeft className="text-lg text-white" />
      </div> */}

      {[
        ...Array(totalPages)
          .fill('')
          .map((e, idx) => (
            <div
              role="presentation"
              className={`${
                page === idx + 1 ? 'border-mainGreen1' : 'border-gray-200'
              } w-7 h-7 text-[10px] flex items-center justify-center border hover:border-mainGreen1`}
              onClick={() => onPageChanged(idx + 1)}
            >
              {idx + 1}
            </div>
          )),
      ]}

      <div
        className="h-7 text-[10px] px-2 flex items-center font-bold justify-center border cursor-pointer hover:bg-gray-200 group"
        role="presentation"
        onClick={() => onPageChanged(Math.min(page + 1, totalPages))}
      >
        Next <FiChevronsRight className="text-[14px] ml-1 text-gray-400" />
      </div>
    </div>
  )
}
