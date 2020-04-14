import React, { useEffect } from "react"
import { connect } from "react-redux"
import { getVideos } from "../../actions"

import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import { withStyles } from "@material-ui/core/styles"
import VideoCard from "../VideoCard"
import AppNavBar from "../AppNavBar"
import FilterBar from "../FilterBar"
import { styles } from "./styles"

const VideoList = props => {
  const { classes, getVideos } = props
  useEffect(() => {
    getVideos()
  }, [getVideos])
  return (
    <>
      <AppNavBar />
      <FilterBar />
      <Grid className={classes.container} container spacing={16}>
        {props.videos.length ? (
          props.videos.map(({ title, poster, year, genre, id }) => (
            <VideoCard
              key={id}
              id={id}
              title={title}
              poster={poster}
              year={year}
              genre={genre}
            />
          ))
        ) : (
          <Typography style={{ margin: "auto" }} variant="h5" component="h5">
            Фильмы отсутсвуют
          </Typography>
        )}
      </Grid>
    </>
  )
}

const mapStateToProps = ({ videos }) => ({
  videos
})

export default connect(
  mapStateToProps,
  { getVideos }
)(withStyles(styles)(VideoList))
