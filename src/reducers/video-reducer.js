import { CHANGE_VIDEO, RECEIVE_VIDEO } from '../actions/video-actions';
import randomVideo from '../utils/random-live-video';

export default (state = {
  videoId: '',
  videoFromAPI: false
}, action) => {
  switch (action.type) {
    case CHANGE_VIDEO:
      return {
        videoId: action.videoId
      };
    case RECEIVE_VIDEO:
      let videoId = action.videoId;
      if (videoId === '') {
        return {
          videoId: randomVideo(),
          videoFromAPI: false
        };
      }
      return {
        videoId: videoId,
        videoFromAPI: true
      };
    default:
      return state;
  }
};
