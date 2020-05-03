import React, { useState } from "react"
import { editRolik } from "../../actions"
import { connect } from "react-redux"
import { Typography, Input, TextField } from "@material-ui/core"
import SaveIcon from "@material-ui/icons/Save"
import IconButton from "@material-ui/core/IconButton"

const EditableFields = props => {
  const [title, setTitle] = useState(props.title)
  const [year, setYear] = useState(props.year)
  const [genre, setGenre] = useState(props.genre)
  const [description, setDescription] = useState(props.description)
  return (
    <>
      <Input
        style={{ marginTop: "12px" }}
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <IconButton
        onClick={() => {
          props.editRolik(
            {
              title: title,
              year: year,
              genre: genre,
              description: description
            },
            props.token,
            props.id
          )
          window.location.reload()
        }}
        style={{ position: "absolute", right: "135px", top: "9px" }}
        aria-label="Save"
      >
        <SaveIcon />
      </IconButton>
      <Typography component="div" style={{ marginBottom: "10px" }}>
        Жанр: <Input value={genre} onChange={e => setGenre(e.target.value)} />
      </Typography>
      <Typography component="div" style={{ marginBottom: "10px" }}>
        Год: <Input value={year} onChange={e => setYear(e.target.value)} />
      </Typography>
      <Typography component="div" style={{ marginBottom: "10px" }}>
        <TextField
          multiline={true}
          rows={2}
          rowsMax={Infinity}
          style={{ width: "100%" }}
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
      </Typography>
    </>
  )
}

export default connect(
  null,
  { editRolik }
)(EditableFields)
