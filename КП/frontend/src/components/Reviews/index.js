import React from "react"
import { styles } from "./styles"
import { withStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import CardMedia from "@material-ui/core/CardMedia"
import Typography from "@material-ui/core/Typography"
import StarRatings from "react-star-ratings"
import svg from "../UserProfile/perm_identity_48px.svg"

const Reviews = props => {
  const { rate, login, photoUrl, feedback, classes } = props
  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.cover}
        image={photoUrl ? photoUrl : svg}
        title="Live from space album cover"
      />
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5">
            {login}
          </Typography>
          <StarRatings
            rating={rate}
            starRatedColor="#F06624"
            starDimension="20px"
          />
          <Typography variant="subtitle1" color="textSecondary">
            {feedback}
          </Typography>
        </CardContent>
      </div>
    </Card>
  )
}

export default withStyles(styles)(Reviews)
