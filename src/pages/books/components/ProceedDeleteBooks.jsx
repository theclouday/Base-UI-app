import { useState } from "react";
import { BASE_API_LINK } from "constants/apiURL";
import Dialog from "components/Dialog";
import Button from "components/Button";
import DialogActions from "components/DialogActions";
import DeleteIcon from "./DeleteIcon";
import Link from "components/Link";
import result from "constants/pagesURLs";
import { bookPage } from "constants/pages";

export function DeleteBook(id) {
  return fetch(BASE_API_LINK +'/'+ id, {
    method: 'DELETE',
  });
}

function ProceedDeleteBooks ({book, onDelete}) {
  const [open, setOpen] = useState(false);
  const [isHovered, setHovered] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  
  const handleClose = () => {
     setOpen(false);
  };
  
  const handleDelete = () => {
    onDelete(book.id);
    handleClose();
  };

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)} 
    >
      <Link to={`${result[bookPage]}/${book.id}`}>
        <div>
        <h2>{book.title}</h2>
        <p>{book.yearOfIssue} year</p>
        <p>{book.id}</p>
        </div>
      </Link>
      {isHovered && (
        <Button
          onClick={handleClickOpen}
          endIcon={<DeleteIcon />}
        >
        </Button>
      )}
      
      <Dialog 
        open={open}
        onClose={handleClose}
        onConfirm={handleDelete}
        >
          Ви впевнені, що хочете видалити цю книгу? Цю дію не можна скасувати.
          <DialogActions onClose={handleClose} onConfirm={handleDelete} />
        </Dialog>
    </div>
  );
}

export default ProceedDeleteBooks;