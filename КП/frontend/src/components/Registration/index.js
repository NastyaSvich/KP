import { registration } from "../../actions/index"

import {
  Avatar,
  Button,
  CssBaseline,
  FormControl,
  Input,
  InputLabel,
  Paper,
  Typography,
  Link,
  FormHelperText
} from "@material-ui/core"
import LockOutlinedIcon from "@material-ui/icons/LockOutlined"
import withStyles from "@material-ui/core/styles/withStyles"
import { styles } from "./styles"

import { Link as RouterLink } from "react-router-dom"

const Registration = props => {
  const [login, setLogin] = useState("")
  const [password, setPassword] = useState("")
  const { classes } = props
  const handleSubmit = e => {
    e.preventDefault()
    props.registration({ login, password })
  }
  if (props.user.token) {
    return <Redirect to="/" push />
  }
  return (
    <main className={classes.main}>
      <CssBaseline />
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Регистрация
        </Typography>
        <form className={classes.form}>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="login">Логин</InputLabel>
            <Input
              id="login"
              name="login"
              autoComplete="login"
              autoFocus
              onChange={e => setLogin(e.target.value)}
            />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="password">Пароль</InputLabel>
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
            onClick={handleSubmit}
          >
            Регистрация
          </Button>
          <Link
            style={{
              marginTop: "15px",
              display: "block",
              textAlign: "center"
            }}
            component={RouterLink}
            to="/login"
          >
            Вход
          </Link>
        </form>
      </Paper>
    </main>
  )
}
const mapStateToProps = ({ message, user }) => ({
  message,
  user
})

export default connect(
  mapStateToProps,
  { registration }
)(withStyles(styles)(Registration))
