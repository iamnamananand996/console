import { Nullable } from "@/types/general";
import { useState } from "react";

const useDeleteResourceModalState = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<Nullable<string>>(null);

  return {
    modalIsOpen,
    setModalIsOpen,
    isDeleting,
    setIsDeleting,
    error,
    setError,
  };
};

export default useDeleteResourceModalState;
