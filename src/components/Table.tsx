import { ReactNode } from 'react';

export const Table = (props: {
  headers?: string[];
  data: { id: string | number; value: string | ReactNode }[][];
}) => {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
          {props.headers?.length && (
            <tr>
              {props.headers.map((header, idx) => (
                <>
                  <th
                    scope="col"
                    className={`px-6 py-3 ${
                      idx % 2 === 0 ? ' bg-gray-50 dark:bg-gray-800' : ''
                    }`}
                  >
                    {header}
                  </th>
                </>
              ))}
            </tr>
          )}
        </thead>
        <tbody>
          {props.data.map((row) => (
            <tr
              key={row[0].id}
              className="border-b border-gray-200 dark:border-gray-700"
            >
              {row.map((col, colIdx) => (
                <td
                  key={col.id}
                  className={`px-6 py-4 ${
                    colIdx % 2 === 0
                      ? 'font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800'
                      : ''
                  }`}
                >
                  {col.value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
