import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import { getVideo, rateVideo, deleteVideo } from "../../actions"

import { withStyles } from "@material-ui/core/styles"
import {
  Grid,
  CardMedia,
  Typography,
  Button,
  FormHelperText
} from "@material-ui/core"
import TextField from "@material-ui/core/TextField"
import AppNavBar from "../AppNavBar"
import Reviews from "../Reviews"
import EditableFields from "../EditableFields"
import StarRatings from "react-star-ratings"
import DeleteIcon from "@material-ui/icons/Delete"
import IconButton from "@material-ui/core/IconButton"
import EditIcon from "@material-ui/icons/Edit"
import { Redirect } from "react-router-dom"

const styles = theme => ({
  cardMedia: {
    width: "50%",
    padding: "15px",
    margin: "auto"
  },
  paper: {
    width: "100%",
    margin: "auto"
  },
  textGrid: {
    padding: "15px"
  },
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: "none"
  }
})

const VideoPage = props => {
  const [deleted, setDeleted] = useState(false)
  const [rating, setRating] = useState(0)
  const [feedback, setFeedback] = useState("")
  const [isEditable, setIsEditable] = useState(false)
  const {
    title,
    poster,
    description,
    genre,
    year,
    feedbacks,
    id
  } = props.currentVideo

  const {
    classes: { cardMedia, textGrid },
    getVideo,
    match,
    classes
  } = props

  useEffect(() => {
    getVideo(match.params.id)
  }, [getVideo, match])

  if (deleted) {
    return <Redirect to="/" />
  }

  const handleSubmit = e => {
    e.preventDefault()
    props.rateVideo(
      { rate: rating, feedback: feedback, videoId: id },
      props.user.token
    )
  }

  return (
    <>
      <AppNavBar />
      <Grid container>
        <Grid item xs={6}>
          <CardMedia
            style={{ objectFit: "cover" }}
            component="img"
            className={cardMedia}
            image={`${poster}`}
          />
        </Grid>
        <Grid
          item
          xs={6}
          className={textGrid}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center"
          }}
        >
          <div style={{ position: "relative" }}>
            {props.user.user ? (
              props.user.user.isAdmin ? (
                <div
                  style={{
                    position: "absolute",
                    right: "0px",
                    top: "0px",
                    display: "inline-block"
                  }}
                >
                  <IconButton
                    onClick={() => {
                      props.deleteVideo(props.user.token, id)
                      setDeleted(true)
                    }}
                    className={classes.button}
                    aria-label="Delete"
                  >
                    <DeleteIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => setIsEditable(!isEditable)}
                    className={classes.button}
                    aria-label="Edit"
                  >
                    <EditIcon />
                  </IconButton>
                </div>
              ) : null
            ) : null}
            {isEditable ? (
              <EditableFields
                title={title}
                genre={genre}
                year={year}
                description={description}
                id={id}
                token={props.user.token}
              />
            ) : (
              <>
                <Typography
                  style={{ marginTop: "12px" }}
                  gutterBottom
                  variant="h4"
                  component="h4"
                >
                  {title}
                </Typography>
                <StarRatings
                  rating={props.currentVideo.rating}
                  starRatedColor="#F06624"
                  starDimension="20px"
                />
                <Typography component="p" style={{ marginBottom: "10px" }}>
                  Жанр: {genre}
                </Typography>
                <Typography component="p" style={{ marginBottom: "10px" }}>
                  Год: {year}
                </Typography>
                <Typography component="p" style={{ marginBottom: "10px" }}>
                  {description}
                </Typography>
              </>
            )}
            <Typography gutterBottom variant="h6" component="h6">
              Оставить отзыв:
            </Typography>
            <StarRatings
              rating={rating}
              changeRating={newRating => setRating(newRating)}
              starRatedColor="#F06624"
              starDimension="20px"
            />
            <TextField
              placeholder="Напишите отзыв здесь"
              multiline={true}
              rows={2}
              rowsMax={Infinity}
              style={{ width: "100%" }}
              onChange={e => setFeedback(e.target.value)}
            />
            <FormHelperText error>{props.message}</FormHelperText>
            <Button
              type="submit"
              style={{
                marginLeft: "auto",
                marginRight: "auto",
                marginTop: "20px",
                display: "block"
              }}
              variant="contained"
              color="primary"
              onClick={handleSubmit}
            >
              Оставить отзыв
            </Button>
          </div>
        </Grid>
      </Grid>
      <div style={{ width: "70%", margin: "auto" }}>
        <Typography gutterBottom variant="h5" component="h5">
          Отзывы ({feedbacks ? feedbacks.data.length : ""})
        </Typography>
        {feedbacks ? (
          feedbacks.data.map(feedbackObj => (
            <Reviews
              key={feedbackObj.id}
              rate={feedbackObj.rate}
              login={feedbackObj.user.login}
              photoUrl={feedbackObj.user.photoUrl}
              feedback={feedbackObj.feedback}
            />
          ))
        ) : (
          <div>kek</div>
        )}
      </div>
    </>
  )
}

const mapStateToProps = ({ currentVideo, message, user }) => ({
  currentVideo,
  message,
  user
})

export default connect(
  mapStateToProps,
  { getVideo, rateVideo, deleteVideo }
)(withStyles(styles)(VideoPage))
