import React, { useState } from "react"
import { connect } from "react-redux"
import { sortRoliks, filterRoliks } from "../../actions"
import { withStyles } from "@material-ui/core/styles"
import InputLabel from "@material-ui/core/InputLabel"
import Input from "@material-ui/core/Input"
import MenuItem from "@material-ui/core/MenuItem"
import FormControl from "@material-ui/core/FormControl"
import Select from "@material-ui/core/Select"
import { styles } from "./styles"

const FilterBar = props => {
  const [sortField, setSortField] = useState("")
  const [filterField, setFilterField] = useState("")
  const { classes } = props
  console.log(filterField)
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        width: "50%",
        margin: "20px auto"
      }}
    >
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="age-simple">Сортировка по</InputLabel>
        <Select
          value={sortField}
          onChange={e => {
            props.sortRoliks(e.target.value)
            setSortField(e.target.value)
          }}
          inputProps={{
            name: "sort"
          }}
        >
          <MenuItem value="">
            <em>Без</em>
          </MenuItem>
          <MenuItem value="title">Названию</MenuItem>
          <MenuItem value="year">Году</MenuItem>
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="filter">Фильтрация по году</InputLabel>
        <Input
          autoFocus
          onChange={e => {
            setFilterField(e.target.value)
            props.filterRoliks(e.target.value)
          }}
        />
      </FormControl>
    </div>
  )
}

export default connect(
  null,
  { sortRoliks, filterRoliks }
)(withStyles(styles)(FilterBar))
