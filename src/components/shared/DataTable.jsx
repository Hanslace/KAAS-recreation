'use client';

import { Icon } from '@iconify/react';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import AttachmentImage from '@/components/ui/AttachmentImage';
import Pagination from '@/components/ui/Pagination';

const statusClasses = {
  Pending: 'bg-yellow-100 text-yellow-500',
  Cancelled: 'bg-red-100 text-red-500',
  Approved: 'bg-green-100 text-green-500',
  Deleted: 'bg-red-100 text-red-500',
  Closed: 'bg-red-100 text-red-500',
  Opened: 'bg-green-100 text-green-500',
  Completed: 'bg-green-100 text-green-500',
  Refunded: 'bg-red-100 text-red-500',
  Paid: 'bg-green-100 text-green-500',
};

const PAGE_SIZE = 10;

export default function DataTable({ data, columns, path, pageSize = PAGE_SIZE }) {
  const navigate = useNavigate();

  // Tracks the slug of the row that currently has its menu open
  const [openDropdownSlug, setOpenDropdownSlug] = useState(null);
  const dropdownRef = useRef(null);

  const [currentPage, setCurrentPage] = useState(1);

  // Reset to page 1 whenever the (filtered) dataset changes
  useEffect(() => {
    setCurrentPage(1);
  }, [data]);

  const paginatedData = data.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // Close dropdown if user clicks anywhere outside of it
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdownSlug(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const goToDetails = (slug) => {
    navigate(`${path}/${slug}`);
  };

  const handleAction = (action, slug) => {
    console.log(`Executing ${action} on row ${slug}`);
    setOpenDropdownSlug(null); // Close menu after selection
  };

  return (
    <div className="space-y-3">
    <div className="data-table w-full overflow-x-auto custom-scrollbar pb-2">
      <table className="w-full min-w-fit border-separate border-spacing-0 ">
        <thead>
          <tr className="bg-brand-gradient text-white">
            {columns.map((column, index) => (
              <th
                key={String(column.key)}
                className={`px-2 py-2 min-w-fit whitespace-nowrap cell ${
                  column.type === 'action' ? 'text-center' : 'text-left'
                } ${
                  index === 0 ? 'rounded-tl-[0.3rem]' : ''
                } ${
                  index === columns.length - 1 ? 'rounded-tr-[0.3rem]' : ''
                }`}
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {paginatedData.map((row, rowIndex) => (
            <tr
              key={row.id}
              {...(path && {
                onClick: () => goToDetails(row.slug),
                onKeyDown: (event) => {
                  if (event.key === 'Enter') goToDetails(row.slug);
                },
                tabIndex: 0,
                role: 'link',
              })}
              className={`transition-all focus:outline-none focus:ring-1 focus:ring-brand ${
                path ? 'cursor-pointer hover:bg-brand/10' : ''
              } ${
                rowIndex % 2 === 0 ? 'bg-white' : 'bg-[#FAF8F2]'
              }`}
            >
              {columns.map((column, columnIndex) => {
                const cellRounded =
                    columnIndex === 0
                    ? 'rounded-l-[0.5rem] px-2'
                    : columnIndex === columns.length - 1
                    ? 'rounded-r-[0.5rem]'
                    : ' cell min-w-fit whitespace-nowrap';

                if (column.type === 'empty') {
                    return (
                    <td
                        key={String(column.key)}
                        className={`${cellRounded}`}
                    />
                    );
                }

                const value = column.key === 'action' ? '' : row[column.key];

                if (column.type === 'imageText') {
                  const imageValue = column.imageKey
                    ? row[column.imageKey]
                    : undefined;

                  return (
                    <td
                      key={String(column.key)}
                      className={`${cellRounded}`}
                    >
                      <div className="flex items-center gap-[0.5rem]">
                        <img
                          src={String(imageValue || '/images/company-logo.png')}
                          alt={String(value)}
                          className="h-[2em] w-[2em] shrink-0 rounded-full object-cover"
                        />

                        <span className="whitespace-nowrap text-black/50">
                          {String(value)}
                        </span>
                      </div>
                    </td>
                  );
                }

                if (column.type === 'attachments') {
                  const attachments = Array.isArray(value) ? value : [];

                  return (
                    <td
                      key={String(column.key)}
                      className={`${cellRounded}`}
                    >
                      <div
                        className="flex w-[7rem] xl:w-[13rem] gap-[1em] p-[1em]"
                        onClick={(event) => event.stopPropagation()}
                      >
                        {attachments.map((src, attachmentIndex) => (
                          <AttachmentImage
                            key={`${src}-${attachmentIndex}`}
                            src={src}
                            alt={`Attachment ${attachmentIndex + 1}`}
                            w="2.5em"
                            h="2.5em"
                          />
                        ))}
                      </div>
                    </td>
                  );
                }

                if (column.type === 'availability') {
                  return (
                    <td
                      key={String(column.key)}
                      className={`${cellRounded}`}
                    >
                      {value ? (
                        <span className="inline-flex items-center gap-1.5 text-black/70">
                          <span
                            className={`h-2 w-2 rounded-full ${
                              String(value) === 'Online' ? 'bg-green-500' : 'bg-gray-400'
                            }`}
                          />
                          {String(value)}
                        </span>
                      ) : (
                        <span className="text-black/30">-</span>
                      )}
                    </td>
                  );
                }

                if (column.type === 'status') {
                  return (
                    <td
                      key={String(column.key)}
                      className={`${cellRounded}`}
                    >
                      <span
                        className={`inline-flex rounded-full pill  font-medium ${
                          statusClasses[String(value)] ||
                          'bg-gray-100 text-gray-500'
                        }`}
                      >
                        {String(value)}
                      </span>
                    </td>
                  );
                }

                if (column.type === 'action') {
                  const isMenuOpen = openDropdownSlug === row.slug;
                  const currentStatus = 'status' in row ? String(row['status']) : '';
                  return (
                    <td
                      key={String(column.key)}
                      className={`${cellRounded} relative text-center`}
                    >
                      {/* The 3-Dot Trigger Button */}
                      <button
                        type="button"
                        onClick={(event) => {
                          event.stopPropagation();
                          setOpenDropdownSlug(isMenuOpen ? null : row.slug);
                        }}
                        className="inline-flex items-center justify-center rounded-full p-[0.5rem] text-black/50 hover:bg-black/5"
                        aria-label="Open actions menu"
                      >
                        <Icon
                          icon="solar:menu-dots-bold"
                          className="h-[1.5em] w-[1.5em]"
                        />
                      </button>

                      {/* Dynamic Status-Based Dropdown Overlay */}
                      {isMenuOpen && (
                        <div
                          ref={dropdownRef}
                          className="absolute right-4 top-[80%] z-30 min-w-[7rem] rounded-xl bg-white p-2 shadow-xl border border-gray-100 flex flex-col gap-1 animate-in fade-in slide-in-from-top-1 duration-100"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {/* 1. Actions Visible ONLY when status is Pending */}
                          {currentStatus === 'Pending' && (
                            <>
                              <button
                                onClick={() => handleAction('approve', row.slug)}
                                className="flex items-center gap-2 rounded-lg px-3 py-2  font-medium text-green-600 hover:bg-green-50 transition w-full text-left"
                              >
                                <Icon icon="solar:check-circle-bold" className="h-4 w-4" />
                                Approve
                              </button>
                              <button
                                onClick={() => handleAction('cancel', row.slug)}
                                className="flex items-center gap-2 rounded-lg px-3 py-2  font-medium text-red-600 hover:bg-red-50 transition w-full text-left"
                              >
                                <Icon icon="solar:close-circle-bold" className="h-4 w-4" />
                                Cancel
                              </button>
                            </>
                          )}

                          {/* 2. Actions Visible ONLY when status is Approved */}
                          {(currentStatus === 'Approved' || currentStatus === 'Cancelled') && (
                            <button
                              onClick={() => handleAction('suspend', row.slug)}
                              className="flex items-center gap-2 rounded-lg px-3 py-2  font-medium text-red-600 hover:bg-red-50 transition w-full text-left"
                            >
                              <Icon icon="solar:danger-bold" className="h-4 w-4" />
                              Delete
                            </button>
                          )}       

                          {/* 3. Actions Visible ONLY when status is Deleted */}
                          {currentStatus === 'Deleted' && (
                            <button
                              onClick={() => handleAction('restore', row.slug)}
                              className="flex items-center gap-2 rounded-lg bg-red-50 px-3 py-2  font-medium text-red-600 hover:bg-red-100/80 transition w-full text-left"
                            >
                              <Icon icon="solar:restart-bold" className="h-4 w-4" />
                              Restore
                            </button>
                          )}


                        </div>
                      )}
                    </td>
                  );
                }

                 return (
                    <td
                      key={String(column.key)}
                      className={`${cellRounded} text-black/50 truncate`}
                    >
                      {value !== undefined && value !== null ? String(value) : ''}
                    </td>
                  );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>

      <Pagination
        currentPage={currentPage}
        totalItems={data.length}
        pageSize={pageSize}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
