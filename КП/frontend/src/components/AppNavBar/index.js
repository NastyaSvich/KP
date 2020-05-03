import React, { useState, useEffect } from "react"
import { connect } from "react-redux"
import { logOut, searchRoliks, getRoliks } from "../../actions"

import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import IconButton from "@material-ui/core/IconButton"
import Typography from "@material-ui/core/Typography"
import InputBase from "@material-ui/core/InputBase"
import { withStyles } from "@material-ui/core/styles"
import SearchIcon from "@material-ui/icons/Search"
import AccountCircle from "@material-ui/icons/AccountCircle"
import { styles } from "./styles"
import Button from "@material-ui/core/Button"
import Menu from "@material-ui/core/Menu"
import MenuItem from "@material-ui/core/MenuItem"

import { Link } from "react-router-dom"

const AppNavBar = props => {
  const [anchorEl, setAnchorEl] = useState(null)
  const [searchString, setSearchString] = useState("")
  const { classes, user, searchRoliks, getRoliks } = props
  useEffect(() => {
    if (searchString) searchRoliks(searchString)
    else getRoliks()
  }, [searchRoliks, getRoliks, searchString])
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            component={Link}
            to="/"
            className={classes.title}
            variant="h6"
            color="inherit"
            noWrap
          >
            Ролики
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Поиск"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput
              }}
              onChange={e => setSearchString(e.target.value)}
            />
          </div>
          <div className={classes.grow} />
          <div>
            {user.token ? (
              <>
                <Button
                  aria-owns={anchorEl ? "simple-menu" : undefined}
                  className={classes.button}
                  aria-haspopup="true"
                  onClick={e => setAnchorEl(e.currentTarget)}
                >
                  {user.user.login}
                </Button>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={() => setAnchorEl(null)}
                >
                  <MenuItem
                    component={Link}
                    to={`/user/${user.user.id}`}
                    onClose={() => setAnchorEl(null)}
                  >
                    Профиль
                  </MenuItem>
                  <MenuItem
                    onClick={props.logOut}
                    onClose={() => setAnchorEl(null)}
                  >
                    Выход
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <IconButton
                component={Link}
                to="/login"
                aria-haspopup="true"
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  )
}

const mapStateToProps = ({ user }) => ({
  user
})

export default connect(
  mapStateToProps,
  { logOut, searchRoliks, getRoliks }
)(withStyles(styles)(AppNavBar))
