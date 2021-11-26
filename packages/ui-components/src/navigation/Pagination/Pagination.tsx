/* This example requires Tailwind CSS v2.0+ */
import { ArrowNarrowLeftIcon, ArrowNarrowRightIcon } from '@heroicons/react/solid';
import React, { FC } from 'react';

type Props = {
  displayPerPage: number;
  currentPage: number;
  onPageChange: (newPage: number) => void;
  total: number;
};

const Pagination: FC<Props> = ({ onPageChange, displayPerPage, total, currentPage }) => {
  const pageCount = Math.ceil(total / displayPerPage);

  return (
    <nav className="flex items-center justify-between px-4 border-t border-gray-200 sm:px-0">
      <div className="flex flex-1 w-0 -mt-px">
        <div
          onClick={() => onPageChange(currentPage - 1)}
          className={`inline-flex items-center pt-4 pr-1 text-sm font-medium text-gray-500 border-t-2 border-transparent hover:text-gray-700 hover:border-gray-300 ${
            currentPage === 0 ? 'invisible' : ''
          }`}
        >
          <ArrowNarrowLeftIcon className="w-5 h-5 mr-3 text-gray-400" aria-hidden="true" />
          Previous
        </div>
      </div>
      <div className="hidden md:-mt-px md:flex">
        {Array.from(Array(pageCount).keys()).map((page) => (
          <div
            onClick={() => onPageChange(page)}
            key={page + 1}
            className={`inline-flex items-center px-4 pt-4 text-sm font-medium border-t-2  ${
              page === currentPage
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } `}
          >
            {page + 1}
          </div>
        ))}
      </div>
      <div className="flex justify-end flex-1 w-0 -mt-px">
        <div
          onClick={() => onPageChange(currentPage + 1)}
          className={`${
            currentPage === pageCount - 1 ? 'hidden' : ''
          } inline-flex items-center pt-4 pr-1 text-sm font-medium text-gray-500 border-t-2 border-transparent hover:text-gray-700 hover:border-gray-300`}
        >
          <ArrowNarrowRightIcon className="w-5 h-5 mr-3 text-gray-400" aria-hidden="true" />
          Next
        </div>
      </div>
    </nav>
  );
};

export default Pagination;
