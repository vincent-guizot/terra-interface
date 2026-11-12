import { useState } from 'react';

export function useOperationsCRUD() {
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [detailDrawerOpen, setDetailDrawerOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const openDetail = (record) => {
    setSelectedRecord(record);
    setDetailDrawerOpen(true);
  };

  const closeDetail = () => {
    setDetailDrawerOpen(false);
    setSelectedRecord(null);
  };

  const notify = (msg) => {
    setToastMsg(msg);
  };

  const closeToast = () => {
    setToastMsg('');
  };

  return {
    selectedRecord,
    detailDrawerOpen,
    addModalOpen,
    setAddModalOpen,
    toastMsg,
    page,
    setPage,
    rowsPerPage,
    setRowsPerPage,
    openDetail,
    closeDetail,
    notify,
    closeToast,
  };
}
