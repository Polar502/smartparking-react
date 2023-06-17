import { Dialog, DialogTitle, DialogContent, TextField, DialogActions } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useState } from 'react'

const useStyles = makeStyles({
  saveButton: {
    backgroundColor: '#28a745',
    color: 'white',
    '&:hover': {
      backgroundColor: '#218838'
    },
    borderRadius: '20px'
  },
  cancelButton: {
    backgroundColor: '#dc3545',
    color: 'white',
    '&:hover': {
      backgroundColor: '#c82333'
    },
    borderRadius: '20px'
  },
  textField: {
    '& .MuiInputBase-root': {
      color: 'black'
    },
    '& .MuiFormLabel-root': {
      color: 'gray'
    },
    '& .MuiInput-underline:before': {
      borderBottom: '1px solid gray'
    },
    '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
      borderBottom: '2px solid gray'
    },
    '& .MuiInput-underline:after': {
      borderBottom: '2px solid black'
    }
  }
})

const CarDetailsDialog = ({ open, handleClose, handleSave }) => {
  const classes = useStyles()
  const [make, setMake] = useState('')
  const [model, setModel] = useState('')

  const handleMakeChange = (event) => {
    setMake(event.target.value)
  }

  const handleModelChange = (event) => {
    setModel(event.target.value)
  }

  const handleSaveClick = () => {
    handleSave({ make, model })
  }

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Añadir detalles del vehículo</DialogTitle>
      <DialogContent>
        <TextField
          className={classes.textField}
          autoFocus
          margin="dense"
          id="make"
          label="Marca"
          type="text"
          fullWidth
          value={make}
          onChange={handleMakeChange}
        />
        <TextField
          className={classes.textField}
          margin="dense"
          id="model"
          label="Modelo"
          type="text"
          fullWidth
          value={model}
          onChange={handleModelChange}
        />
      </DialogContent>
      <DialogActions>
        <button
          onClick={handleClose}
          className={'mr-2 rounded-lg bg-red-500 px-4 py-2 font-semibold text-white shadow-md hover:bg-red-400 focus:outline-none focus:ring-2 focus:ring-opacity-75'}
        >
          Cancelar
        </button>
        <button
          onClick={handleSaveClick}
          className={'rounded-lg bg-green-500 px-4 py-2 font-semibold text-white shadow-md hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-opacity-75'}
        >
          Guardar
        </button>
      </DialogActions>
    </Dialog>
  )
}

export default CarDetailsDialog
