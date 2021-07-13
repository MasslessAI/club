import React, { Component, forwardRef, SyntheticEvent } from 'react'

function throttle(func, limit) {
  let inThrottle = false
  return (arg) => {
    if (!inThrottle) {
      func(arg)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

const getPosX = (event) => {
  if (event instanceof MouseEvent) {
    return event.clientX
  } else {
    return event.touches[0].clientX
  }
}

class ProgressBar {

  timeOnMouseMove = 0 // Audio's current time while mouse is down and moving over the progress bar

  hasAddedAudioEventListener = false

  state = {
    isDraggingProgress: false,
    currentTimePos: '0%',
    hasDownloadProgressAnimation: false,
    downloadProgressArr: [],
    waitingForSeekCallback: false,
  }

  getDuration() {
    const { audio, srcDuration } = this.props
    return typeof srcDuration === 'undefined' ? audio.duration : srcDuration
  }

  // Get time info while dragging indicator by mouse or touch
  getCurrentProgress = (event) => {
    const { audio, progressBar } = this.props
    const isSingleFileProgressiveDownload =
      audio.src.indexOf('blob:') !== 0 && typeof this.props.srcDuration === 'undefined'

    if (isSingleFileProgressiveDownload && (!audio.src || !isFinite(audio.currentTime) || !progressBar.current)) {
      return { currentTime: 0, currentTimePos: '0%' }
    }

    const progressBarRect = progressBar.current.getBoundingClientRect()
    const maxRelativePos = progressBarRect.width
    let relativePos = getPosX(event) - progressBarRect.left

    if (relativePos < 0) {
      relativePos = 0
    } else if (relativePos > maxRelativePos) {
      relativePos = maxRelativePos
    }
    const duration = this.getDuration()
    const currentTime = (duration * relativePos) / maxRelativePos
    return { currentTime, currentTimePos: `${((relativePos / maxRelativePos) * 100).toFixed(2)}%` }
  }

  handleContextMenu = (event) => {
    event.preventDefault()
  }

  /* Handle mouse down or touch start on progress bar event */
  handleMouseDownOrTouchStartProgressBar = (event) => {
    event.stopPropagation()
    const { currentTime, currentTimePos } = this.getCurrentProgress(event.nativeEvent)

    if (isFinite(currentTime)) {
      this.timeOnMouseMove = currentTime
      this.setState({ isDraggingProgress: true, currentTimePos })
      if (event.nativeEvent instanceof MouseEvent) {
        window.addEventListener('mousemove', this.handleWindowMouseOrTouchMove)
        window.addEventListener('mouseup', this.handleWindowMouseOrTouchUp)
      } else {
        window.addEventListener('touchmove', this.handleWindowMouseOrTouchMove)
        window.addEventListener('touchend', this.handleWindowMouseOrTouchUp)
      }
    }
  }

  handleWindowMouseOrTouchMove = (event) => {
    event.preventDefault()
    event.stopPropagation()
    // Prevent Chrome drag selection bug
    const windowSelection: Selection | null = window.getSelection()
    if (windowSelection && windowSelection.type === 'Range') {
      windowSelection.empty()
    }

    const { isDraggingProgress } = this.state
    if (isDraggingProgress) {
      const { currentTime, currentTimePos } = this.getCurrentProgress(event)
      this.timeOnMouseMove = currentTime
      this.setState({ currentTimePos })
    }
  }

  handleWindowMouseOrTouchUp = (event) => {
    event.stopPropagation()
    const newTime = this.timeOnMouseMove
    const onSeek = this.props.onSeek

    if (onSeek) {
      this.setState({ isDraggingProgress: false, waitingForSeekCallback: true }, () => {
        onSeek(this.props.audio, newTime).then(() => this.setState({ waitingForSeekCallback: false }))
      })
    } else {
      if (isFinite(newTime)) {
        this.props.audio.currentTime = newTime
      }
      this.setState({ isDraggingProgress: false })
    }

    if (event instanceof MouseEvent) {
      window.removeEventListener('mousemove', this.handleWindowMouseOrTouchMove)
      window.removeEventListener('mouseup', this.handleWindowMouseOrTouchUp)
    } else {
      window.removeEventListener('touchmove', this.handleWindowMouseOrTouchMove)
      window.removeEventListener('touchend', this.handleWindowMouseOrTouchUp)
    }
  }

  handleAudioTimeUpdate = throttle(e => {
    const { isDraggingProgress } = this.state
    const audio = e.target
    if (isDraggingProgress || this.state.waitingForSeekCallback === true) return

    const { currentTime } = audio
    const duration = this.getDuration()

    this.setState({
      currentTimePos: `${((currentTime / duration) * 100 || 0).toFixed(2)}%`,
    })
  }, this.props.progressUpdateInterval)

  handleAudioDownloadProgressUpdate = (e) => {
    const audio = e.target
    const duration = this.getDuration()

    const downloadProgressArr= []
    for (let i = 0; i < audio.buffered.length; i++) {
      const bufferedStart = audio.buffered.start(i)
      const bufferedEnd = audio.buffered.end(i)
      downloadProgressArr.push({
        left: `${Math.round((100 / duration) * bufferedStart) || 0}%`,
        width: `${Math.round((100 / duration) * (bufferedEnd - bufferedStart)) || 0}%`,
      })
    }

    clearTimeout(this.downloadProgressAnimationTimer)
    this.setState({ downloadProgressArr, hasDownloadProgressAnimation: true })
    this.downloadProgressAnimationTimer = setTimeout(() => {
      this.setState({ hasDownloadProgressAnimation: false })
    }, 200)
  }

  componentDidUpdate() {
    const { audio } = this.props
    if (audio && !this.hasAddedAudioEventListener) {
      this.audio = audio
      this.hasAddedAudioEventListener = true
      audio.addEventListener('timeupdate', this.handleAudioTimeUpdate)
      audio.addEventListener('progress', this.handleAudioDownloadProgressUpdate)
    }
  }

  componentWillUnmount() {
    if (this.audio && this.hasAddedAudioEventListener) {
      this.audio.removeEventListener('timeupdate', this.handleAudioTimeUpdate)
      this.audio.removeEventListener('progress', this.handleAudioDownloadProgressUpdate)
    }
    clearTimeout(this.downloadProgressAnimationTimer)
  }

  render() {
    const { showDownloadProgress, showFilledProgress, progressBar } = this.props
    const { currentTimePos, downloadProgressArr, hasDownloadProgressAnimation } = this.state

    return (
      <div
        className="rhap_progress-container"
        ref={progressBar}
        aria-label="Audio Progress Control"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Number(currentTimePos.split('%')[0])}
        tabIndex={0}
        onMouseDown={this.handleMouseDownOrTouchStartProgressBar}
        onTouchStart={this.handleMouseDownOrTouchStartProgressBar}
        onContextMenu={this.handleContextMenu}
      >
        <div className={`rhap_progress-bar ${showDownloadProgress ? 'rhap_progress-bar-show-download' : ''}`}>
          <div className="rhap_progress-indicator" style={{ left: currentTimePos }} />
          {showFilledProgress && <div className="rhap_progress-filled" style={{ width: currentTimePos }} />}
          {showDownloadProgress &&
            downloadProgressArr.map(({ left, width }, i) => (
              <div
                key={i}
                className="rhap_download-progress"
                style={{ left, width, transitionDuration: hasDownloadProgressAnimation ? '.2s' : '0s' }}
              />
            ))}
        </div>
      </div>
    )
  }
}

const ProgressBarForwardRef = (
  props,
  ref
) => <ProgressBar {...props} progressBar={ref} />

export default forwardRef(ProgressBarForwardRef)
export { ProgressBar, ProgressBarForwardRef }