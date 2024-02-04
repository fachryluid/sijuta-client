import { Table } from "flowbite-react";

export default function MainTable({ columns, items }) {
  return (
    <div className="overflow-x-auto border rounded-md">
      <Table hoverable >
        <Table.Head>
          {columns?.map((column, idx) =>
            <Table.HeadCell key={idx}>{column}</Table.HeadCell>
          )}
        </Table.Head>
        <Table.Body className="divide-y">
          {items?.map((item, idxItem) =>
            <Table.Row key={idxItem} className="bg-white dark:border-gray-700 dark:bg-gray-800">
              {item.map((subItem, idxSubItem) => (
                <Table.Cell key={idxSubItem} className="align-top">{subItem}</Table.Cell>
              ))}
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    </div>
  );
}
