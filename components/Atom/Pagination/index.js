import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

export default function Pagination({ page, limit, total, onPageChanged, slotRight }) {
  const totalPages = Math.ceil(total / limit)

  return (
    <div className="flex mb-4 mt-6 items-center justify-end py-5 border-t lg:hidden">
      <div className="flex items-center space-x-2 text-sm">
        <div
          role="presentation"
          className="w-10 h-10 xl:w-8 xl:h-8 xl:text-xs flex items-center justify-center border cursor-pointer bg-gray-300"
          onClick={() => onPageChanged(Math.max(page - 1, 1))}
        >
          <FaChevronLeft className="text-lg text-white" />
        </div>

        {[
          ...Array(totalPages)
            .fill('')
            .map((e, idx) => (
              <div
                key={idx}
                role="presentation"
                className={`${
                  page === idx + 1 ? 'bg-mainGreen1 text-white ' : ''
                } cursor-pointer w-10 h-10 xl:w-8 xl:h-8 xl:text-xs flex items-center justify-center border hover:bg-mainGreen1 hover:text-white`}
                onClick={() => onPageChanged(idx + 1)}
              >
                {idx + 1}
              </div>
            )),
        ]}

        <div
          className="w-10 h-10 xl:w-8 xl:h-8 xl:text-xs flex items-center justify-center border cursor-pointer hover:bg-gray-200 group"
          role="presentation"
          onClick={() => onPageChanged(Math.min(page + 1, totalPages))}
        >
          <FaChevronRight className="text-lg text-gray-300" />
        </div>
      </div>
      {slotRight}
    </div>
  )
}
