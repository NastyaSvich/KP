import React from "react"
import Card from "@material-ui/core/Card"
import CardActionArea from "@material-ui/core/CardActionArea"
import CardContent from "@material-ui/core/CardContent"
import CardMedia from "@material-ui/core/CardMedia"
import Grid from "@material-ui/core/Grid"
import { withStyles } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import ButtonBase from "@material-ui/core/ButtonBase"
import { Link } from "react-router-dom"

const styles = {
  link: {
    textDecoration: "none"
  },
  card: {
    height: "100%",
    maxWidth: 345
  },
  cardAction: {
    height: "100%"
  },
  media: {
    objectFit: "cover"
  }
}

const VideoCard = ({ title, poster, year, genre, id, classes }) => {
  return (
    <Grid item xs={4}>
      <Card className={classes.card}>
        <ButtonBase
          style={{ height: "100%" }}
          component={Link}
          to={`/video/${id}`}
        >
          <CardActionArea className={classes.cardAction}>
            <CardMedia
              component="img"
              alt="Video"
              className={classes.media}
              height="140"
              image={poster}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {title}
              </Typography>
              <Typography component="p">{genre}</Typography>
              <Typography component="p">{year}</Typography>
            </CardContent>
          </CardActionArea>
        </ButtonBase>
      </Card>
    </Grid>
  )
}

export default withStyles(styles)(VideoCard)
