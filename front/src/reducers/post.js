import produce from 'immer';

export const initialState = {
  postGetLoading: false,
  postGetDone: false,
  postGetError: null,
  commentGetLoading: false,
  commentGetDone: false,
  commentGetError: null,
  post: null,
  comment: null,
  postListLoading: false,
  postListDone: false,
  postListError: null,
  postList: null,
  postAddLoading: false,
  postAddDone: false,
  postAddError: null,
  postAdd: null,
};

export const POST_GET_REQUEST = 'POST_GET_REQUEST';
export const POST_GET_SUCCESS = 'POST_GET_SUCCESS';
export const POST_GET_FAIL = 'POST_GET_FAIL';
export const POST_GET_DONE = 'POST_GET_DONE';

export const POST_ADD_REQUEST = 'POST_ADD_REQUEST';
export const POST_ADD_SUCCESS = 'POST_ADD_SUCCESS';
export const POST_ADD_FAIL = 'POST_ADD_FAIL';
export const POST_ADD_DONE = 'POST_ADD_DONE';

// export const POST_ADD_REQUEST = 'POST_ADD_REQUEST';
// export const POST_ADD_FAIL = 'POST_ADD_FAIL';
// export const POST_ADD_SUCCESS = 'POST_ADD_SUCCESS';
// export const POST_ADD_DONE = 'POST_ADD_DONE';

export const POST_LIST_REQUEST = 'POST_LIST_REQUEST';
export const POST_LIST_FAIL = 'POST_LIST_FAIL';
export const POST_LIST_SUCCESS = 'POST_LIST_SUCCESS';
export const POST_LIST_DONE = 'POST_LIST_DONE';

export const COMMENT_GET_SUCCESS = 'COMMENT_GET_SUCCESS';
export const COMMENT_GET_FAIL = 'COMMENT_GET_FAIL';

const reducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case POST_GET_REQUEST:
        draft.postGetLoading = true;
        draft.postGetDone = false;
        draft.postGetError = null;
        draft.commentGetLoading = true;
        draft.commentGetDone = false;
        draft.commentGetError = null;
        draft.post = null;
        draft.comment = null;
        break;
      case POST_GET_SUCCESS:
        draft.postGetLoading = false;
        draft.postGetDone = true;
        draft.post = action.data;
        break;
      case POST_GET_FAIL:
        draft.postGetLoading = false;
        draft.postGetError = action.error;
        break;
      case COMMENT_GET_SUCCESS:
        draft.commentGetDone = true;
        draft.comment = action.comment;
        break;
      case COMMENT_GET_FAIL:
        draft.commentGetError = action.error;
        draft.commentGetLoading = false;
        break;
      case POST_GET_DONE:
        draft.postGetDone = false;
        draft.postGetError = null;
        draft.commentGetDone = false;
        draft.commentGetError = null;
        break;
      case POST_LIST_DONE:
        draft.postListDone = false;
        draft.postListLoading = false;
        draft.postList = null;
        break;
      case POST_LIST_REQUEST:
        draft.postListLoading = true;
        draft.postListError = null;
        draft.postListDone = false;
        break;
      case POST_LIST_FAIL:
        draft.postListLoading = false;
        draft.postListError = action.error;
        break;
      case POST_LIST_SUCCESS:
        draft.postListDone = true;
        draft.postList = action.data;
        break;
      case POST_ADD_REQUEST:
        draft.postAddLoading = true;
        draft.postAdd = null;
        draft.postAddError = null;
        draft.postAddDone = false;
        break;
      case POST_ADD_SUCCESS:
        draft.postAddLoading = false;
        draft.postAdd = action.data;
        draft.postAddDone = true;
        break;
      case POST_ADD_FAIL:
        draft.postAddLoading = false;
        draft.postAddError = action.error;
        break;
      case POST_ADD_DONE:
        draft.postAddLoading = false;
        draft.postAdd = null;
        draft.postAddError = null;
        draft.postAddDone = false;
        break;
      default:
        break;
    }
  });

export default reducer;
