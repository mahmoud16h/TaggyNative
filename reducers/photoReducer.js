const photoReducer = (state = null, action) => {
    switch (action.type) {
        case 'GRAB-PHOTO':
            let photo = action.selectedPhoto;
            return state = {selectedPhoto: photo};
        default:
            return state;
    }
};

export default photoReducer