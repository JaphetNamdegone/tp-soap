import React, { useEffect, useState } from 'react'
import soapRequest from 'easy-soap-request'
import XMLParser from 'react-xml-parser'
import { Box, CircularProgress, Fab, IconButton, Snackbar, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core'
import { Add, Delete } from '@material-ui/icons'
import Alert from '@material-ui/lab/Alert'

import Title from '../components/Title'
import DialogAddBook from './DialogAddBook'
import { endpointBook, defaultHeaders } from '../config'

export default function Books() {
  const [loading, setLoading] = useState(true)
  const [books, setBooks] = useState([])
  const [openAddDialog, setOpenAddDialog] = useState(false)
  const [openAlert, setOpenAlert] = useState(false)

  useEffect(() => {
    init()
  }, [])

  const init = async () => {
    let xml = `<soapenv:Envelope
    xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
    xmlns:ynov="http://nantes.ynov.com/soap/book">
    <soapenv:Header />
    <soapenv:Body>
      
      TODO

    </soapenv:Body>
  </soapenv:Envelope>`

    try {
      const { response } = await soapRequest({ url: endpointBook, headers: defaultHeaders, xml })
      const { body } = response
      let xmlParser = new XMLParser().parseFromString(body)

      // TODO parser le XML

      setLoading(false)
    } catch (error) {
      setLoading(false)
      setOpenAlert(true)
    }
  }

  return (
    <>
      <Title>Liste des livres</Title>
      {loading ? (
        <CircularProgress />
      ) : (
        <Table size="small">
          <TableHead>
            <TableRow>
              {
                //TODO
              }
            </TableRow>
          </TableHead>
          <TableBody>
            {
              //TODO
            }
          </TableBody>
        </Table>
      )}
      <Box display="flex" alignItems="center" justifyContent="center" style={{ height: '100%' }}>
        <Fab color="primary" aria-label="add" onClick={() => setOpenAddDialog(true)}>
          <Add />
        </Fab>
      </Box>
      {openAddDialog && (
        <DialogAddBook
          open={openAddDialog}
          handleClose={() => setOpenAddDialog(false)}
          reload={() => {
            setOpenAddDialog(false)
            init()
          }}
        />
      )}
      <Snackbar open={openAlert} autoHideDuration={5000} onClose={() => setOpenAlert(false)}>
        <Alert onClose={() => setOpenAlert(false)} severity="error">
          Une erreur réseau est survenue
        </Alert>
      </Snackbar>
    </>
  )
}
