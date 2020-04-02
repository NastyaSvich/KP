import { editUser } from "../../actions"

import {
  Avatar,
  Button,
  CssBaseline,
  FormControl,
  Input,
  InputLabel,
  Paper,
  FormHelperText,
  Typography
} from "@material-ui/core"
import { withStyles } from "@material-ui/core/styles"
import AppNavBar from "../AppNavBar"

import { styles } from "./styles"

const UserProfile = props => {
  const { classes, user } = props
  const [login, setLogin] = useState(user.user.login)
  const [password, setPassword] = useState("")
  const [photoUrl, setPhotoUrl] = useState(user.user.photoUrl || "")

  const handleEdit = e => {
    e.preventDefault()
    props.editUser(
      {
        login: login,
        password: password,
        photoUrl: photoUrl
      },
      user.token
    )
  }
  return (
    <>
      <AppNavBar />
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Typography gutterBottom variant="h5" component="h5">
            Редактирование
          </Typography>
          <Avatar
            alt="Avatar"
            style={{ width: "100px", height: "100px", background: "white" }}
            src={user.user.photoUrl ? user.user.photoUrl : svg}
            className={classes.avatar}
          />
          <form className={classes.form}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="login">Логин</InputLabel>
              <Input
                value={login}
                id="login"
                name="login"
                autoComplete="login"
                autoFocus
                onChange={e => setLogin(e.target.value)}
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="photoUrl">Фото профиля</InputLabel>
              <Input
                value={photoUrl}
                name="photoUrl"
                type="photoUrl"
                id="photoUrl"
                onChange={e => setPhotoUrl(e.target.value)}
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Новый пароль</InputLabel>
              <Input
                name="password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={e => setPassword(e.target.value)}
              />
            </FormControl>
            <FormHelperText error>{props.message}</FormHelperText>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleEdit}
            >
              Изменить
            </Button>
          </form>
        </Paper>
      </main>
    </>
  )
}

const mapStateToProps = ({ user, message }) => ({
  user,
  message
})

export default connect(
  mapStateToProps,
  { editUser }
)(withStyles(styles)(UserProfile))
