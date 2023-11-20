import { PropsWithChildren } from 'react';

export const TableHead = ({
  className = '',
  children,
}: PropsWithChildren<{ className?: string }>) => (
  <th scope="col" className={'px-6 py-3 ' + className}>
    {children}
  </th>
);

export const TableHeader = ({
  className = '',
  children,
}: PropsWithChildren<{ className?: string }>) => (
  <thead
    className={
      'text-xs text-gray-700 uppercase dark:text-gray-400 ' + className
    }
  >
    <TableRow>{children}</TableRow>
  </thead>
);

export const TableRow = ({
  className = '',
  children,
}: PropsWithChildren<{ className?: string }>) => (
  <tr className={'border-b border-gray-200 ' + className}>{children}</tr>
);

export const TableCell = ({
  className = '',
  children,
}: PropsWithChildren<{ className?: string }>) => (
  <td className={'px-6 py-4' + className}>{children}</td>
);

export const TableBody = ({
  className = '',
  children,
}: PropsWithChildren<{ className?: string }>) => (
  <tbody className={className}>{children}</tbody>
);

export const Table = ({
  className = '',
  children,
}: PropsWithChildren<{ className?: string }>) => {
  return (
    <table
      className={
        'w-full text-sm text-left text-gray-500 dark:text-gray-400 ' + className
      }
    >
      {children}
    </table>
  );
};

Table.Header = TableHeader;
Table.Head = TableHead;
Table.Row = TableRow;
Table.Cell = TableCell;
Table.Body = TableBody;
Table.Table = Table;

export default Table;
